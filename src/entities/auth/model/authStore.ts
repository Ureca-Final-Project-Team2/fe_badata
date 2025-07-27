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
        // localStorage에 accessToken 별도 저장
        localStorage.setItem('accessToken', token);
        set({ isLoggedIn: true, accessToken: token, user });
      },
      logout: () => {
        // localStorage에서 accessToken 삭제
        localStorage.removeItem('accessToken');
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
