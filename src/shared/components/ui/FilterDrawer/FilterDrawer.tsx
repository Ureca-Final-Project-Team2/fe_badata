'use client';

import React from 'react';
import { cn } from '@lib/cn';

interface DrawerProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export function FilterDrawer({ open, children, onClose, className }: DrawerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full max-w-md rounded-t-[20px] text-black bg-white pt-2 px-4 pb-8',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[40px] h-[4px] bg-gray-300 rounded-full mx-auto mb-4" />
        {children}
      </div>
    </div>
  );
}
