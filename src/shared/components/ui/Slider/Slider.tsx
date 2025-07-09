import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useRef,
  type ChangeEvent,
} from 'react';
import { cn } from '@lib/cn';
import type { InputHTMLAttributes } from 'react';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  label?: string;
  showTooltip?: boolean;
  onValueChange?: (value: number) => void;
}

function formatExactPrice(price: number) {
  return price === 0 ? '0원' : `${price.toLocaleString()}원`;
}

function formatMinMaxLabels(min: number, max: number) {
  const minLabel = min === 0 ? '0원' : `${Math.floor(min / 10000)}만원`;
  const maxLabel = max === 50000 ? '5만원대' : `${Math.floor(max / 10000)}만원대`;
  return { minLabel, maxLabel };
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      min = 0,
      max = 50000,
      step = 1000,
      value,
      defaultValue = 20000,
      disabled = false,
      label = '가격',
      showTooltip = true,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(value ?? defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const currentValue = value ?? internalValue;
    const percentage = ((currentValue - min) / (max - min)) * 100;
    const { minLabel, maxLabel } = formatMinMaxLabels(min, max);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (value === undefined) setInternalValue(newValue);
        onValueChange?.(newValue);
      },
      [value, onValueChange],
    );

    useEffect(() => {
      if (value !== undefined) setInternalValue(value);
    }, [value]);

    useEffect(() => {
      const handleUp = () => setIsDragging(false);
      document.addEventListener('mouseup', handleUp);
      return () => document.removeEventListener('mouseup', handleUp);
    }, []);

    return (
      <div className={cn('relative flex flex-col', className)}>
        {label && (
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-900 font-medium text-base">{label}</span>
            <div className="flex items-center gap-8 text-sm text-[var(--gray-mid)]">
              <span>{minLabel}</span>
              <span>{maxLabel}</span>
            </div>
          </div>
        )}

        <div className="w-[380px] h-[8px] flex items-center relative">
          {showTooltip && (
            <div
              className="absolute -top-12 bg-[var(--gray-light)] border border-[var(--gray)] rounded-lg px-3 py-2 shadow-sm whitespace-nowrap z-10 -translate-x-1/2"
              style={{ left: `calc(${percentage}% - 24px)` }}
            >
              <div className="text-sm text-[var(--gray-mid)] text-center font-medium">
                {formatExactPrice(currentValue)}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--gray)]" />
            </div>
          )}

          <div className="w-full h-[8px] bg-[var(--gray-light)] rounded-full relative overflow-hidden">
            <div
              className="bg-[var(--main-3)] rounded-full transition-all duration-200 absolute top-0 left-0 h-[8px]"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            disabled={disabled}
            className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
            {...props}
          />

          <div
            className={cn(
              'absolute bg-white rounded-full transition-all duration-200 pointer-events-none border-2 border-white w-5 h-5 top-1/2 -translate-y-1/2',
              !disabled && (isDragging ? 'shadow-xl scale-110' : 'shadow-md'),
              disabled && 'bg-gray-400 border-gray-400',
            )}
            style={{
              left: `calc(${percentage}% - 10px)`,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    );
  },
);

Slider.displayName = 'Slider';
