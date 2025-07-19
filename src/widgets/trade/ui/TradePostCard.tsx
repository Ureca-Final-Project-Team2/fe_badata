import { formatPrice } from '@/shared/lib/formatPrice';
import DdayBadge from '@/shared/ui/DdayBadge';
import { LikeButton } from '@/shared/ui/LikeButton';
import PostStatusBadge from '@/shared/ui/PostStatusBadge';
import PriceText from '@/shared/ui/PriceText';

const DEFAULT_IMAGE = '/assets/sample.png';

interface TradePostCardProps {
  imageUrl: string;
  title: string;
  partner: string;
  price: number | string;
  likeCount: number;
  hasDday?: boolean;
  dday?: number | string;
  isCompleted?: boolean;
  className?: string;
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
  price,
  likeCount,
  hasDday = false,
  dday,
  isCompleted = false,
  className = '',
}: TradePostCardProps) => {
  return (
    <div className={`w-[178px] flex-shrink-0 rounded-[15px] bg-white flex flex-col ${className}`}>
      <div className="relative w-[178px] h-[163px] overflow-hidden bg-white flex items-center justify-center">
        {hasDday && (
          <div className="absolute top-2 left-2 z-10">
            <DdayBadge dday={dday} size="md" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 z-10">
          <LikeButton />
        </div>
        <img
          src={imageUrl || DEFAULT_IMAGE}
          alt={title}
          className="w-[178px] h-[163px] object-cover rounded-[15px] bg-[var(--gray-light)]"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
      </div>
      <div className="flex flex-col px-2 py-2 flex-1">
        <span className="text-[var(--black)] text-[20px] font-pretendard font-semibold leading-none truncate">
          {title}
        </span>
        <span className="text-[var(--black)] text-[12.8px] mt-1 font-pretendard font-light leading-none truncate">
          {partner}
        </span>
        <div className="flex items-center justify-between mt-1">
          <PriceText value={formatPrice(String(price))} size="md" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src="/assets/seashell_gray.svg" alt="좋아요" className="w-5 h-5" />
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
