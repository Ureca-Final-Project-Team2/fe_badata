'use client';

import { useCallback, useState } from 'react';

export function useSosDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return {
    isDrawerOpen: isOpen,
    openDrawer,
    closeDrawer,
  };
}
