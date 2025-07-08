import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@lib/cn';

const buyButtonVariants = cva(
  'inline-flex items-center justify-center font-semibold text-[20px] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--main-1)] text-white hover:bg-[var(--point-1)]',
        secondary: 'bg-[var(--point-1)] text-white hover:bg-[var(--main-1)]',
        outline:
          'bg-white text-[var(--main-1)] border border-[var(--main-1)] hover:bg-[var(--point-1)] hover:text-white',
        ghost: 'bg-transparent text-white hover:bg-[var(--gray)]',
      },
      size: {
        sm: 'w-[200px] h-[50px]',
        md: 'w-[300px] h-[60px]',
        lg: 'w-[380px] h-[70px]', // 피그마 기본 사이즈
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

export interface BuyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buyButtonVariants> {
  loading?: boolean;
}

export const BuyButton = React.forwardRef<HTMLButtonElement, BuyButtonProps>(
  ({ className, variant, size, loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buyButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span>처리중...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  },
);

BuyButton.displayName = 'BuyButton';
