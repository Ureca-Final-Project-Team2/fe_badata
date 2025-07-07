import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      login: (token) =>
        set(() => ({
          isLoggedIn: true,
          accessToken: token,
        })),
      logout: () =>
        set(() => ({
          isLoggedIn: false,
          accessToken: null,
        })),
    }),
    { name: 'auth-storage' },
  ),
);
