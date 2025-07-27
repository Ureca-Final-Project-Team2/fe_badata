import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export function StarRating({ rating, size = 20 }: StarRatingProps) {
  const icons = {
    active: ICONS.ETC.LIKE_ACTIVE,
    noactive: ICONS.ETC.LIKE_NONACTIVE,
  };

  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;
        return (
          <div key={star}>
            <Image
              src={isActive ? icons.active : icons.noactive}
              width={size}
              height={size}
              alt={isActive ? '활성' : '비활성'}
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
