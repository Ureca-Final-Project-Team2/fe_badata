import { useState } from 'react';

import Image from 'next/image';

import { StarRating } from '@/pages/rental/store/review/ui/StarRating';
import { Profile } from '@/shared/ui/Profile';

import type { ReviewItem as ReviewItemType } from '@/pages/rental/store/review/lib/types.ts';

interface ReviewItemProps {
  review: ReviewItemType;
}

const QuickReplyTag = ({ text }: { text: string }) => {
  return (
    <span className="inline-block px-3 py-1 bg-[var(--main-3)] font-small-medium rounded-sm">
      {text}
    </span>
  );
};
export default function ReviewItem({ review }: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldShowMore = review.comment.length > maxLength;

  const displayText =
    isExpanded || !shouldShowMore ? review.comment : review.comment.slice(0, maxLength) + '...';

  return (
    <div className="border-b border-[var(--gray-light)] pb-6 mb-6 last:border-b-0">
      <Profile
        avatar={review.userImageUrl}
        name={review.name}
        subtitle={`거래 내역 ${review.countOfVisit}`}
        size="sm"
      />
      <StarRating rating={review.rating} size={24} />
      {review.reviewImageUrl && (
        <div className="mb-4">
          <Image
            src={review.reviewImageUrl}
            alt="리뷰 이미지"
            width={140}
            height={140}
            className="w-[140px] h-[140px] object-cover rounded-lg bg-[var(--gray-light)]"
          />
        </div>
      )}
      <div className="mb-4 space-y-2">
        <p className="font-label-regular leading-relaxed whitespace-pre-wrap">{displayText}</p>
        {shouldShowMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[var(--gray-mid)] font-small-regular hover:underline mt-1"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}

        {review.quickReplyNames.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {review.quickReplyNames.map((tag, index) => (
              <QuickReplyTag key={index} text={tag} />
            ))}
          </div>
        )}

        <p className="font-small-regular text-[var(--gray-dark)] text-right">
          {review.countOfVisit}번째 방문
        </p>
      </div>
    </div>
  );
}
