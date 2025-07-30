import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';
import { formatPrice } from '@/shared/lib/formatPrice';
import { PostLikeButton } from '@/shared/ui/LikeButton/PostLikeButton';
import PriceText from '@/shared/ui/PriceText';

import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

const DEFAULT_IMAGE = ICONS.LOGO.DETAIL;

interface BannerItemProps {
  id: number;
  imageUrl?: string;
  title: string;
  price: number | string;
  likeCount: number;
  partner?: string;
  mobileCarrier?: MobileCarrier;
  hasDday?: boolean;
  dday?: string;
  isCompleted?: boolean;
  isLiked?: boolean;
  onLikeToggle?: (id: number) => void;
  onCardClick?: (id: number) => void;
  className?: string;
  isLikeLoading?: boolean;
}

const BannerItem = ({
  id,
  imageUrl,
  title,
  partner,
  mobileCarrier,
  price,
  likeCount,
  isLiked = false,
  onLikeToggle,
  onCardClick,
  className = '',
  isLikeLoading = false,
}: BannerItemProps) => {
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
      onLikeToggle?.(id);
    }
  };

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  return (
    <div
      className={`w-[380px] flex-shrink-0 overflow-hidden flex flex-col cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative w-[380px] h-[160px] overflow-hidden p-4 gap-6 bg-[var(--main-1)] rounded-2xl flex flex-row">
        <div className="absolute bottom-2 right-4 z-10 flex flex-row gap-1 items-center">
          <PostLikeButton active={isLiked} onClick={handleLikeClick} disabled={isLikeLoading} />
          <span className="font-small-medium">{likeCount}</span>
        </div>
        <Image
          src={getSafeImageUrl(imageUrl)}
          alt={title || '이미지'}
          width={125}
          height={125}
          className="w-[125px] h-[125px] object-cover rounded-[15px] bg-[var(--gray-light)]"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
        <div className="flex flex-col gap-1 py-2 w-[200px]">
          <span className="text-[var(--black)] font-body-semibold leading-tight line-clamp-1 min-h-[20px]">
            {title}
          </span>
          <span className="text-[var(--black)] mt-1.5 font-label-regular leading-none truncate">
            {partner ? partner : mobileCarrier}
          </span>
          <div className="flex items-center justify-between mt-3">
            <PriceText value={formatPrice(String(price))} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
