import { create } from 'zustand';

import { useAuthStore } from '@/entities/auth/model/authStore';

interface AuthErrorState {
  isAuthModalOpen: boolean;
  pendingRequest: (() => Promise<unknown>) | null;
  pendingUrl: string | null;
  onAuthModalClose: (() => void) | null;
  openAuthModal: (request?: () => Promise<unknown>, url?: string, onClose?: () => void) => void;
  closeAuthModal: () => void;
  executePendingRequest: () => Promise<void>;
  checkAndExecutePendingRequest: () => void;
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
        // 요청이 성공적으로 실행된 후에만 초기화
        set({
          isAuthModalOpen: false,
          pendingRequest: null,
          pendingUrl: null,
          onAuthModalClose: null,
        });
      } catch (error) {
        console.error('❌ 저장된 요청 실행 실패:', error);
        // 에러 발생 시에도 초기화
        set({
          isAuthModalOpen: false,
          pendingRequest: null,
          pendingUrl: null,
          onAuthModalClose: null,
        });
      }
    }
  },
  checkAndExecutePendingRequest: () => {
    const { pendingRequest } = get();
    const isLoggedIn = useAuthStore.getState().isLoggedIn;

    if (isLoggedIn && pendingRequest) {
      setTimeout(() => {
        get().executePendingRequest();
      }, 100);
    }
  },
}));
