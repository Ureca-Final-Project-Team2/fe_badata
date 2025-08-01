'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth/model/authStore';
import {
  useFollowToggleMutation,
  useSellerFollowStatusQuery,
  useSellerPostsQuery,
} from '@/entities/trade-post/model/queries';
import { ICONS } from '@/shared/config/iconPath';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { TradePostCardSkeleton } from '@/shared/ui/Skeleton/TradePostCardSkeleton';
import { Switch } from '@/shared/ui/Switch/Switch';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';
import UserProfileCard from '@/widgets/user/ui/UserProfileCard';

interface SellerPageProps {
  userId: number;
  sellerName: string;
  sellerAvatar: string;
}

export default function SellerPage({ userId, sellerName, sellerAvatar }: SellerPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingStartTime = useRef<number>(0);

  // 현재 로그인한 사용자와 판매자가 같은지 확인
  const isOwnProfile = currentUser?.userId === userId;

  // 팔로우 토글 뮤테이션
  const followToggleMutation = useFollowToggleMutation();

  // 판매자의 팔로우 상태 확인
  const { isFollowing } = useSellerFollowStatusQuery(userId);

  // 판매자의 거래 게시물 조회 (올바른 API 사용)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useSellerPostsQuery(userId, isCompleted, undefined, 30);

  // 팔로우/언팔로우 핸들러
  const handleFollowToggle = () => {
    if (isOwnProfile) return;
    followToggleMutation.mutate(userId);
  };

  // Switch 토글 핸들러
  const handleSwitchToggle = (checked: boolean) => {
    setIsCompleted(checked);
    // 쿼리 무효화하여 새로운 데이터 가져오기
    queryClient.invalidateQueries({
      queryKey: ['seller', 'posts', userId, checked, 30],
    });
  };

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

  return (
    <BaseLayout
      header={<PageHeader title={`${sellerName}님의 페이지`} onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px]">
        <div className="flex flex-col items-center mt-4">
          {sellerName && sellerAvatar ? (
            <UserProfileCard
              userId={userId}
              name={sellerName}
              avatarSrc={sellerAvatar}
              isFollowing={isFollowing}
              onFollowClick={handleFollowToggle}
            />
          ) : (
            <UserProfileCard
              userId={userId}
              name={sellerName || '로딩 중...'}
              avatarSrc={sellerAvatar || ICONS.ETC.SHELL.src.toString()}
              isFollowing={false}
              onFollowClick={handleFollowToggle}
            />
          )}
        </div>

        <div className="flex justify-center mt-4 mb-4">
          <Switch
            checked={isCompleted}
            onCheckedChange={handleSwitchToggle}
            labels={['판매중', '판매완료']}
          />
        </div>

        <div className="pb-[96px]">
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
            <div className="text-center py-8 text-[var(--red)]">
              <p>판매 내역을 불러오는데 실패했습니다.</p>
              <p className="text-sm mt-2">{error?.message}</p>
            </div>
          )}

          {/* 데이터가 없는 경우 */}
          {!isLoading &&
            !showSkeleton &&
            !isError &&
            (!data?.pages ||
              data.pages.length === 0 ||
              data.pages.every((page) => !page?.item || page.item.length === 0)) && (
              <div className="text-center py-8 text-[var(--gray-mid)]">
                <p>판매글이 없습니다.</p>
              </div>
            )}

          {/* 데이터 표시 */}
          {data?.pages?.map((page, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              {page?.item?.map((item) => (
                <TradePostCard
                  key={item.id}
                  imageUrl={item.postImage || '/assets/trade-detail.jpg'}
                  title={item.title}
                  partner={item.partner || '제휴처'}
                  price={item.price}
                  likeCount={item.likesCount}
                  isCompleted={isCompleted}
                  onCardClick={() => {
                    const detailPath =
                      item.postCategory === 'DATA'
                        ? `/trade/data/${item.id}`
                        : `/trade/gifticon/${item.id}`;
                    router.push(detailPath);
                  }}
                />
              ))}
            </div>
          ))}

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
