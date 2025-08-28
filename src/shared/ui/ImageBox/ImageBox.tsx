'use client';
import { useState } from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';
import { cn } from '@/shared/lib/cn';

type ImageBoxSize = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<ImageBoxSize, string> = {
  xs: 'w-[68px] h-[68px]',
  sm: 'w-[100px] h-[100px]',
  md: 'w-[140px] h-[140px]',
  lg: 'w-[161px] h-[161px]',
};
const SIZE_PX: Record<ImageBoxSize, { w: number; h: number }> = {
  xs: { w: 68, h: 68 },
  sm: { w: 100, h: 100 },
  md: { w: 140, h: 140 },
  lg: { w: 161, h: 161 },
};

interface ImageBoxProps {
  size?: ImageBoxSize;
  url?: string;
  className?: string;
  alt?: string;
  /** 히어로 이미지(상단 1~2개 정도)만 true → LCP 개선 */
  priority?: boolean;
}

export function ImageBox({
  size = 'sm',
  url,
  className,
  alt = 'image',
  priority = false,
}: ImageBoxProps) {
  const fallbackUrl = typeof ICONS.LOGO.SAMPLE === 'string' ? ICONS.LOGO.SAMPLE : ICONS.LOGO.SAMPLE;
  const [src, setSrc] = useState(url || fallbackUrl);

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
      <Image
        src={src}
        alt={alt}
        width={SIZE_PX[size].w}
        height={SIZE_PX[size].h}
        sizes={`${SIZE_PX[size].w}px`}
        style={{ width: `${SIZE_PX[size].w}px`, height: `${SIZE_PX[size].h}px` }}
        priority={priority} // 히어로만 true
        fetchPriority={priority ? 'high' : 'auto'} // 네트워크 스케줄러 힌트
        onError={() => setSrc(fallbackUrl)}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
