import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

const flatTabVariants = cva('w-[428px] h-[30px] bg-white', {
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

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface FlatTabProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flatTabVariants> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const FlatTab = React.forwardRef<HTMLDivElement, FlatTabProps>(
  ({ className, size, items, defaultValue, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue ?? items[0]?.id ?? '',
    );

    const currentValue = value ?? internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        const item = items.find((item) => item.id === newValue);
        if (item?.disabled) return;

        if (value === undefined) {
          setInternalValue(newValue);
        }

        onValueChange?.(newValue);
      },
      [value, onValueChange, items],
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const activeItem = items.find((item) => item.id === currentValue);

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        {/* Tab List */}
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

        {/* Tab Content */}
        {activeItem?.content && <div className="pt-4">{activeItem.content}</div>}
      </div>
    );
  },
);

FlatTab.displayName = 'FlatTab';
