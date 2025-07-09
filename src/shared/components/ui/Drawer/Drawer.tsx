import React from 'react';
import { cn } from '@lib/cn';

interface DrawerProps {
  children: React.ReactNode;
  onClose: () => void;
  variant?: 'light' | 'dark';
}

export function Drawer({ children, onClose, variant = 'dark' }: DrawerProps) {
  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end justify-center',
        isLight ? 'bg-[var(--black)]/20' : 'bg-[var(--black)]/50 backdrop-blur-sm',
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full max-w-md rounded-t-[20px] p-4',
          isLight ? 'bg-white text-[var(--black)]]' : 'bg-[var(--gray-dark)] text-white',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
