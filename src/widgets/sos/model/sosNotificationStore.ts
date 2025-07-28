'use client';

import { create } from 'zustand';

import type { SosNotification } from '@/widgets/sos/lib/types';

interface SosNotificationState {
  currentSosRequest: SosNotification | null;
  isResponseModalOpen: boolean;
  setCurrentSosRequest: (notification: SosNotification | null) => void;
  openResponseModal: () => void;
  closeResponseModal: () => void;
  clearSosRequest: () => void;
}

export const useSosNotificationStore = create<SosNotificationState>((set) => ({
  currentSosRequest: null,
  isResponseModalOpen: false,
  setCurrentSosRequest: (notification) => set({ currentSosRequest: notification }),
  openResponseModal: () => set({ isResponseModalOpen: true }),
  closeResponseModal: () => set({ isResponseModalOpen: false }),
  clearSosRequest: () => set({ currentSosRequest: null, isResponseModalOpen: false }),
})); 