'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSalesQuery } from '@/entities/user/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FlatTab } from '@/shared/ui/FlatTab';
import { PageHeader } from '@/shared/ui/Header';
import { Switch } from '@/shared/ui/Switch/Switch';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

const profile = {
  name: '홍길동',
  days: 15,
  avatarSrc: '/assets/profile-default.png',
  tradeCount: 14,
  follower: 4,
  following: 7,
};

const tabList = [
  { id: '전체', label: '전체', value: '전체' },
  { id: '데이터', label: '데이터', value: '데이터' },
  { id: '쿠폰', label: '쿠폰', value: '쿠폰' },
];

export default function SalesHistoryPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'전체' | '데이터' | '쿠폰'>('전체');
  const [isCompleted, setIsCompleted] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const postCategory = tab === '전체' ? undefined : tab === '데이터' ? 'DATA' : 'GIFTICON';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useSalesQuery(
      undefined, // userId 없음 (현재 로그인한 사용자)
      postCategory,
      isCompleted,
      undefined,
      30,
    );

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <BaseLayout
      header={<PageHeader title="판매 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px]">
        <div className="flex flex-col items-center mt-4">
          <MyProfileCard name={profile.name} days={profile.days} avatarSrc={profile.avatarSrc} />

          <div className="flex justify-between items-center w-full bg-[var(--main-1)] rounded-xl px-4 py-3 mt-4 mb-6">
            <div className="flex flex-col items-center flex-1">
              <span className="font-label-semibold text-[var(--black)]">거래 내역</span>
              <span className="font-body-semibold text-[var(--black)] mt-1">
                {profile.tradeCount}
              </span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer group"
              onClick={() => router.push('/mypage/follower')}
            >
              <span className="font-label-semibold text-[var(--black)]">팔로워</span>
              <span className="font-body-semibold text-[var(--black)] mt-1 group-hover:text-[var(--main-3)]">
                {profile.follower}
              </span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer group"
              onClick={() => router.push('/mypage/following')}
            >
              <span className="font-label-semibold text-[var(--black)]">팔로잉</span>
              <span className="font-body-semibold text-[var(--black)] mt-1 group-hover:text-[var(--main-3)]">
                {profile.following}
              </span>
            </div>
          </div>
        </div>

        <div>
          <FlatTab items={tabList} value={tab} onValueChange={setTab} />
        </div>

        <div className="flex justify-center mt-4 mb-4">
          <Switch
            checked={isCompleted}
            onCheckedChange={setIsCompleted}
            labels={['판매중', '판매완료']}
          />
        </div>

        <div className="pb-[96px]">
          {/* 로딩 상태 */}
          {isLoading && (
            <div className="text-center py-8">
              <p>판매 내역을 불러오는 중...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {isError && (
            <div className="text-center py-8 text-[var(--red)]">
              <p>판매 내역을 불러오는데 실패했습니다.</p>
              <p className="text-sm mt-2">{error?.message}</p>
            </div>
          )}

          {/* 데이터가 없는 경우 */}
          {!isLoading &&
            !isError &&
            (!data?.pages ||
              data.pages.length === 0 ||
              data.pages.every((page) => page.content?.item.length === 0)) && (
              <div className="text-center py-8 text-[var(--gray-mid)]">
                <p>판매 내역이 없습니다.</p>
              </div>
            )}

          {/* 데이터 표시 */}
          {data?.pages.map((page, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              {page.content?.item.map((item) => (
                <TradePostCard
                  key={item.postId}
                  imageUrl={item.postImage || '/assets/trade-detail.jpg'}
                  title={item.title}
                  partner={item.partner || '제휴처'}
                  price={item.price}
                  likeCount={item.postLikes}
                  isCompleted={item.isSold}
                />
              ))}
            </div>
          ))}

          <div ref={observerRef} className="h-12">
            {isFetchingNextPage && <p className="text-center">불러오는 중...</p>}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
