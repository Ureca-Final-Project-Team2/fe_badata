import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

import type { VariantProps } from 'class-variance-authority';

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

export type SectionDividerProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> &
  VariantProps<typeof sectionDividerVariants> & {
    children?: ReactNode;
  };

function DividerWithText({
  size,
  color,
  thickness,
  children,
}: Pick<SectionDividerProps, 'size' | 'color' | 'thickness' | 'children'>) {
  return (
    <div className="flex items-center gap-4">
      <div className={cn(sectionDividerVariants({ size, color, thickness }), 'flex-1')} />
      <div className="text-gray-600 font-medium text-sm whitespace-nowrap">{children}</div>
      <div className={cn(sectionDividerVariants({ size, color, thickness }), 'flex-1')} />
    </div>
  );
}

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className, size, color, thickness, children, ...props }, ref) => {
    return (
      <div className={className} ref={ref} {...props}>
        {children ? (
          <DividerWithText size={size} color={color} thickness={thickness}>
            {children}
          </DividerWithText>
        ) : (
          <div className={cn(sectionDividerVariants({ size, color, thickness }))} />
        )}
      </div>
    );
  },
);

SectionDivider.displayName = 'SectionDivider';
