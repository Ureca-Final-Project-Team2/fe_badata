import React from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';
import { formatPrice } from '@/shared/lib/formatPrice';
import DdayBadge from '@/shared/ui/DdayBadge';
import { PostLikeButton } from '@/shared/ui/LikeButton/PostLikeButton';
import PostStatusBadge from '@/shared/ui/PostStatusBadge';
import PriceText from '@/shared/ui/PriceText';

import type { MobileCarrier } from '@/pages/trade/register/data/lib/types';
const DEFAULT_IMAGE = ICONS.LOGO.DETAIL;

interface TradePostCardProps {
  imageUrl?: string;
  title: string;
  price: number | string;
  likeCount: number;
  partner?: string;
  mobileCarrier?: MobileCarrier;
  hasDday?: boolean;
  dday?: number | string;
  isCompleted?: boolean;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  onCardClick?: () => void;
  className?: string;
  isLikeLoading?: boolean;
}

/**
 * TradePostCard - 거래 게시물 카드
 * @param imageUrl - 상품 이미지 URL
 * @param title - 게시물 제목
 * @param partner - 제휴처
 * @param price - 상품 가격
 * @param likeCount - 좋아요 수
 * @param hasDday - 디데이 뱃지 표시 여부
 * @param dday - 디데이 값
 * @param isCompleted - 거래 완료 상태
 * @param className - 추가 커스텀 클래스
 */
const TradePostCard = ({
  imageUrl,
  title,
  partner,
  mobileCarrier,
  price,
  likeCount,
  hasDday = false,
  dday,
  isCompleted = false,
  isLiked = false,
  onLikeToggle,
  onCardClick,
  className = '',
  isLikeLoading = false,
}: TradePostCardProps) => {
  const getSafeImageUrl = (url?: string): string => {
    if (!url || url.trim() === '' || url === 'null' || url === 'undefined' || url === 'no image') {
      return DEFAULT_IMAGE;
    }

    // URL 유효성 검사
    if (
      !url.startsWith('/') &&
      !url.startsWith('http://') &&
      !url.startsWith('https://') &&
      !url.startsWith('./')
    ) {
      return DEFAULT_IMAGE;
    }

    return url;
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLikeLoading) {
      onLikeToggle?.();
    }
  };

  const handleCardClick = () => {
    onCardClick?.();
  };

  return (
    <div
      className={`w-[178px] flex-shrink-0 rounded-[15px] bg-white flex flex-col cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative w-[178px] h-[163px] overflow-hidden bg-white flex items-center justify-center">
        {hasDday && (
          <div className="absolute top-2 left-2 z-10">
            <DdayBadge dday={dday} size="md" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 z-10">
          <PostLikeButton active={isLiked} onClick={handleLikeClick} disabled={isLikeLoading} />
        </div>
        <Image
          src={getSafeImageUrl(imageUrl)}
          alt={title}
          width={178}
          height={163}
          className="w-[178px] h-[163px] object-cover rounded-[15px] bg-[var(--gray-light)]"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
      </div>
      <div className="flex flex-col px-2 py-2 flex-1">
        <span className="text-[var(--black)] text-[18px] mt-1.5 font-pretendard font-semibold leading-none truncate">
          {title}
        </span>
        <span className="text-[var(--black)] text-[12.8px] mt-1.5 font-pretendard font-light leading-none truncate">
          {partner ? partner : mobileCarrier}
        </span>
        <div className="flex items-center justify-between mt-1.5">
          <PriceText value={formatPrice(String(price))} size="md" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 mt-0.5">
            <Image
              src={ICONS.ETC.LIKE_NONACTIVE}
              alt="좋아요"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="flex items-center text-[var(--black)] text-[12.8px] font-pretendard font-normal leading-[20px]">
              {likeCount}
            </span>
          </div>
          {isCompleted && <PostStatusBadge text="거래 완료" />}
        </div>
      </div>
    </div>
  );
};

export default TradePostCard;
