import { create } from 'zustand';

interface AuthErrorState {
  isAuthModalOpen: boolean;
  pendingRequest: (() => Promise<unknown>) | null;
  pendingUrl: string | null;
  openAuthModal: (request?: () => Promise<unknown>, url?: string) => void;
  closeAuthModal: () => void;
  executePendingRequest: () => Promise<void>;
}

export const useAuthErrorStore = create<AuthErrorState>((set, get) => ({
  isAuthModalOpen: false,
  pendingRequest: null,
  pendingUrl: null,
  openAuthModal: (request, url) => {
    set({
      isAuthModalOpen: true,
      pendingRequest: request || null,
      pendingUrl: url || null,
    });
  },
  closeAuthModal: () => {
    set({
      isAuthModalOpen: false,
      pendingRequest: null,
      pendingUrl: null,
    });
  },
  executePendingRequest: async () => {
    const { pendingRequest } = get();
    if (pendingRequest) {
      try {
        await pendingRequest();
      } catch (error) {
        console.error('Pending request failed:', error);
      }
    }
    set({
      isAuthModalOpen: false,
      pendingRequest: null,
      pendingUrl: null,
    });
  },
}));
