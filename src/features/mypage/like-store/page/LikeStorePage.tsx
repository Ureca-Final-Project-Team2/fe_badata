'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Store } from 'lucide-react';

import { useLikedStores } from '@/features/mypage/like-store/model/queries';
import { StoreCard } from '@/features/rental/map/ui/StoreCard';
import { isStoreOpen } from '@/shared/lib/utils/storeIsOpeningUtils';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { PageHeader } from '@/shared/ui/Header';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

const ANIMATION_DURATION = 500; // 애니메이션 지속 시간 상수화

// 공통 메시지 컴포넌트
const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center py-8">
    <p className="font-label-regular text-[var(--gray)]">{children}</p>
  </div>
);

export default function LikeStorePage() {
  const router = useRouter();
  const { likeStoreItems, isLoading, isError } = useLikedStores();
  const [removedStoreIds, setRemovedStoreIds] = useState<Set<number>>(new Set());
  const [removingStoreIds, setRemovingStoreIds] = useState<Set<number>>(new Set());
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set());

  // 좋아요 취소 시 리스트에서 제거
  const handleLikeToggle = (storeId: number, isLiked: boolean) => {
    if (!isLiked) {
      // 애니메이션을 위한 제거 중 상태 설정
      setRemovingStoreIds((prev) => new Set([...prev, storeId]));

      // 애니메이션 완료 후 실제 제거
      const timeoutId = setTimeout(() => {
        setRemovedStoreIds((prev) => new Set([...prev, storeId]));
        setRemovingStoreIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(storeId);
          return newSet;
        });
        timeoutRefs.current.delete(timeoutId);
      }, ANIMATION_DURATION);

      timeoutRefs.current.add(timeoutId);
    }
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  // 제거된 스토어를 필터링
  const filteredItems = likeStoreItems?.filter((item) => !removedStoreIds.has(item.storeId)) || [];

  return (
    <BaseLayout
      header={<PageHeader title="관심 매장" onBack={() => router.back()} />}
      showBottomNav
    >
      {/* 로딩 상태 */}
      {isLoading && <Spinner content="관심 매장을 불러오는 중입니다..." />}

      {/* 에러 상태 */}
      {isError && <CenteredMessage>에러가 발생했습니다.</CenteredMessage>}

      {/* 빈 상태 */}
      {!isLoading && !isError && (!filteredItems || filteredItems.length === 0) && (
        <EmptyState
          title="관심 매장이 없습니다."
          icon={<Store className="w-6 h-6 text-[var(--gray-dark)]" />}
        />
      )}

      {/* 데이터 표시 */}
      {!isLoading && !isError && filteredItems && filteredItems.length > 0 && (
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
                    leftDeviceCount: item.availableDevice,
                    liked: true,
                  }}
                  storeDetail={{
                    name: item.name,
                    storeId: item.storeId,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    imageUrl: item.storeImage,
                    detailAddress: item.detailAddress,
                    isOpening: isStoreOpen(item.startTime, item.endTime),
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
      )}
    </BaseLayout>
  );
}
