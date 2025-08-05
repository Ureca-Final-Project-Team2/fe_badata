import { create } from 'zustand';

interface AuthErrorState {
  isAuthModalOpen: boolean;
  pendingRequest: (() => Promise<unknown>) | null;
  pendingUrl: string | null;
  onAuthModalClose: (() => void) | null;
  openAuthModal: (request?: () => Promise<unknown>, url?: string, onClose?: () => void) => void;
  closeAuthModal: () => void;
  executePendingRequest: () => Promise<void>;
}

export const useAuthErrorStore = create<AuthErrorState>((set, get) => ({
  isAuthModalOpen: false,
  pendingRequest: null,
  pendingUrl: null,
  onAuthModalClose: null,
  openAuthModal: (request, url, onClose) => {
    set({
      isAuthModalOpen: true,
      pendingRequest: request || null,
      pendingUrl: url || null,
      onAuthModalClose: onClose || null,
    });
  },
  closeAuthModal: () => {
    const { onAuthModalClose } = get();
    // AuthModal이 닫힐 때 콜백 실행
    if (onAuthModalClose) {
      onAuthModalClose();
    }
    set({
      isAuthModalOpen: false,
      pendingRequest: null,
      pendingUrl: null,
      onAuthModalClose: null,
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
      onAuthModalClose: null,
    });
  },
}));
