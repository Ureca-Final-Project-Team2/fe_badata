import React from 'react';

import { cn } from '@/shared/lib/cn';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function FilterDrawer({ isOpen, onClose, children, className }: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--black)]/50"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full max-w-[428px] bg-white rounded-t-[20px] pt-2 px-4 pb-6',
          'divide-y divide-[var(--gray-light)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
