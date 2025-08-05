'use client';

import { ICONS } from '@/shared/config/iconPath';
import { cn } from '@/shared/lib/cn';

type ImageBoxSize = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<ImageBoxSize, string> = {
  xs: 'w-[68px] h-[68px]',
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
  const fallbackImage = ICONS.LOGO.SAMPLE;

  // xs 크기일 때는 radius를 10px로 설정
  const borderRadius = size === 'xs' ? 'rounded-[10px]' : 'rounded-[24px]';

  return (
    <div
      className={cn(
        'flex items-center justify-center border overflow-hidden',
        'bg-[var(--gray-light)] border-[var(--gray)]',
        borderRadius,
        SIZE_MAP[size],
        className,
      )}
    >
      <img src={url || fallbackImage} alt="image" className="object-cover w-full h-full" />
    </div>
  );
}
