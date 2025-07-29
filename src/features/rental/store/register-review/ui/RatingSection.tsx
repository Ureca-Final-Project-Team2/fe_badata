import { useCallback } from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface RatingSectionProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}
export default function RatingSection({ rating, onRatingChange }: RatingSectionProps) {
  const ICON_SIZE = 40;

  const handleStarClick = useCallback(
    (starValue: number) => {
      onRatingChange(starValue);
    },
    [onRatingChange],
  );

  return (
    <div className="bg-[var(--main-1)] rounded-2xl p-4 mb-6">
      <h3 className="font-label-semibold mb-3">만족도를 별점으로 나타내주세요!</h3>

      <div className="flex items-center justify-center gap-1 p-2">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <button
            key={starValue}
            type="button"
            onClick={() => handleStarClick(starValue)}
            className="p-1 transition-transform active:scale-95 touch-manipulation"
          >
            <Image
              src={rating >= starValue ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE}
              width={ICON_SIZE}
              height={ICON_SIZE}
              alt=""
              draggable={false}
              priority
            />
          </button>
        ))}
      </div>
    </div>
  );
}
