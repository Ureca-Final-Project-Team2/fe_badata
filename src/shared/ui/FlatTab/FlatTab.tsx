import { cn } from '@/shared/lib/cn';
import type { FlatTabItem, FlatTabProps } from '@/shared/ui/FlatTab/types';
import { useFlatTab } from '@/shared/ui/FlatTab/useFlatTab';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';

interface FlatTabButtonProps {
  label: string;
  isActive: boolean;
  disabled?: boolean;
  onClick: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

const FlatTabButton = ({ label, isActive, disabled, onClick, buttonRef }: FlatTabButtonProps) => (
  <button
    ref={buttonRef}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'flex-1 h-[30px] flex items-center justify-center min-w-0 transition-all duration-200 relative z-10',
      isActive
        ? 'text-[var(--gray-dark)] font-body-semibold'
        : 'text-[var(--gray-mid)] font-title-regular hover:text-[var(--main-4)]',
    )}
    type="button"
    style={{ minWidth: 0 }}
  >
    {label}
  </button>
);

export const FlatTab = forwardRef<HTMLDivElement, FlatTabProps>(
  ({ className, items, defaultValue, value, onValueChange, ...props }, ref) => {
    const { currentValue, activeItem, handleValueChange } = useFlatTab(
      items,
      value,
      defaultValue,
      onValueChange,
    );
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useLayoutEffect(() => {
      const idx = items.findIndex((item: { id: string }) => item.id === currentValue);
      const el = tabRefs.current[idx];
      if (el) {
        setIndicator({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      }
    }, [currentValue, items]);

    return (
      <div
        className={cn(
          'w-[380px] h-[40px] flex flex-col justify-center items-center px-0',
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="relative flex flex-row h-[30px] gap-0 py-[5px] w-full items-center justify-center">
          {/* moving indicator */}
          <div
            className="absolute top-0 left-0 h-full bg-[var(--main-3)] rounded-[10px] z-0 transition-all duration-200"
            style={{
              width: indicator.width,
              left: indicator.left,
            }}
          />
          {items.map((item: FlatTabItem, idx: number) => (
            <FlatTabButton
              key={item.id}
              label={item.label}
              isActive={currentValue === item.id}
              disabled={item.disabled}
              onClick={() => handleValueChange(item.id)}
              buttonRef={(el) => (tabRefs.current[idx] = el)}
            />
          ))}
        </div>
        {activeItem?.content && <div className="pt-4">{activeItem.content}</div>}
      </div>
    );
  },
);

FlatTab.displayName = 'FlatTab';
