import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-regular border-2 px-4 py-1 text-sm transition-colors',
  {
    variants: {
      color: {
        main1:
          'border-[var(--main-1)] text-[var(--main-1)] hover:bg-[var(--main-1)] hover:text-white',
        grayMid: 'border border-[var(--gray-mid)] text-[var(--gray-dark)] font-light',
        main1Solid: 'border-[var(--main-1)] bg-[var(--main-1)] text-white',
        main1Hover:
          'bg-[var(--main-1)] text-white hover:bg-transparent hover:text-[var(--main-1)] border-[var(--main-1)]',
        main3: 'border-[var(--main-3)] bg-[var(--main-3)] text-white',
        grayLight: 'bg-[var(--gray-light)] text-[var(--gray-dark)] border-[var(--gray-light)]',
        grayDarkSolid: 'bg-[var(--gray-dark)] text-white',
      },
      size: {
        xs: 'text-[0.8rem] px-3 py-0.5',
        sm: 'text-[1.4rem] px-4 py-0.5',
        md: 'text-[1.6rem] px-5 py-1',
        lg: 'text-[1.8rem] px-6 py-1.5',
      },
    },
    defaultVariants: {
      color: 'main1Solid',
      size: 'md',
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, color, size, ...rest }: BadgeProps) {
  return <div className={cn(badgeVariants({ color, size }), className)} {...rest} />;
}
