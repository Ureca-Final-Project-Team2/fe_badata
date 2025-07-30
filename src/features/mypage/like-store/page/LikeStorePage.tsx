'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useLikedStores } from '@/features/mypage/like-store/model/queries';
import { StoreCard } from '@/features/rental/map/ui/StoreCard';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function LikeStorePage() {
  const router = useRouter();
  const { likeStoreItems, isLoading, isError } = useLikedStores();
  const [removedStoreIds, setRemovedStoreIds] = useState<Set<number>>(new Set());
  const [removingStoreIds, setRemovingStoreIds] = useState<Set<number>>(new Set());

  // 좋아요 취소 시 리스트에서 제거
  const handleLikeToggle = (storeId: number, isLiked: boolean) => {
    if (!isLiked) {
      // 애니메이션을 위한 제거 중 상태 설정
      setRemovingStoreIds((prev) => new Set([...prev, storeId]));

      // 애니메이션 완료 후 실제 제거
      setTimeout(() => {
        setRemovedStoreIds((prev) => new Set([...prev, storeId]));
        setRemovingStoreIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(storeId);
          return newSet;
        });
      }, 500); // 애니메이션 지속 시간
    }
  };

  // 제거된 스토어를 필터링
  const filteredItems = likeStoreItems?.filter((item) => !removedStoreIds.has(item.storeId)) || [];

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (!filteredItems || filteredItems.length === 0) {
    return <div className="py-4 text-center text-[var(--gray)]">게시물이 없습니다.</div>;
  }

  return (
    <BaseLayout
      header={<PageHeader title="관심 매장" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-[96px]">
        {filteredItems.map((item, index) => {
          const isRemoving = removingStoreIds.has(item.storeId);

          return (
            <div
              key={item.storeId}
              className={`transition-all duration-500 ease-in-out ${
                isRemoving
                  ? 'animate-slide-out-down'
                  : `animate-slide-in-up animate-stagger-${Math.min(index + 1, 5)}`
              }`}
              style={{
                transform: isRemoving ? 'translateY(100%) scale(0.8)' : 'translateY(0) scale(1)',
                opacity: isRemoving ? 0 : 1,
                height: isRemoving ? '0' : 'auto',
                marginBottom: isRemoving ? '0' : '16px',
                overflow: 'hidden',
              }}
            >
              <StoreCard
                id={item.storeId}
                store={{
                  id: item.storeId,
                  name: item.name,
                  latitude: 0,
                  longititude: 0,
                }}
                storeDetail={{
                  name: item.name,
                  storeId: item.storeId,
                  startTime: item.startTime,
                  endTime: item.endTime,
                  imageUrl: item.storeImage,
                  detailAddress: item.detailAddress,
                  isOpening: true, // 실제 오픈 여부는 별도 로직 필요
                }}
                deviceCount={item.availableDevice}
                isLiked={true}
                showDistance={false}
                onLikeToggle={handleLikeToggle}
                disableToast={true}
                className="font-title-regular w-[95%] max-w-[400px]"
              />
            </div>
          );
        })}
      </div>
    </BaseLayout>
  );
}
