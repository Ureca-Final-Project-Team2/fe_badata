import React from 'react';

import Image from 'next/image';

import { Phone, Share } from 'lucide-react';

import InfoAction from '@/features/rental/store/store-detail/ui/InfoAction';
import { ICONS } from '@/shared/config/iconPath';
import { formatDistanceString } from '@/shared/lib/format/distanceUtils';

interface InfoSectionProps {
  reviewRating: number;
  distanceFromMe: number;
  phoneNumber: string;
  liked: boolean;
  isLikeLoading?: boolean;
  onLikeToggle: () => void;
}

function InfoSection({
  reviewRating,
  distanceFromMe,
  phoneNumber,
  liked,
  isLikeLoading = false,
  onLikeToggle,
}: InfoSectionProps) {
  // 찜 상태에 따라 아이콘 선택
  const likeIcon = liked ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE;
  const likeStoreIcon = typeof likeIcon === 'string' ? likeIcon : likeIcon.src;

  const ratingIcon =
    typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
      ? ICONS.ETC.LIKE_NONACTIVE
      : ICONS.ETC.LIKE_NONACTIVE.src;

  // 거리 포맷팅 및 색상 클래스 계산
  const formattedDistance = formatDistanceString(distanceFromMe);

  return (
    <div className="w-full bg-[var(--white)] flex flex-col items-center mb-4">
      {/* 평점과 거리 정보 */}
      <div className="flex items-center w-full justify-between mb-2">
        <div className="flex items-center gap-1">
          <Image src={ratingIcon} alt="평점" width={30} height={30} />
          <span className="font-label-semibold">{reviewRating.toFixed(1)}</span>
        </div>
        <span className="font-label-regular text-[var(--black)]">
          나와의 거리{' '}
          <span className="font-label-semibold text-[var(--main-5)]">{formattedDistance}</span>
        </span>
      </div>

      {/* 구분선 위 */}
      <div className="w-full border-t border-[var(--gray-light)] my-2" />

      {/* 액션 버튼들 */}
      <div className="flex items-stretch w-full relative">
        {/* 전화 버튼 */}
        <InfoAction
          icon={<Phone size={24} className="text-[var(--gray-dark)]" />}
          label="전화"
          href={`tel:${phoneNumber}`}
        />

        <div className="w-px bg-[var(--gray-light)] mx-2" />

        {/* 찜 버튼 */}
        <InfoAction
          icon={
            isLikeLoading ? (
              <div className="w-[30px] h-[30px] flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <Image src={likeStoreIcon} alt="찜" width={30} height={30} />
            )
          }
          label="찜"
          active={liked}
          onClick={onLikeToggle}
          disabled={isLikeLoading}
        />

        <div className="w-px bg-[var(--gray-light)] mx-2" />

        {/* 공유 버튼 */}
        <InfoAction icon={<Share size={24} className="text-[var(--gray-dark)]" />} label="공유" />
      </div>

      {/* 구분선 아래 */}
      <div className="w-full border-t border-[var(--gray-light)] mt-2" />
      <div className="w-full flex justify-start mt-2"></div>
    </div>
  );
}

// React.memo로 최적화하여 props가 변경되지 않으면 리렌더링 방지
export default React.memo(InfoSection);
