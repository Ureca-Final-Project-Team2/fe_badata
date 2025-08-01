'use client';

import { create } from 'zustand';

interface SosState {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  sosId: number | null;
  setSosId: (id: number) => void;
}

export const useSosStore = create<SosState>((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  sosId: null,
  setSosId: (id: number) => set({ sosId: id }),
}));
