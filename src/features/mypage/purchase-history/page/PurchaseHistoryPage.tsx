'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useUserStats } from '@/entities/follow';
import {
  usePurchasesQuery,
  useUserInfoQuery,
  useUserPostCountQuery
} from '@/entities/user/model/queries';
import { ICONS } from '@/shared/config/iconPath';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { TradePostCardSkeleton } from '@/shared/ui/Skeleton/TradePostCardSkeleton';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

export default function PurchaseHistoryPage() {
  const router = useRouter();
  const profile = useAuthStore((s) => s.user);
  const {
    followerCount,
    followingCount,
    isLoading: isLoadingStats,
    invalidateStats,
  } = useUserStats();

  const { data: userInfo } = useUserInfoQuery();
  const { data: purchaseCount = 0 } = useUserPostCountQuery('PURCHASE');
  console.log('📦 구매 개수:', purchaseCount, '로딩:', isLoading, '에러:', isError);

  useEffect(() => {
    const handleFocus = () => {
      invalidateStats();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [invalidateStats]);

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePurchasesQuery();

  // 모든 아이템을 하나의 배열로 합치기
  const allItems =
    data?.pages?.flatMap((page) => {
      if (!page || !page.content) {
        return [];
      }

      if (!Array.isArray(page.content.item)) {
        return [];
      }

      return page.content.item;
    }) || [];

  return (
    <BaseLayout
      header={<PageHeader title="구매 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="flex flex-col items-center mt-4">
  {userInfo ? (
    <MyProfileCard
      name={userInfo.nickName}
      days={userInfo.days}
      avatarSrc={userInfo.profileImage ?? ICONS.ETC.SHELL.src.toString()}
    />
  ) : (
    <div className="w-full h-[72px] bg-[var(--gray-light)] rounded-lg animate-pulse" />
  )}


          <div className="flex justify-between items-center w-full bg-[var(--main-1)] rounded-xl px-4 py-3 mt-6 mb-6">
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

        <div className="pb-[96px]">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <TradePostCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-8">
              <p className="text-[var(--gray-mid)]">구매 내역을 불러오는데 실패했습니다.</p>
              {error && (
                <p className="text-[var(--gray-mid)] font-caption-regular mt-2">
                  에러: {error.message || '알 수 없는 오류'}
                </p>
              )}
            </div>
          ) : allItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[var(--gray-mid)]">구매 내역이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                {allItems.map((item) => (
                  <TradePostCard
                    key={item.id}
                    imageUrl={item.postImage}
                    title={item.title}
                    partner={item.partner}
                    price={item.price}
                    likeCount={item.postLikes}
                    isCompleted={item.isSold}
                    isLiked={false}
                    hasDday={false}
                  />
                ))}
              </div>

              {hasNextPage && (
                <div className="text-center py-4">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-4 py-2 bg-[var(--main-3)] text-[var(--white)] rounded-lg disabled:bg-[var(--gray-light)]"
                  >
                    {isFetchingNextPage ? '로딩 중...' : '더 보기'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
    </BaseLayout>
  );
}
