'use client';

import { useSosStore } from '@features/sos/stores/sosStores';

export function useSosDrawer() {
  const { isDrawerOpen, openDrawer, closeDrawer, toggleDrawer } = useSosStore();

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
