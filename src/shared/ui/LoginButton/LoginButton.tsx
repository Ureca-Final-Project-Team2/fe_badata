'use client';

import { useLoginButton } from '@/entities/auth/model/useLoginButton';
import { cn } from '@/shared/lib/cn';

interface LoginButtonProps {
  isLoggedIn?: boolean;
  className?: string;
}

export const LoginButton = ({ isLoggedIn: isLoggedInProp, className }: LoginButtonProps) => {
  const { isLoggedIn, handleClick } = useLoginButton();
  const showLoggedIn = typeof isLoggedInProp === 'boolean' ? isLoggedInProp : isLoggedIn;

  return (
    <button
      className={cn(
        'h-[35px] w-[70px] px-0 py-0 bg-white rounded-[6px] border border-solid',
        'border-[#cbcbcb] border-[0.5px]',
        'flex items-center justify-center',
        className,
      )}
      onClick={handleClick}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 65,
          height: 34,
          fontSize: '12.8px',
          fontWeight: 300,
          color: '#000',
          lineHeight: 'normal',
        }}
      >
        {showLoggedIn ? '로그아웃' : '로그인'}
      </span>
    </button>
  );
};
