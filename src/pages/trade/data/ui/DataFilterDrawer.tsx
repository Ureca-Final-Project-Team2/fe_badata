import { FilterDrawer } from '@/shared/ui/FilterDrawer';

import DataFilterContent from './DataFilterContent';

import type { DataFilterState } from '../model/dataFilterReducer';

interface DataFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (filters: DataFilterState) => void;
}

export function DataFilterDrawer({ isOpen, onClose, onSubmit }: DataFilterDrawerProps) {
  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose}>
      <DataFilterContent onClose={onClose} onSubmit={onSubmit} />
    </FilterDrawer>
  );
}
