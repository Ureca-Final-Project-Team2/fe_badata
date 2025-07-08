'use client';

import { cn } from '@/shared/lib/cn';

interface LoginButtonProps {
  label: '로그인' | '로그아웃';
  onClick?: () => void;
  className?: string;
}

export const LoginButton = ({ label, onClick, className }: LoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-[35px] w-[70px] px-4 py-2 bg-white rounded-[6px] shadow-[0px_2px_2px_rgba(0,0,0,0.25)]',
        'text-[11px] font-extrabold text-black',
        className,
      )}
    >
      {label}
    </button>
  );
};
