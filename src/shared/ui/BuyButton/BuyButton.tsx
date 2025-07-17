import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@lib/cn';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

const buyButtonVariants = cva(
  'flex items-center justify-center font-semibold text-[20px] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
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
        lg: 'w-[380px] h-[70px]',
        lg_thin: 'w-[380px] h-[55px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <span>처리중...</span>
    </div>
  );
}

export interface BuyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buyButtonVariants> {
  loading?: boolean;
}

export const BuyButton = forwardRef<HTMLButtonElement, BuyButtonProps>(
  ({ className, variant, size, loading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buyButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <LoadingSpinner /> : children}
      </button>
    );
  },
);

BuyButton.displayName = 'BuyButton';
