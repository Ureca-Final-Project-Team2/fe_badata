import { useCallback, useState } from 'react';

// Drawer 상태 관리를 위한 커스텀 훅
export const useDrawerState = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('distance,asc');

  const handleListView = useCallback(() => {
    // 데이터 유무와 관계없이 Drawer를 토글
    setIsDrawerOpen((prev) => !prev);
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
