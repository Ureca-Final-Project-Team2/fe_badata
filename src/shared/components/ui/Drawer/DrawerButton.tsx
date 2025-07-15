import { cn } from '@lib/cn';
import React from 'react';

interface DrawerButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'point' | 'close';
  theme?: 'light' | 'dark';
}

export function DrawerButton({
  icon,
  children,
  onClick,
  variant = 'default',
  theme = 'dark',
}: DrawerButtonProps) {
  const isLight = theme === 'light';

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-full h-[56px] px-4 flex items-center justify-center gap-3 text-[16px] font-medium',
        isLight ? 'bg-[var(--gray-light)] text-[var(--black)]' : 'bg-[var(--gray-mid)] text-white',
        variant === 'default' && 'rounded-none first:rounded-t-[12px] last:rounded-b-[12px]',
        variant === 'point' &&
          'text-[var(--point-1)] rounded-none first:rounded-t-[12px] last:rounded-b-[12px]',
        variant === 'close' && 'mt-3 rounded-[12px]',
      )}
    >
      {icon && (
        <span className="absolute left-4 text-[20px] flex items-center justify-center">{icon}</span>
      )}
      <span className="text-center">{children}</span>
    </button>
  );
}
