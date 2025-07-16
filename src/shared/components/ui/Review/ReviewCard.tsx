import { cn } from '@lib/cn';
import { cva, VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

const reviewCardVariants = cva(
  'bg-white rounded-[20px] border border-gray-200 shadow-sm hover:shadow-md transition-shadow',
  {
    variants: {
      size: {
        default: 'w-[380px] h-[130px] p-4',
        sm: 'w-[320px] h-[110px] p-3',
        lg: 'w-[440px] h-[150px] p-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

type ReviewCardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof reviewCardVariants> & {
    title: string;
    rating: string;
    price: string;
    showReviewButton?: boolean;
    onReviewClick?: () => void;
  };

function ReviewHeader({
  title,
  showReviewButton,
  onReviewClick,
}: {
  title: string;
  showReviewButton?: boolean;
  onReviewClick?: () => void;
}) {
  return (
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-bold text-[20px] text-black flex-1 truncate">{title}</h3>
      {showReviewButton && (
        <button
          onClick={onReviewClick}
          className="ml-4 text-[var(--point-1)] font-semibold text-[16px] hover:text-[var(--point-2)] transition-colors flex-shrink-0"
          type="button"
        >
          📝 리뷰쓰기
        </button>
      )}
    </div>
  );
}

function ReviewFooter({ rating, price }: { rating: string; price: string }) {
  return (
    <div className="flex justify-between items-end">
      <div className="font-semibold text-[16px] text-black">{rating}</div>
      <div className="font-medium text-[20px] text-black">{price}</div>
    </div>
  );
}

export const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    { className, size, title, rating, price, showReviewButton = false, onReviewClick, ...props },
    ref,
  ) => {
    return (
      <div className={cn(reviewCardVariants({ size }), className)} ref={ref} {...props}>
        <ReviewHeader
          title={title}
          showReviewButton={showReviewButton}
          onReviewClick={onReviewClick}
        />
        <div className="border-t border-dotted border-gray-300 mb-3" />
        <ReviewFooter rating={rating} price={price} />
      </div>
    );
  },
);
export type { ReviewCardProps };

ReviewCard.displayName = 'ReviewCard';
