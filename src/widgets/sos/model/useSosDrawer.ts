'use client';

import { useSosStore } from '@/widgets/sos/model/sosStore';

export function useSosDrawer() {
  const { isDrawerOpen, openDrawer, closeDrawer, toggleDrawer } = useSosStore();

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
