import { useCallback, useState } from 'react';

// Drawer 상태 관리를 위한 커스텀 훅
export const useDrawerState = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState('distance,asc');

  const handleListView = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleSortClick = useCallback(() => {
    setIsSortDrawerOpen(true);
  }, []);

  const handleSortSelect = useCallback((sortType: string) => {
    setCurrentSort(sortType);
  }, []);

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    isSortDrawerOpen,
    setIsSortDrawerOpen,
    currentSort,
    handleListView,
    handleSortClick,
    handleSortSelect,
  };
};
