import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

const sliderVariants = cva('relative', {
  variants: {
    size: {
      default: 'w-[176px] h-[66px]',
      sm: 'w-[140px] h-[50px]',
      lg: 'w-[220px] h-[80px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    VariantProps<typeof sliderVariants> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  label?: string;
  showValue?: boolean;
  onValueChange?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      size,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = min,
      disabled = false,
      label,
      showValue = false,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(value ?? defaultValue);

    const currentValue = value ?? internalValue;
    const percentage = ((currentValue - min) / (max - min)) * 100;

    const getTrackHeight = () => {
      switch (size) {
        case 'sm':
          return 'h-2';
        case 'lg':
          return 'h-4';
        default:
          return 'h-3';
      }
    };

    const getThumbSize = () => {
      switch (size) {
        case 'sm':
          return 'w-4 h-4';
        case 'lg':
          return 'w-6 h-6';
        default:
          return 'w-5 h-5';
      }
    };

    const getLabelSize = () => {
      switch (size) {
        case 'sm':
          return 'text-xs';
        case 'lg':
          return 'text-base';
        default:
          return 'text-sm';
      }
    };

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);

        if (value === undefined) {
          setInternalValue(newValue);
        }

        onValueChange?.(newValue);
      },
      [value, onValueChange],
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    return (
      <div className={cn(sliderVariants({ size }), 'flex flex-col justify-center', className)}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label className={cn('font-medium text-white', getLabelSize())}>{label}</label>
            {showValue && (
              <span className={cn('text-white', getLabelSize())}>
                {currentValue.toLocaleString()}
              </span>
            )}
          </div>
        )}

        <div className="relative flex items-center">
          {/* Track Background */}
          <div
            className={cn(
              'w-full bg-white rounded-full relative overflow-hidden',
              getTrackHeight(),
            )}
          >
            {/* Active Range */}
            <div
              className={cn(
                'bg-[var(--main-3)] rounded-full transition-all duration-200',
                getTrackHeight(),
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Input */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />

          {/* Thumb */}
          <div
            className={cn(
              'absolute bg-white rounded-full shadow-md transition-all duration-200 pointer-events-none border border-gray-200',
              getThumbSize(),
              !disabled && 'hover:shadow-lg',
              disabled && 'bg-gray-400',
            )}
            style={{
              left: `calc(${percentage}% - ${size === 'sm' ? '8px' : size === 'lg' ? '12px' : '10px'})`,
            }}
          />
        </div>
      </div>
    );
  },
);

Slider.displayName = 'Slider';
