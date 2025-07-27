'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface CoinToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function CoinToggle({
  checked,
  onCheckedChange,
  disabled = false,
  className,
}: CoinToggleProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleToggle}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-3)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-[var(--main-3)]' : 'bg-[var(--gray-light)]',
        isPressed && 'scale-95',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
      {/* 코인 아이콘 */}
      <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
        <div className="h-3 w-3 rounded-full bg-yellow-400 opacity-60" />
      </div>
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
        <div className="h-3 w-3 rounded-full bg-yellow-400 opacity-60" />
      </div>
    </button>
  );
}
