import { FilterDrawer, FilterOption } from '@/shared/ui/FilterDrawer';

interface TradeSortFilterProps {
  isOpen: boolean;
  onClose: () => void;
  sortOption: 'latest' | 'popular';
  onSortChange: (sort: 'latest' | 'popular') => void;
}

export function TradeSortFilter({
  isOpen,
  onClose,
  sortOption,
  onSortChange,
}: TradeSortFilterProps) {
  const handleSelect = (value: 'latest' | 'popular') => {
    onSortChange(value);
    onClose();
  };

  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose}>
      <FilterOption selected={sortOption === 'latest'} onClick={() => handleSelect('latest')}>
        최신순
      </FilterOption>
      <FilterOption selected={sortOption === 'popular'} onClick={() => handleSelect('popular')}>
        인기순
      </FilterOption>
    </FilterDrawer>
  );
}
