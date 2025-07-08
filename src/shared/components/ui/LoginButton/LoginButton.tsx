'use client';

import { cn } from '@/shared/lib/cn';
import { useAuthStore } from '@/features/auth/stores/authStore';

export const LoginButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore();

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      // 실제 구현 전까지는 임시 토큰 부여
      login('sample-access-token');
    }
  };

  return (
    <button
      className={cn(
        'h-[35px] w-[70px] px-4 py-2 bg-white rounded-[6px] shadow-[0px_2px_2px_rgba(0,0,0,0.25)]',
        'text-[11px] font-extrabold text-black',
        'whitespace-nowrap',
      )}
      onClick={handleClick}
    >
      {isLoggedIn ? '로그아웃' : '로그인'}
    </button>
  );
};
