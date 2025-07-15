import { User } from '@features/auth/lib/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      login: (token, user) => set({ isLoggedIn: true, accessToken: token, user }),
      logout: () => set({ isLoggedIn: false, accessToken: null, user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
