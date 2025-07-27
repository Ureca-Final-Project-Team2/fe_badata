'use client';

import { FilterDrawer } from '@/shared/ui/FilterDrawer';

interface SortDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSortSelect: (sortType: string) => void;
  currentSort: string;
}

export const SortDrawer = ({ isOpen, onClose, onSortSelect, currentSort }: SortDrawerProps) => {
  const sortOptions = [
    { id: 'latest', label: '최신순' },
    { id: 'likes', label: '좋아요순' },
  ];

  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose} className="bg-[var(--main-2)]">
      <div className="p-4">
        <div className="font-body-bold text-[var(--black)] mb-4">정렬 기준</div>
        <div className="flex flex-col gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              className={`w-full text-left p-3 rounded-lg font-body-medium ${
                currentSort === option.id
                  ? 'bg-[var(--main-5)] text-white'
                  : 'bg-white text-[var(--black)]'
              }`}
              onClick={() => {
                onSortSelect(option.id);
                onClose();
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </FilterDrawer>
  );
};
