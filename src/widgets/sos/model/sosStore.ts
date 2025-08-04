'use client';

import { create } from 'zustand';

interface SosState {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  sosId: number | null;
  lastRequestedSosId: number | null;
  isRespondModalOpen: boolean;
  setSosId: (id: number) => void;
  setLastRequestedSosId: (id: number) => void;
  openRespondModal: () => void;
  closeRespondModal: () => void;
}

export const useSosStore = create<SosState>((set) => ({
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () =>
    set((state: SosState) => ({
      isDrawerOpen: !state.isDrawerOpen,
    })),

  sosId: null,
  lastRequestedSosId: null,
  isRespondModalOpen: false,
  setSosId: (id: number) => set({ sosId: id }),
  setLastRequestedSosId: (id: number) => set({ lastRequestedSosId: id }),
  openRespondModal: () => set({ isRespondModalOpen: true }),
  closeRespondModal: () => set({ isRespondModalOpen: false }),
}));
