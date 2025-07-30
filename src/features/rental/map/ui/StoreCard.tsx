'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { toggleStoreLike } from '@/features/rental/map/api/apis';
import { ICONS } from '@/shared/config/iconPath';
import { formatDistanceString } from '@/shared/lib/format/distanceUtils';
import { makeToast } from '@/shared/lib/makeToast';
import { ImageBox } from '@/shared/ui/ImageBox';

import type { StoreCardProps } from '@/features/rental/map/lib/types';

// 유틸 함수는 컴포넌트 바깥으로 분리
const formatTime = (time: string) => time.substring(0, 5);

export function StoreCard({
  store,
  storeDetail,
  deviceCount,
  onLikeClick,
  onLikeToggle,
  isLiked = false,
  className,
  showDistance = true,
}: StoreCardProps & { showDistance?: boolean }) {
  const { isLoggedIn } = useAuthStore();
  const [liked, setLiked] = useState(isLiked);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const operatingStatus = storeDetail.isOpening ? '영업 중' : '영업 종료';

  // isLiked prop이 변경될 때 liked 상태 업데이트
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  // 로그인하지 않은 사용자는 항상 like_nonactive 표시
  const shouldShowLikeActive = isLoggedIn && liked;

  // 좋아요 토글 핸들러
  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // 로그인하지 않은 사용자는 좋아요 기능 비활성화
    if (!isLoggedIn) {
      makeToast('로그인이 필요한 서비스입니다.', 'warning');
      return;
    }

    if (isLikeLoading) return;

    try {
      setIsLikeLoading(true);
      // 현재 상태를 기반으로 API 호출 (liked가 true면 좋아요 취소, false면 좋아요 추가)
      await toggleStoreLike(store.id, liked);

      const newLikedState = !liked;
      setLiked(newLikedState);

      // 기존 onLikeToggle이나 onLikeClick 콜백 호출
      if (onLikeToggle) {
        onLikeToggle(store.id, newLikedState);
      } else if (onLikeClick) {
        onLikeClick();
      }
    } catch (error) {
      console.error('StoreCard 좋아요 토글 실패:', error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <div
      className={`w-[380px] bg-[var(--white)] rounded-[16px] p-3 flex gap-3 shadow-sm relative items-start ${className ?? ''}`}
    >
      {/* 왼쪽: 스토어 이미지 */}
      <ImageBox
        size="xs"
        url={storeDetail.imageUrl} // 기본 이미지 설정
      />
      {/* 중앙: content 영역 */}
      <div className="flex flex-col flex-1 h-[68px] justify-between min-w-0">
        {/* 타이틀: 상단 고정 - 길면 ... 처리 */}
        <h3 className="text-[var(--black)] font-small-regular truncate">{store.name}</h3>
        {/* 영업 상태 및 시간: 가운데 */}
        <p className="font-small-regular text-[var(--black)] truncate">
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
          <div className="font-small-medium text-[var(--black)] flex items-end flex-shrink-0">
            남은 공유기&nbsp;<span className="text-[var(--main-5)]">{deviceCount}대</span>
          </div>
        </div>
      </div>
      {/* 오른쪽 상단 좋아요 버튼 */}
      <div className="absolute right-3 top-3">
        <div className="rounded-full bg-[var(--white)] flex items-center justify-center w-6 h-6 shadow-lg">
          <button
            type="button"
            onClick={handleLikeToggle}
            disabled={isLikeLoading}
            className="cursor-pointer p-0 border-none rounded-full flex items-center justify-center min-w-0 min-h-0 w-[21px] h-[21px]"
          >
            <Image
              src={
                shouldShowLikeActive
                  ? typeof ICONS.ETC.LIKE_ACTIVE === 'string'
                    ? ICONS.ETC.LIKE_ACTIVE
                    : ICONS.ETC.LIKE_ACTIVE.src
                  : typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
                    ? ICONS.ETC.LIKE_NONACTIVE
                    : ICONS.ETC.LIKE_NONACTIVE.src
              }
              alt={shouldShowLikeActive ? '좋아요 활성' : '좋아요 비활성'}
              width={21}
              height={21}
              className={isLikeLoading ? 'opacity-50' : ''}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
