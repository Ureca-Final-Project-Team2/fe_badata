'use client';

import { StarIcon } from 'lucide-react';

interface StarRatingProps {
  score: number;
  size?: 'sm' | 'lg';
}

export const StarRating = ({ score, size = 'sm' }: StarRatingProps) => {
  const MAX_STARS = 5;
  const pixelSize = size === 'sm' ? 15 : 34;

  const stars = Array.from({ length: MAX_STARS }).map((_, index) => {
    const full = index + 1 <= score;
    const half = score > index && score < index + 1;

    return (
      <div key={index} className="relative" style={{ width: pixelSize, height: pixelSize }}>
        {/* 빈 별 */}
        <StarIcon className="text-[color:var(--gray)]" strokeWidth={1.5} size={pixelSize} />

        {/* 채워진 별 */}
        {full && (
          <StarIcon
            className="absolute top-0 left-0 text-[color:var(--main-2)]"
            fill="var(--main-2)"
            stroke="var(--main-2)"
            strokeWidth={1.5}
            size={pixelSize}
          />
        )}

        {/* 절반 별 */}
        {half && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${pixelSize / 2}px`, height: pixelSize }}
          >
            <StarIcon
              className="text-[color:var(--main-2)]"
              fill="var(--main-2)"
              stroke="var(--main-2)" // ✅ 테두리도 main-2 색상
              strokeWidth={1.5}
              size={pixelSize}
            />
          </div>
        )}
      </div>
    );
  });

  return <div className="flex gap-[4px]">{stars}</div>;
};
