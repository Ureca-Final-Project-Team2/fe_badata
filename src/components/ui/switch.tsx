'use client';

import { cn } from '@/shared/lib/cn';
import * as RadixSwitch from '@radix-ui/react-switch';

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labels?: [string, string];
}

export function Switch({ checked, onCheckedChange, labels, ...props }: CustomSwitchProps) {
  const hasLabels = Boolean(labels);

  if (hasLabels) {
    return (
      <div className="relative w-[120px] h-[30px] rounded-full bg-[var(--gray)] flex overflow-hidden">
        <div
          className={cn(
            'absolute top-0 left-0 w-1/2 h-full rounded-full transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-full bg-[var(--main-5)]' : 'translate-x-0 bg-[var(--main-5)]',
          )}
        />
        <button
          onClick={() => onCheckedChange(false)}
          className={cn(
            'flex-1 flex items-center justify-center z-10 text-[14px] font-semibold transition-colors',
            !checked ? 'text-white' : 'text-[var(--black)]',
          )}
        >
          {labels?.[0]}
        </button>
        <button
          onClick={() => onCheckedChange(true)}
          className={cn(
            'flex-1 flex items-center justify-center z-10 text-[14px] font-semibold transition-colors',
            checked ? 'text-white' : 'text-[var(--black)]',
          )}
        >
          {labels?.[1]}
        </button>
      </div>
    );
  }

  // 기본 토글 스위치
  return (
    <div className="relative w-[50px] h-[26px]">
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'relative z-10 w-full h-full rounded-full appearance-none outline-none cursor-pointer transition-colors',
          checked ? 'bg-[var(--main-5)]' : 'bg-[var(--gray)]',
        )}
        {...props}
      >
        <RadixSwitch.Thumb
          className={cn(
            'absolute top-[2px] left-[2px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all',
            checked ? 'translate-x-[24px]' : 'translate-x-0',
          )}
        />
      </RadixSwitch.Root>
    </div>
  );
}
