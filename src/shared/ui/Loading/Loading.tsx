'use client';

import { Spinner } from '@/shared/ui/Spinner';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loading({ size = 'md', className = '' }: LoadingProps) {
  return (
    <div className={`w-full h-full bg-white flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Spinner size={size} />
        </div>
      </div>
    </div>
  );
}
