import { useState } from 'react';

/**
 * 범용 정렬 상태 관리 훅
 * @param defaultOption - 기본 정렬 옵션 값
 */

export function useSortStateHook<T extends string>(defaultOption: T) {
  const [sortOption, setSortOption] = useState<T>(defaultOption);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

  return {
    sortOption,
    setSortOption,
    isSortDrawerOpen,
    openDrawer: () => setIsSortDrawerOpen(true),
    closeDrawer: () => setIsSortDrawerOpen(false),
  };
}
