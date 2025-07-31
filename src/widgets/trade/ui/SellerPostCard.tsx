import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';
import { formatPrice } from '@/shared/lib/formatPrice';
import { getCarrierDefaultImage } from '@/shared/lib/getCarrierDefaultImage';
import { getPartnerDefaultImage } from '@/shared/lib/getPartnerDefaultImage';
import DdayBadge from '@/shared/ui/DdayBadge';
import { PostLikeButton } from '@/shared/ui/LikeButton';
import PriceText from '@/shared/ui/PriceText';

import type { MobileCarrier } from '@/features/trade/register/data/lib/types';
import type { KoreanBrandName } from '@/shared/config/brandMapping';

const DEFAULT_IMAGE = ICONS.LOGO.DETAIL;

interface SellerPostCardProps {
  title: string;
  price: number | string;
  likeCount: number;
  partner?: string;
  mobileCarrier?: MobileCarrier;
  hasDday?: boolean;
  dday?: number | string;
  isLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
  className?: string;
}

/**
 * SellerPostCard - 판매자 다른 상품 카드 (디데이 유무 분기)
 * @param title - 게시물 제목
 * @param partner - 제휴처 (기프티콘 게시물)
 * @param mobileCarrier - 통신사 (데이터 게시물)
 * @param price - 상품 가격
 * @param likeCount - 좋아요 수
 * @param hasDday - 디데이 뱃지 표시 여부
 * @param dday - 디데이 값
 * @param className - 추가 커스텀 클래스
 */
const SellerPostCard = ({
  title,
  partner,
  mobileCarrier,
  price,
  likeCount,
  hasDday = false,
  dday,
  isLiked = false,
  onLikeChange,
  className = '',
}: SellerPostCardProps) => {
  const getSafeImageUrl = (): string => {
    // 기프티콘 게시물인 경우 항상 파트너별 디폴트 이미지 사용
    if (partner) {
      return getPartnerDefaultImage(partner as KoreanBrandName);
    }

    // 데이터 게시물인 경우 통신사별 디폴트 이미지 사용
    if (mobileCarrier) {
      return getCarrierDefaultImage(mobileCarrier);
    }

    // 기본 이미지
    return DEFAULT_IMAGE;
  };

  return (
    <div
      className={`w-[120px] h-[189px] rounded-[20px] bg-[var(--gray-light)] flex flex-col items-center p-1.5 flex-shrink-0 ${className}`}
    >
      <div className="relative w-[106px] h-[102px] rounded-[15px] overflow-hidden bg-[var(--white)] flex items-center justify-center">
        {hasDday && (
          <div className="absolute top-1 left-2 z-10">
            <DdayBadge dday={dday} size="sm" />
          </div>
        )}
        <div className="absolute bottom-1 right-1 z-10">
          <PostLikeButton active={isLiked} onClick={() => onLikeChange?.(!isLiked)} />
        </div>
        <Image
          src={getSafeImageUrl()}
          alt={title}
          width={106}
          height={102}
          className="w-full h-full object-cover"
          sizes="106px"
          onError={(e) => {
            // 기프티콘 게시물인 경우 파트너별 디폴트 이미지 사용
            if (partner) {
              e.currentTarget.src = getPartnerDefaultImage(partner as KoreanBrandName);
            } else {
              // 데이터 게시물인 경우 통신사별 디폴트 이미지 사용
              e.currentTarget.src = mobileCarrier
                ? getCarrierDefaultImage(mobileCarrier)
                : DEFAULT_IMAGE;
            }
          }}
        />
      </div>
      <div className="flex flex-col w-full px-2 mt-2.5 min-w-0">
        <span className="text-[var(--black)] text-[12px] mt-0.5 font-sans font-semibold leading-none truncate w-full">
          {title}
        </span>
        <span className="text-[var(--black)] text-[10px] mt-1.5 font-sans font-light leading-none truncate w-full">
          {partner ? partner : mobileCarrier}
        </span>
        <PriceText value={formatPrice(String(price))} size="sm" className="mt-1.5" />
      </div>
      <div className="flex items-center w-full px-2 gap-1 mt-0.5 min-w-0">
        <Image
          src={ICONS.ETC.LIKE_NONACTIVE}
          alt="좋아요"
          width={20}
          height={20}
          className="w-5 h-5 flex-shrink-0"
        />
        <span className="text-[var(--black)] text-[12px] font-sans font-normal leading-none truncate">
          {likeCount}
        </span>
      </div>
    </div>
  );
};

export default SellerPostCard;
