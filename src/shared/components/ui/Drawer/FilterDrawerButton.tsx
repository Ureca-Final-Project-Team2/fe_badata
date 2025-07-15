import { Check } from 'lucide-react';
import React from 'react';

interface FilterDrawerButtonProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export function FilterDrawerButton({
  children,
  selected = false,
  onClick,
}: FilterDrawerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 flex items-center justify-between text-[20px] font-medium text-[var(--black)]"
    >
      <span>{children}</span>
      {selected && <Check className="w-5 h-5 text-[var(--point-1)]" />}
    </button>
  );
}
