import { ICONS } from '@/shared/config/iconPath';
import { IMAGES } from '@/shared/config/imagePath';
import { formatPrice } from '@/shared/lib/formatPrice';
import DdayBadge from '@/shared/ui/DdayBadge';
import { PostLikeButton } from '@/shared/ui/LikeButton/PostLikeButton';
import PriceText from '@/shared/ui/PriceText';
import Image from 'next/image';

const DEFAULT_IMAGE = IMAGES.TRADE.TRADE_SAMPLE;

interface SellerPostCardProps {
  imageUrl: string;
  title: string;
  partner: string;
  price: number | string;
  likeCount: number;
  hasDday?: boolean;
  dday?: number | string;
  isLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
  className?: string;
}

/**
 * SellerPostCard - 판매자 다른 상품 카드 (디데이 유무 분기)
 * @param imageUrl - 상품 이미지 URL
 * @param title - 게시물 제목
 * @param partner - 제휴처
 * @param price - 상품 가격
 * @param likeCount - 좋아요 수
 * @param hasDday - 디데이 뱃지 표시 여부
 * @param dday - 디데이 값
 * @param className - 추가 커스텀 클래스
 */
const SellerPostCard = ({
  imageUrl,
  title,
  partner,
  price,
  likeCount,
  hasDday = false,
  dday,
  isLiked = false,
  onLikeChange,
  className = '',
}: SellerPostCardProps) => {
  return (
    <div
      className={`w-[120px] h-[189px] rounded-[20px] bg-[var(--gray-light)] flex flex-col items-center p-1.5 ${className}`}
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
          src={imageUrl || DEFAULT_IMAGE}
          alt={title}
          width={106}
          height={102}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
      </div>
      <div className="flex flex-col w-full px-2 mt-2.5">
        <span className="text-[var(--black)] text-[12px] mt-0.5 font-sans font-semibold leading-none truncate">
          {title}
        </span>
        <span className="text-[var(--black)] text-[10px] mt-1.5 font-sans font-light leading-none truncate">
          {partner}
        </span>
        <PriceText value={formatPrice(String(price))} size="sm" className="mt-1.5" />
      </div>
      <div className="flex items-center w-full px-2 gap-1 mt-0.5">
        <Image src={ICONS.ETC.SHELL_GRAY} alt="좋아요" width={20} height={20} className="w-5 h-5" />
        <span className="text-[var(--black)] text-[12px] font-sans font-normal leading-none">
          {likeCount}
        </span>
      </div>
    </div>
  );
};

export default SellerPostCard;
