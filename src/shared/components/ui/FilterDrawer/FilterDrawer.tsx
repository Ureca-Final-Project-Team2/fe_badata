import React from 'react';

interface DrawerProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export function FilterDrawer({ open, children, onClose }: DrawerProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-100 bg-[var(--black)]/20 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-[20px] text-[var(--black)] bg-white pt-2 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[40px] h-[4px] bg-gray-300 rounded-full mx-auto mb-4" />
        {children}
      </div>
    </div>
  );
}
