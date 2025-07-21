import React from 'react';

import { cn } from '@/shared/lib/cn';

interface DrawerButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'point' | 'close';
}

export function DrawerButton({ icon, children, onClick, variant = 'default' }: DrawerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-full h-[56px] flex items-center justify-center gap-3 text-[16px] font-medium',
        'bg-[var(--gray-mid)] text-white',
        'first:rounded-t-[12px] last:rounded-b-[12px]',
        variant === 'point' && 'text-[var(--main-5)]',
        variant === 'close' && 'mt-3 rounded-[12px] bg-[var(--gray-mid)]',
      )}
    >
      {icon && (
        <span className="absolute left-4 text-[20px] flex items-center justify-center">{icon}</span>
      )}
      <span className="text-center">{children}</span>
    </button>
  );
}
