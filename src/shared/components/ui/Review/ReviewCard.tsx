import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

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

export interface ReviewCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof reviewCardVariants> {
  title: string;
  rating: string;
  price: string;
  showReviewButton?: boolean;
  onReviewClick?: () => void;
}

export const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    { className, size, title, rating, price, showReviewButton = false, onReviewClick, ...props },
    ref,
  ) => {
    return (
      <div className={cn(reviewCardVariants({ size }), className)} ref={ref} {...props}>
        {/* Header */}
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

        {/* Divider */}
        <div className="border-t border-dotted border-gray-300 mb-3"></div>

        {/* Content */}
        <div className="flex justify-between items-end">
          <div className="font-semibold text-[16px] text-black">{rating}</div>
          <div className="font-medium text-[20px] text-black">{price}</div>
        </div>
      </div>
    );
  },
);

ReviewCard.displayName = 'ReviewCard';
