import DataFilterContent from '@/features/trade/data/ui/DataFilterContent';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';

import type {
  DataFilterAction,
  DataFilterState,
} from '@/features/trade/data/model/dataFilterReducer';

interface DataFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: DataFilterState;
  dispatch: React.Dispatch<DataFilterAction>;
  onSubmit: (filters: DataFilterState) => void;
}

export function DataFilterDrawer({
  isOpen,
  onClose,
  filterState,
  dispatch,
  onSubmit,
}: DataFilterDrawerProps) {
  return (
    <FilterDrawer isOpen={isOpen} onClose={onClose}>
      <DataFilterContent
        state={filterState}
        dispatch={dispatch}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FilterDrawer>
  );
}
