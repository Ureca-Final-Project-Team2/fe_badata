import { useState } from 'react';

import Image from 'next/image';

import { formatDateToDash } from '@/pages/rental/store/review/lib/utils';
import { ICONS } from '@/shared/config/iconPath';
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

  const formattedDate = formatDateToDash(review.rentalStartDate);

  return (
    <div className="border-b border-[var(--gray-light)] pb-6 mb-6 last:border-b-0">
      <Profile
        avatar={review.userImageUrl}
        name={review.name}
        size="sm"
        bottomContent={
          <>
            <div className="flex items-center gap-1">
              <Image src={ICONS.ETC.LIKE_ACTIVE} width={18} height={18} alt="별점" />
              <span className="font-label-medium text-[var(--main-5)]">
                {review.rating.toFixed(1)}
              </span>
            </div>
            <span className="font-caption-regular text-[var(--gray-dark)]">
              {formattedDate} · {review.countOfVisit}번째 방문
            </span>
          </>
        }
      />

      {review.reviewImageUrl && (
        <div className="mt-4 mb-2">
          <Image
            src={review.reviewImageUrl}
            alt="리뷰 이미지"
            width={200}
            height={140}
            className="w-full h-[140px] object-contain rounded-lg bg-[var(--gray-light)]"
          />
        </div>
      )}
      <div className="flex flex-row gap-4">
        {review.reservedDeviceOnReviewResponses.map((device, index) => (
          <span
            key={index}
            className="inline-block my-2 px-3 py-1 bg-[var(--gray-light)] text-[var(--black)] font-small-regular rounded-sm"
          >
            <span className="text-[var(--main-5)] font-small-semibold">
              {device.dataCapacity}GB&nbsp;
            </span>
            {device.deviceName}
          </span>
        ))}
      </div>
      <div className="mb-4 space-y-2">
        <p className="font-label-regular leading-relaxed whitespace-pre-wrap break-all">
          {displayText}
        </p>
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
      </div>
    </div>
  );
}
