import { useState } from 'react';

import { ReviewSortFilter } from '@/pages/rental/store/review/ui/ReviewSortFilter';
import { SortButton } from '@/shared/ui/SortButton';

import type { ReviewSortType } from '@/pages/rental/store/review/lib/types';

interface ReviewHeaderSectionProps {
  reviewCount: number;
  currentSort: ReviewSortType;
  onSortChange: (sort: ReviewSortType) => void;
}
export default function ReviewHeaderSection({
  reviewCount,
  currentSort,
  onSortChange,
}: ReviewHeaderSectionProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sortOptions: { value: ReviewSortType; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'rating_high', label: '별점 높은순' },
    { value: 'rating_low', label: '별점 낮은순' },
  ];

  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSort)?.label || '최신순';

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-body-semibold text-[var(--black)]">
          리뷰
          <span className="text-[var(--main-4)] ml-1">{reviewCount}</span>
        </h3>

        <SortButton label={currentSortLabel} onClick={() => setIsDrawerOpen(true)} />
      </div>
      <ReviewSortFilter
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sortOption={currentSort}
        onSortChange={onSortChange}
      />
    </>
  );
}
