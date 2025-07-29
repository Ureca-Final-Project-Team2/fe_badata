'use client';

import { formatDistanceString } from '@/shared/lib/format/distanceUtils';
import { ImageBox } from '@/shared/ui/ImageBox';
import { LikeButtonCircle } from '@/shared/ui/LikeButtonCircle/LikeButtonCircle';

import type { StoreCardProps } from '@/pages/rental/map/lib/types';

// 유틸 함수는 컴포넌트 바깥으로 분리
const formatTime = (time: string) => time.substring(0, 5);

export function StoreCard({
  store,
  storeDetail,
  deviceCount,
  onLikeClick,
  isLiked = false,
  className,
  showDistance = true,
}: StoreCardProps & { showDistance?: boolean }) {
  const operatingStatus = storeDetail.isOpening ? '영업 중' : '영업 종료';

  return (
    <div
      className={`w-[380px] bg-white rounded-[16px] p-3 flex gap-3 shadow-sm relative items-start ${className ?? ''}`}
    >
      {/* 왼쪽: 스토어 이미지 */}
      <ImageBox
        size="xs"
        url={storeDetail.imageUrl} // 기본 이미지 설정
      />
      {/* 중앙: content 영역 */}
      <div className="flex flex-col flex-1 h-[68px] justify-between min-w-0">
        {/* 타이틀: 상단 고정 - 길면 ... 처리 */}
        <h3 className="text-black font-small-regular truncate">{store.name}</h3>
        {/* 영업 상태 및 시간: 가운데 */}
        <p className="font-small-regular text-black truncate">
          {operatingStatus} · {formatTime(storeDetail.startTime)} ~{' '}
          {formatTime(storeDetail.endTime)}
        </p>
        {/* 거리/주소/남은 공유기: 하단 고정 */}
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
      {/* 오른쪽 상단 LikeButtonCircle */}
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
