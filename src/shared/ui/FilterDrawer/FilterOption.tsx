import React from 'react';

import { Check } from 'lucide-react';

interface FilterOptionProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export function FilterOption({ children, selected = false, onClick }: FilterOptionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 flex items-center justify-between font-body-medium text-[var(--black)] hover:bg-[var(--main-2)]/50 transition-colors rounded-2xl cursor-pointer"
    >
      <span>{children}</span>
      {selected && <Check className="w-5 h-5 text-[var(--main-5)]" />}
    </button>
  );
}
