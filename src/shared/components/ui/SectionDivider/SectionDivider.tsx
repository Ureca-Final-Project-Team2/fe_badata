import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@lib/cn';

const sectionDividerVariants = cva('border-t border-solid', {
  variants: {
    size: {
      default: 'w-[433px] h-[8px]',
      sm: 'w-[300px] h-[6px]',
      lg: 'w-[500px] h-[10px]',
      full: 'w-full h-[8px]',
    },
    color: {
      default: 'border-[var(--gray-light)]',
    },
    thickness: {
      thin: 'border-t',
      medium: 'border-t-2',
      thick: 'border-t-4',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
    thickness: 'medium',
  },
});

export interface SectionDividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof sectionDividerVariants> {
  children?: React.ReactNode;
}

export const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className, size, color, thickness, children, ...props }, ref) => {
    if (children) {
      return (
        <div className={cn('flex items-center gap-4', className)} ref={ref} {...props}>
          <div className={cn(sectionDividerVariants({ size, color, thickness }), 'flex-1')} />
          <div className="text-gray-600 font-medium text-sm whitespace-nowrap">{children}</div>
          <div className={cn(sectionDividerVariants({ size, color, thickness }), 'flex-1')} />
        </div>
      );
    }

    return (
      <div
        className={cn(sectionDividerVariants({ size, color, thickness }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

SectionDivider.displayName = 'SectionDivider';
