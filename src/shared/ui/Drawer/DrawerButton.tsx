import React from 'react';

import { cn } from '@/shared/lib/cn';

interface DrawerButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'point' | 'close';
  disabled?: boolean;
  className?: string;
}

export function DrawerButton({
  icon,
  children,
  onClick,
  variant = 'default',
  disabled = false,
  className,
}: DrawerButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative w-full h-[56px] flex items-center justify-center gap-3 font-label-semibold',
        'bg-[var(--white)] text-black',
        'first:rounded-t-[12px] last:rounded-b-[12px]',
        variant === 'point' && 'text-[var(--main-5)]',
        variant === 'close' && 'mt-3 rounded-[12px] bg-[var(--white)] text-[var(--black)]',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {icon && (
        <span className="absolute left-4 font-title-semibold flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="text-center">{children}</span>
    </button>
  );
}
