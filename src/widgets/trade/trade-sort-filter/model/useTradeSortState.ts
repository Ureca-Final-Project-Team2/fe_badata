import { useState } from 'react';

export function useTradeSortState() {
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

  return {
    sortOption,
    setSortOption,
    isSortDrawerOpen,
    openDrawer: () => setIsSortDrawerOpen(true),
    closeDrawer: () => setIsSortDrawerOpen(false),
  };
}
