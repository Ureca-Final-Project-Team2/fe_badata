import { cn } from '@/shared/lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[var(--main-1)] [animation-duration:2s]',
        className,
      )}
    />
  );
}
