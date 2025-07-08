'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ImageBoxSize = 's' | 'm' | 'l';

const SIZE_MAP: Record<ImageBoxSize, string> = {
  s: 'w-[100px] h-[100px]',
  m: 'w-[140px] h-[140px]',
  l: 'w-[161px] h-[161px]',
};

interface ImageBoxProps {
  size?: ImageBoxSize;
  url?: string;
  className?: string;
}

export function ImageBox({ size = 's', url, className }: ImageBoxProps) {
  const fallbackImage = '/assets/sample.png';

  return (
    <div
      className={cn(
        'rounded-[24px] flex items-center justify-center border',
        SIZE_MAP[size],
        className,
      )}
      style={{
        backgroundColor: 'var(--gray-light)',
        borderColor: 'var(--gray)',
      }}
    >
      <img src={url || fallbackImage} alt="image" className="object-contain w-full h-full" />
    </div>
  );
}
