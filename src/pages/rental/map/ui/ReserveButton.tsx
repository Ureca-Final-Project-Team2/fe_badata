import React from 'react';

import { TicketSlash } from 'lucide-react';

interface ReserveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function ReserveButton({ children, className = '', ...props }: ReserveButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--main-5)] text-[var(--main-5)] bg-white font-label-semibold transition-colors
        hover:bg-[var(--main-4)] hover:text-white hover:border-[var(--main-4)] ${className}`}
      {...props}
    >
      <TicketSlash className="w-5 h-5" />
      {children}
    </button>
  );
}
