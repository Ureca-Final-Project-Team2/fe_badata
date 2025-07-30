import { ListFilter } from 'lucide-react';

import { SortButton } from '@/shared/ui/SortButton';

interface DataListFilterProps {
  sortLabel: string;
  onSortClick: () => void;
  onFilterClick: () => void;
}
export function DataListFilter({ sortLabel, onSortClick, onFilterClick }: DataListFilterProps) {
  return (
    <div className="flex flex-row justify-between py-2">
      <SortButton label={sortLabel} onClick={onSortClick} />

      <button
        type="button"
        onClick={onFilterClick}
        className="flex flex-row gap-1 items-center font-label-semibold"
      >
        조건
        <ListFilter size={14} />
      </button>
    </div>
  );
}
