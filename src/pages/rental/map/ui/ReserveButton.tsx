import React from 'react';

import { TicketSlash } from 'lucide-react';

interface ReserveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const BTN_SIZE = {
  md: 'gap-2 px-2 py-1 font-label-semibold',
  sm: 'gap-2 px-2 py-1 font-small-semibold',
};
const ICON_SIZE = {
  md: 20,
  sm: 16,
};

export default function ReserveButton({
  children,
  className = '',
  size = 'sm',
  ...props
}: ReserveButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center rounded-full border border-[var(--main-5)] text-[var(--main-5)] bg-white font-label-semibold transition-colors
        hover:bg-[var(--main-4)] hover:text-white hover:border-[var(--main-4)] ${BTN_SIZE[size]} ${className}`}
      {...props}
    >
      <TicketSlash className="inline-block" width={ICON_SIZE[size]} height={ICON_SIZE[size]} />
      {children}
    </button>
  );
}
