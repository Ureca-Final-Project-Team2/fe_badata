// src/features/rental/map/ui/StoreCard.tsx
'use client';

import React, { memo } from 'react';

import { useRouter } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { useStoreLikeToggle } from '@/shared/hooks/useStoreLikeToggle';
import { formatDistanceString } from '@/shared/lib/format/distanceUtils';
import { ImageBox } from '@/shared/ui/ImageBox';
import { StoreLikeButton } from '@/shared/ui/StoreLikeButton';

import type { StoreCardProps } from '@/features/rental/map/lib/types';

const formatTime = (time: string) => time.substring(0, 5);

function StoreCardBase({
  store,
  storeDetail,
  deviceCount,
  onLikeToggle,
  isLiked = false,
  className,
  showDistance = true,
  disableToast = false,
}: StoreCardProps & { showDistance?: boolean; disableToast?: boolean }) {
  const router = useRouter();

  const {
    isLoading: isLikeLoading,
    shouldShowLikeActive,
    handleLikeToggle,
  } = useStoreLikeToggle({
    storeId: store.id,
    initialIsLiked: isLiked,
    onToggle: onLikeToggle,
    disableToast,
  });

  const operatingStatus = storeDetail.isOpening ? '영업 중' : '영업 종료';

  const handleCardClick = () => {
    router.push(PATH.RENTAL.STORE_DETAIL.replace(':storeId', store.id.toString()));
  };

  return (
    <div
      className={`w-[380px] bg-white rounded-[16px] p-3 flex gap-3 shadow-sm relative items-start cursor-pointer hover:shadow-md transition-shadow ${className ?? ''}`}
      onClick={handleCardClick}
    >
      <ImageBox size="xs" url={storeDetail.imageUrl} />

      <div className="flex flex-col flex-1 h-[68px] justify-between min-w-0">
        <h3 className="text-black font-small-regular truncate">{store.name}</h3>

        <p className="font-small-regular text-black truncate">
          {operatingStatus} · {formatTime(storeDetail.startTime)} ~{' '}
          {formatTime(storeDetail.endTime)}
        </p>

        <div className="flex gap-2">
          <div className="flex items-end gap-2 flex-1 min-w-0">
            {showDistance && (
              <span className="font-small-semibold flex-shrink-0 text-[var(--main-5)]">
                {formatDistanceString(storeDetail.distanceFromMe || 0)}
              </span>
            )}
            <span className="font-small-regular text-[var(--main-5)] truncate">
              {storeDetail.detailAddress}
            </span>
          </div>
          <div className="font-small-medium text-black flex items-end flex-shrink-0">
            남은 공유기&nbsp;<span className="text-[var(--main-5)]">{deviceCount}대</span>
          </div>
        </div>
      </div>

      <div
        className="absolute right-3 top-3"
        onClick={(e) => {
          e.stopPropagation();
          handleLikeToggle();
        }}
      >
        <StoreLikeButton
          isLiked={shouldShowLikeActive}
          isLoading={isLikeLoading}
          onClick={handleLikeToggle}
          size="sm"
        />
      </div>
    </div>
  );
}

// 실제 렌더에 사용하는 필드만 비교(얕은 비교)
const areEqual = (
  a: Readonly<React.ComponentProps<typeof StoreCardBase>>,
  b: Readonly<React.ComponentProps<typeof StoreCardBase>>,
) =>
  a.isLiked === b.isLiked &&
  a.deviceCount === b.deviceCount &&
  a.className === b.className &&
  a.showDistance === b.showDistance &&
  a.disableToast === b.disableToast &&
  a.onLikeToggle === b.onLikeToggle && // 상위에서 useCallback 권장
  a.store.id === b.store.id &&
  a.store.name === b.store.name &&
  a.storeDetail.imageUrl === b.storeDetail.imageUrl &&
  a.storeDetail.detailAddress === b.storeDetail.detailAddress &&
  a.storeDetail.isOpening === b.storeDetail.isOpening &&
  a.storeDetail.startTime === b.storeDetail.startTime &&
  a.storeDetail.endTime === b.storeDetail.endTime &&
  a.storeDetail.distanceFromMe === b.storeDetail.distanceFromMe;

export const StoreCard = memo(StoreCardBase, areEqual);
