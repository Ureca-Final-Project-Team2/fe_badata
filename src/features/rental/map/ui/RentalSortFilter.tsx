'use client';

import { FilterDrawer, FilterOption } from '@/shared/ui/FilterDrawer';

interface RentalSortFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSortSelect: (sortType: string) => void;
  currentSort: string;
}

export const RentalSortFilter = ({
  isOpen,
  onClose,
  onSortSelect,
  currentSort,
}: RentalSortFilterProps) => {
  const sortOptions = [
    { id: 'distance,asc', label: '거리순' },
    { id: 'reviewCount,desc', label: '리뷰순' },
    { id: 'likeCount,desc', label: '좋아요순' },
  ];

  const handleSelect = (sortType: string) => {
    onSortSelect(sortType);
    onClose();
  };

  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          {sortOptions.map((option) => (
            <FilterOption
              key={option.id}
              selected={currentSort === option.id}
              onClick={() => handleSelect(option.id)}
            >
              {option.label}
            </FilterOption>
          ))}
        </div>
      </div>
    </FilterDrawer>
  );
};
