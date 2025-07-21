import React from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/cn';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Drawer({ isOpen, onClose, children, className }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--black)]/50"
      onClick={onClose}
    >
      <div
        className={cn('w-full max-w-[428px] rounded-t-[20px] bg-[var(--black)]/60', className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(drawerContent, document.body);
  }
  return null;
}
