import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

import type { VariantProps } from 'class-variance-authority';

const registerButtonVariants = cva(
  'flex items-center justify-center font-semibold text-[20px] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--main-5)] text-white hover:bg-[var(--main-4)]',
        secondary: 'bg-[var(--main-5)] text-white hover:bg-[var(--main-4)]',
        outline:
          'bg-white text-[var(--main-5)] border border-[var(--main-5)] hover:bg-[var(--main-5)] hover:text-white',
        ghost: 'bg-transparent text-white hover:bg-[var(--gray)]',
      },
      size: {
        sm: 'w-[200px] h-[50px]',
        md: 'w-[300px] h-[60px]',
        lg: 'w-[380px] h-[70px]',
        lg_thin: 'w-[380px] h-[55px]',
      },
      state: {
        active: '',
        inactive: 'bg-[var(--gray)] text-white cursor-not-allowed border-[var(--gray)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      state: 'inactive',
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

export interface RegisterButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof registerButtonVariants> {
  loading?: boolean;
  isFormValid?: boolean;
}

export const RegisterButton = forwardRef<HTMLButtonElement, RegisterButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      isFormValid = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading || !isFormValid;
    const buttonState = isFormValid ? 'active' : 'inactive';

    return (
      <button
        className={cn(
          registerButtonVariants({
            variant: isFormValid ? variant : undefined,
            size,
            state: buttonState,
          }),
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? <LoadingSpinner /> : children}
      </button>
    );
  },
);

RegisterButton.displayName = 'RegisterButton';
