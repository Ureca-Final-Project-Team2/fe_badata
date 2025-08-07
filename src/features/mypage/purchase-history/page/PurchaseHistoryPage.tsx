'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useUserStats } from '@/entities/follow';
import {
  usePurchasesQuery,
  useUserInfoQuery,
  useUserPostCountQuery,
} from '@/entities/user/model/queries';
import { ICONS } from '@/shared/config/iconPath';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { FlatTab } from '@/shared/ui/FlatTab';
import { PageHeader } from '@/shared/ui/Header';
import { TradePostCardSkeleton } from '@/shared/ui/Skeleton/TradePostCardSkeleton';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

const tabList = [
  { id: '데이터', label: '데이터', value: '데이터' },
  { id: '기프티콘', label: '기프티콘', value: '기프티콘' },
];

// 공통 메시지 컴포넌트
const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center py-8">
    <p className="font-label-regular text-[var(--gray)]">{children}</p>
  </div>
);

export default function PurchaseHistoryPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'데이터' | '기프티콘'>('데이터');
  const [showSkeleton, setShowSkeleton] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingStartTime = useRef<number>(0);

  const {
    followerCount,
    followingCount,
    isLoading: isLoadingStats,
    invalidateStats,
  } = useUserStats();
  const { data: purchaseCount = 0 } = useUserPostCountQuery('PURCHASE');
  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfoQuery();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    usePurchasesQuery();

  const handleTabChange = (value: string) => {
    if (value === '데이터' || value === '기프티콘') {
      setTab(value as '데이터' | '기프티콘');
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      invalidateStats();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [invalidateStats]);

  useEffect(() => {
    if (isLoading) {
      loadingStartTime.current = Date.now();
      setShowSkeleton(true);
    } else {
      const loadingDuration = Date.now() - loadingStartTime.current;

      if (loadingDuration < 200) {
        setShowSkeleton(false);
      } else {
        setShowSkeleton(false);
      }
    }
  }, [isLoading]);

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

  // 탭에 따라 아이템 필터링
  const filteredData = data?.pages?.map((page) => {
    if (!page || !page.content) return page;

    const filteredItems = page.content.item.filter((item) => {
      if (tab === '데이터') return item.postCategory === 'DATA';
      if (tab === '기프티콘') return item.postCategory === 'GIFTICON';
      return false;
    });

    return {
      ...page,
      content: {
        ...page.content,
        item: filteredItems,
      },
    };
  });

  // 데이터가 비어있는지 확인
  const isEmpty =
    !filteredData ||
    filteredData.length === 0 ||
    filteredData.every((page) => page?.content?.item.length === 0);

  return (
    <BaseLayout
      header={<PageHeader title="구매 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px]">
        <div className="flex flex-col items-center mt-4">
          {userInfo && userInfo.nickName && userInfo.profileImage && userInfo.days !== undefined ? (
            <MyProfileCard
              name={userInfo.nickName}
              days={userInfo.days}
              avatarSrc={userInfo.profileImage}
            />
          ) : (
            <MyProfileCard
              name="로딩 중..."
              days={0}
              avatarSrc={ICONS.ETC.SHELL.src.toString()}
              isLoading={isUserInfoLoading}
            />
          )}

          <div className="flex justify-between items-center w-full bg-[var(--main-1)] rounded-xl px-4 py-3 mt-4 mb-4">
            <div className="flex flex-col items-center flex-1">
              <span className="font-label-semibold text-[var(--black)]">구매 내역</span>
              <span className="font-body-semibold text-[var(--black)] mt-1">{purchaseCount}</span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer group"
              onClick={() => router.push('/mypage/follower')}
            >
              <span className="font-label-semibold text-[var(--black)]">팔로워</span>
              <span className="font-body-semibold text-[var(--black)] mt-1 group-hover:text-[var(--main-3)]">
                {isLoadingStats ? '...' : followerCount}
              </span>
            </div>
            <div
              className="flex flex-col items-center flex-1 cursor-pointer group"
              onClick={() => router.push('/mypage/following')}
            >
              <span className="font-label-semibold text-[var(--black)]">팔로잉</span>
              <span className="font-body-semibold text-[var(--black)] mt-1 group-hover:text-[var(--main-3)]">
                {isLoadingStats ? '...' : followingCount}
              </span>
            </div>
          </div>
        </div>

        <div>
          <FlatTab items={tabList} value={tab} onValueChange={handleTabChange} className="mb-4" />
        </div>

        <div>
          {/* 로딩 상태 */}
          {(isLoading || showSkeleton) && (
            <div className="px-4">
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <TradePostCardSkeleton key={index} />
                ))}
              </div>
            </div>
          )}

          {/* 에러 상태 */}
          {isError && (
            <div className="px-4">
              <CenteredMessage>구매 내역을 불러오는데 실패했습니다.</CenteredMessage>
            </div>
          )}

          {/* 빈 상태 */}
          {!isLoading && !showSkeleton && !isError && isEmpty && (
            <EmptyState title="구매 내역이 없습니다." />
          )}

          {/* 데이터 표시 */}
          {!isLoading && !showSkeleton && !isError && !isEmpty && (
            <>
              {filteredData?.map((page, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  {page?.content?.item.map((item) => (
                    <TradePostCard
                      key={item.id}
                      imageUrl={item.postImage || undefined}
                      title={item.title}
                      partner={item.partner || undefined}
                      mobileCarrier={item.mobileCarrier as MobileCarrier}
                      price={item.price}
                      likeCount={item.postLikes}
                      isCompleted={item.isSold}
                      isLiked={false}
                      hasDday={false}
                      onCardClick={() => {
                        const detailPath =
                          item.postCategory === 'DATA'
                            ? `/trade/data/${item.postId}`
                            : `/mypage/purchase-history/gifticon-detail?id=${encodeURIComponent(item.postId)}`;
                        router.push(detailPath);
                      }}
                    />
                  ))}
                </div>
              ))}
            </>
          )}

          <div ref={observerRef} className="h-12">
            {isFetchingNextPage && (
              <div className="px-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <TradePostCardSkeleton key={`next-${index}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
