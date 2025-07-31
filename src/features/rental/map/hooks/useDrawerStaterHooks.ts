import { useCallback, useState } from 'react';

// Drawer 상태 관리를 위한 커스텀 훅
export const useDrawerState = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('distance,asc');

  const handleListView = useCallback((storeList?: unknown[], isLoading?: boolean) => {
    // 데이터가 로딩 중이거나 빈 배열이면 Drawer를 열지 않음
    if (isLoading || !storeList || storeList.length === 0) {
      return;
    }

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
