import React from 'react';

import { cn } from '@/shared/lib/cn';

type DrawerVariant = 'default' | 'filter' | 'sos';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: DrawerVariant;
}

export function Drawer({ isOpen, onClose, children, variant = 'default' }: DrawerProps) {
  if (!isOpen) return null;

  const isDefault = variant === 'default';
  const isFilter = variant === 'filter';

  const baseStyle = 'w-full max-w-md rounded-t-[20px]';
  const colorStyle = isDefault
    ? 'bg-[var(--black)]/60 text-white'
    : 'bg-white text-[var(--black)]]';
  const paddingStyle = isFilter ? 'pt-2 px-4 pb-6' : 'p-4';
  const dividerStyle = isFilter ? 'divide-y divide-[var(--gray-light)]' : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--black)]/50"
      onClick={onClose}
    >
      <div
        className={cn(baseStyle, colorStyle, dividerStyle, paddingStyle)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
