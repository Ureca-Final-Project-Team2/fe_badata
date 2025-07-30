import { useCallback, useState } from 'react';

import { initialRentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

// 필터 상태 관리를 위한 커스텀 훅
export const useFilterState = () => {
  const [filterState, setFilterState] = useState<RentalFilterState>(initialRentalFilterState);
  const [tempFilterState, setTempFilterState] =
    useState<RentalFilterState>(initialRentalFilterState);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleFilterSubmit = useCallback((filters: RentalFilterState) => {
    setFilterState(filters);
    setFilterDrawerOpen(false);
  }, []);

  return {
    filterState,
    tempFilterState,
    setTempFilterState,
    filterDrawerOpen,
    setFilterDrawerOpen,
    handleFilterSubmit,
  };
};
