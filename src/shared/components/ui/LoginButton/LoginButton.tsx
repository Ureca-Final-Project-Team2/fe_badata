'use client';

import { useLoginButton } from '@/features/auth/hooks/useLoginButton';
import { cn } from '@/shared/lib/cn';

export const LoginButton = () => {
  const { isLoggedIn, handleClick } = useLoginButton();

  return (
    <button
      className={cn(
        'h-[35px] w-[70px] px-4 py-2 bg-white rounded-[6px] shadow-[0px_2px_2px_rgba(0,0,0,0.25)]',
        'text-[11px] font-extrabold text-black whitespace-nowrap',
      )}
      onClick={handleClick}
    >
      {isLoggedIn ? '로그아웃' : '로그인'}
    </button>
  );
};
