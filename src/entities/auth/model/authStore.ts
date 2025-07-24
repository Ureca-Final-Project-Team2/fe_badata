import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/entities/auth/lib/user';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      login: (token, user) => {
        set({ isLoggedIn: true, accessToken: token, user });
      },
      logout: () => {
        set({ isLoggedIn: false, accessToken: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      // localStorage에 저장할 필드 지정
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);
