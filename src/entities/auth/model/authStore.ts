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

// 쿠키 설정 함수
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

const TUTORIAL_KEY = 'recommendTutorial';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      login: (token, user) => {
        // localStorage에 accessToken 저장
        localStorage.setItem('accessToken', token);

        if (localStorage.getItem(TUTORIAL_KEY) === null) {
          localStorage.setItem(TUTORIAL_KEY, 'false');
        }

        // 쿠키에도 저장 (미들웨어에서 접근 가능)
        setCookie(
          'auth-storage',
          JSON.stringify({
            state: {
              isLoggedIn: true,
              accessToken: token,
              user: user,
            },
          }),
        );
        set({ isLoggedIn: true, accessToken: token, user });

        // 로그인 후 pendingRequest 확인 및 실행
        setTimeout(async () => {
          try {
            const { useAuthErrorStore } = await import('@/shared/lib/axios/authErrorStore');
            const { executePendingRequest } = useAuthErrorStore.getState();
            executePendingRequest();
          } catch (error) {
            console.error('Pending request 실행 실패:', error);
          }
        }, 100);
      },
      logout: () => {
        // localStorage에서 accessToken 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem(TUTORIAL_KEY);
        // 쿠키에서도 삭제
        removeCookie('auth-storage');
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
