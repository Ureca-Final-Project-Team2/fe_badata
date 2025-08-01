'use client';

import { useExpireDateHooks } from '@/features/trade/model/useExpireDateHooks';
import { ImageBox } from '@/shared/ui/ImageBox';
import { LikeButton } from '@/shared/ui/LikeButton';

interface ImageCardProps {
  size?: 'sm' | 'md' | 'lg';
  url?: string;
  expireDate?: string;
}

export function ImageCard({ size = 'sm', url, expireDate }: ImageCardProps) {
  const dDayText = useExpireDateHooks(expireDate);

  return (
    <div className="relative inline-block">
      <ImageBox size={size} url={url} />

      {dDayText && (
        <span
          className="absolute top-0 left-0 w-[57px] h-[30px] bg-[var(--main-5)] text-white text-body-semibold flex items-center justify-center z-10"
          aria-label="D-Day Badge"
        >
          {dDayText}
        </span>
      )}

      <div className="absolute bottom-2.5 right-2.5 z-10">
        <LikeButton />
      </div>
    </div>
  );
}
