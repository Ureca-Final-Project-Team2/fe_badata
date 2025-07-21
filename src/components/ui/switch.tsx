'use client';

import * as RadixSwitch from '@radix-ui/react-switch';

import { cn } from '@/shared/lib/cn';

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labels?: [string, string];
}

export function Switch({ checked, onCheckedChange, labels, ...props }: CustomSwitchProps) {
  const hasLabels = Boolean(labels);

  if (hasLabels) {
    return (
      <div className="relative w-[120px] h-[30px]">
        <RadixSwitch.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={cn(
            'relative z-10 w-full h-full rounded-full appearance-none outline-none cursor-pointer transition-colors',
            'bg-[var(--gray)]',
          )}
          {...props}
        >
          <div
            className={cn(
              'absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-200 ease-in-out',
              'bg-[var(--main-5)]',
              checked ? 'translate-x-full' : 'translate-x-0',
            )}
          />
          
          <div className="relative z-20 flex w-full h-full text-sm font-semibold">
            <span
              className={cn(
                'flex-1 flex items-center justify-center transition-colors',
                !checked ? 'text-white' : 'text-[var(--black)]',
              )}
            >
              {labels?.[0]}
            </span>
            <span
              className={cn(
                'flex-1 flex items-center justify-center transition-colors',
                checked ? 'text-white' : 'text-[var(--black)]',
              )}
            >
              {labels?.[1]}
            </span>
          </div>
        </RadixSwitch.Root>
      </div>
    );
  }

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
