import { FilterDrawer, FilterOption } from '@/shared/ui/FilterDrawer';

import type { ReviewSortType } from '@/pages/rental/store/review/lib/types';

interface ReviewSortDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sortOption: ReviewSortType;
  onSortChange: (sort: ReviewSortType) => void;
}

export function ReviewSortDrawer({
  isOpen,
  onClose,
  sortOption,
  onSortChange,
}: ReviewSortDrawerProps) {
  const handleSelect = (value: ReviewSortType) => {
    onSortChange(value);
    onClose();
  };

  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose}>
      <FilterOption selected={sortOption === 'latest'} onClick={() => handleSelect('latest')}>
        최신순
      </FilterOption>
      <FilterOption
        selected={sortOption === 'rating_high'}
        onClick={() => handleSelect('rating_high')}
      >
        별점 높은순
      </FilterOption>
      <FilterOption
        selected={sortOption === 'rating_low'}
        onClick={() => handleSelect('rating_low')}
      >
        별점 낮은순
      </FilterOption>
    </FilterDrawer>
  );
}
