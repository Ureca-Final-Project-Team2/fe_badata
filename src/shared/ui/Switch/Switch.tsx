import { cn } from '@/shared/lib/cn';
import { Root as SwitchRoot, Thumb as SwitchThumb } from '@radix-ui/react-switch';
import type { ComponentPropsWithoutRef } from 'react';

type BaseSwitchProps = ComponentPropsWithoutRef<typeof SwitchRoot>;

interface CustomSwitchProps extends BaseSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labels?: [string, string];
}

export function Switch({ checked, onCheckedChange, labels, ...props }: CustomSwitchProps) {
  const hasLabels = Boolean(labels);

  return (
    <div className={cn('relative', hasLabels ? 'w-[120px] h-[30px]' : 'w-[50px] h-[26px]')}>
      <SwitchRoot
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'relative z-10 w-full h-full rounded-full appearance-none outline-none cursor-pointer transition-colors',
          'bg-[var(--gray-mid)]',
        )}
        {...props}
      >
        {hasLabels && (
          <div
            className={cn(
              'absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-200 ease-in-out',
              'bg-[var(--main-1)]',
              checked ? 'translate-x-full' : 'translate-x-0',
            )}
          />
        )}

        {hasLabels && (
          <div className="relative z-20 flex w-full h-full text-sm font-regular text-white">
            <span
              className={cn(
                'flex-1 flex items-center justify-center transition-opacity',
                checked ? 'opacity-0' : 'opacity-100',
              )}
            >
              {labels?.[0]}
            </span>
            <span
              className={cn(
                'flex-1 flex items-center justify-center transition-opacity',
                checked ? 'opacity-100' : 'opacity-0',
              )}
            >
              {labels?.[1]}
            </span>
          </div>
        )}

        <SwitchThumb
          className={cn(
            'absolute top-[2px] left-[2px] h-[22px] w-[22px] rounded-full bg-[var(--main-1)] shadow transition-all',
            checked && hasLabels && 'translate-x-[88px]',
            !checked && hasLabels && 'translate-x-0',
            checked && !hasLabels && 'translate-x-[24px]',
            !checked && !hasLabels && 'translate-x-0',
          )}
        />
      </SwitchRoot>
    </div>
  );
}
