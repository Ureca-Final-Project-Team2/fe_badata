import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@features/auth/lib/user';

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
        localStorage.setItem('accessToken', token); 
        set({ isLoggedIn: true, accessToken: token, user });
      },
      logout: () => {
        localStorage.removeItem('accessToken'); 
        set({ isLoggedIn: false, accessToken: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
