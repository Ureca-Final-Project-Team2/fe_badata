import * as React from 'react';
import { cva } from 'class-variance-authority';
import { FlatTabProps } from '@ui/FlatTab/types';
import { useFlatTab } from '@ui/FlatTab/useFlatTab';
import { cn } from '@lib/cn';

export const flatTabVariants = cva('w-[428px] h-[30px] bg-white', {
  variants: {
    size: {
      default: 'w-[428px] h-[30px]',
      sm: 'w-[320px] h-[25px]',
      lg: 'w-[500px] h-[35px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const FlatTab = React.forwardRef<HTMLDivElement, FlatTabProps>(
  ({ className, size, items, defaultValue, value, onValueChange, ...props }, ref) => {
    const { currentValue, activeItem, handleValueChange } = useFlatTab(
      items,
      value,
      defaultValue,
      onValueChange,
    );

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        <div className={flatTabVariants({ size })}>
          <div className="flex h-full border-b border-gray-200">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleValueChange(item.id)}
                disabled={item.disabled}
                className={cn(
                  'flex-1 h-full font-semibold text-[15px] transition-colors duration-200 border-b-2 border-transparent focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative',
                  currentValue === item.id
                    ? 'text-[var(--main-1)] border-[var(--main-1)]'
                    : 'text-[var(--gray-mid)] hover:text-[var(--main-1)]',
                )}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {activeItem?.content && <div className="pt-4">{activeItem.content}</div>}
      </div>
    );
  },
);

FlatTab.displayName = 'FlatTab';
