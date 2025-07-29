import { useAuthStore } from '@/entities/auth/model/authStore';

export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const token = useAuthStore.getState().accessToken;
    return !!token;
  } catch (error) {
    console.error('로그인 상태 확인 실패:', error);
    return false;
  }
};
