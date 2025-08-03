'use client';

import { useRouter } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { useStoreLikeToggle } from '@/shared/hooks/useStoreLikeToggle';
import { formatDistanceString } from '@/shared/lib/format/distanceUtils';
import { ImageBox } from '@/shared/ui/ImageBox';
import { StoreLikeButton } from '@/shared/ui/StoreLikeButton';

import type { StoreCardProps } from '@/features/rental/map/lib/types';

// 유틸 함수는 컴포넌트 바깥으로 분리
const formatTime = (time: string) => time.substring(0, 5);

export function StoreCard({
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
      {/* 오른쪽 상단 좋아요 버튼 */}
      <div
        className="absolute right-3 top-3"
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
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
