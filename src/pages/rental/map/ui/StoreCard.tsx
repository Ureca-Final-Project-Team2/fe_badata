'use client';

import { ImageBox } from '@/shared/ui/ImageBox';
import { LikeButtonCircle } from '@/shared/ui/LikeButtonCircle/LikeButtonCircle';

import type { StoreCardProps } from '@/pages/rental/map/lib/types';

const formatTime = (time: string) => time.substring(0, 5);
const formatDistance = (distance: number) =>
  distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(1)}km`;

export function StoreCard({
  store,
  storeDetail,
  deviceCount,
  onLikeClick,
  isLiked = false,
  className,
}: StoreCardProps) {
  const operatingStatus = storeDetail.isOpening ? '영업 중' : '영업 종료';

  return (
    <div
      className={`w-[380px] bg-white rounded-[16px] p-3 flex gap-3 shadow-sm relative items-start ${className ?? ''}`}
    >
      <ImageBox size="xs" url={storeDetail.imageUrl} />
      <div className="flex flex-col flex-1 h-[68px] justify-between">
        <h3 className="truncate text-black font-small-regular">{store.name}</h3>
        <p className="font-small-regular text-black truncate">
          {operatingStatus} · {formatTime(storeDetail.startTime)} ~{' '}
          {formatTime(storeDetail.endTime)}
        </p>
        <div className="flex gap-2">
          <div className="flex items-end gap-2 flex-1">
            <span className="text-[var(--main-5)] font-small-semibold">
              {formatDistance(storeDetail.distanceFromMe)}
            </span>
            <span className="font-small-regular text-[var(--main-5)] truncate">
              {storeDetail.detailAddress}
            </span>
          </div>
          <div className="font-small-medium text-black flex items-end">
            남은 공유기&nbsp;<span className="text-[var(--main-5)]">{deviceCount}대</span>
          </div>
        </div>
      </div>
      <LikeButtonCircle
        active={isLiked}
        onClick={onLikeClick}
        size="sm"
        shadow
        className="absolute right-3 top-3"
      />
    </div>
  );
}

// 거리 없는 버전(마이페이지 관심매장에서 사용)
export function StoreCardNoDistance({
  store,
  storeDetail,
  deviceCount,
  onLikeClick,
  isLiked = false,
  className,
}: StoreCardProps) {
  const operatingStatus = storeDetail.isOpening ? '영업 중' : '영업 종료';

  return (
    <div
      className={`w-[380px] bg-white rounded-[16px] p-3 flex gap-3 shadow-sm relative items-start ${className ?? ''}`}
    >
      <ImageBox size="xs" url={storeDetail.imageUrl} />
      <div className="flex flex-col flex-1 h-[68px] justify-between">
        <h3 className="truncate text-black font-small-regular">{store.name}</h3>
        <p className="font-small-regular text-black truncate">
          {operatingStatus} · {formatTime(storeDetail.startTime)} ~{' '}
          {formatTime(storeDetail.endTime)}
        </p>
        <div className="flex gap-2">
          <div className="flex items-end gap-2 flex-1">
            <span className="font-small-regular text-[var(--main-5)] truncate">
              {storeDetail.detailAddress}
            </span>
          </div>
          <div className="font-small-medium text-black flex items-end">
            남은 공유기&nbsp;<span className="text-[var(--main-5)]">{deviceCount}대</span>
          </div>
        </div>
      </div>
      <LikeButtonCircle
        active={isLiked}
        onClick={onLikeClick}
        size="sm"
        shadow
        className="absolute right-3 top-3"
      />
    </div>
  );
}
