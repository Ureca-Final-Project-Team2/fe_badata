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
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-[var(--black)]/50"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full max-w-[428px] rounded-t-[20px] pt-2 px-4 pb-6 bg-[var(--main-1)]',
          'divide-y divide-[var(--gray-light)]',
          'transition-transform duration-300 ease-out translate-y-0',
          className,
        )}
        style={{
          transform: 'translateY(0%)',
          animation: 'slideUpDrawer 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
