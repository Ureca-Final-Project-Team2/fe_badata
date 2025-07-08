'use client';

import { cn } from '@/shared/lib/cn';
import React from 'react';

type ImageBoxSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<ImageBoxSize, string> = {
  sm: 'w-[100px] h-[100px]',
  md: 'w-[140px] h-[140px]',
  lg: 'w-[161px] h-[161px]',
};

interface ImageBoxProps {
  size?: ImageBoxSize;
  url?: string;
  className?: string;
}

export function ImageBox({ size = 'sm', url, className }: ImageBoxProps) {
  const fallbackImage = '/assets/sample.png';

  return (
    <div
      className={cn(
        'rounded-[24px] flex items-center justify-center border',
        'bg-[var(--gray-light)] border-[var(--gray)]',
        SIZE_MAP[size],
        className,
      )}
    >
      <img src={url || fallbackImage} alt="image" className="object-contain w-full h-full" />
    </div>
  );
}
