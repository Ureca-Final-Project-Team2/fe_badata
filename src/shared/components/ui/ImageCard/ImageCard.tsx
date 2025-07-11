'use client';

import React from 'react';
import { ImageBox } from '@ui/ImageBox';
import { LikeButton } from '@ui/LikeButton';
import { useImageCard } from '@features/imageCard/hooks/useImageCard';

interface ImageCardProps {
  size?: 'sm' | 'md' | 'lg';
  url?: string;
  expireDate?: string;
  defaultLiked?: boolean;
}

export function ImageCard({ size = 'sm', url, expireDate, defaultLiked = false }: ImageCardProps) {
  const dDayText = useImageCard(expireDate);

  return (
    <div className="relative inline-block">
      <ImageBox size={size} url={url} />

      {dDayText && (
        <span
          className="absolute top-0 left-0 w-[57px] h-[30px] bg-[var(--point-1)] text-white text-body-semibold flex items-center justify-center z-10"
          aria-label="D-Day Badge"
        >
          {dDayText}
        </span>
      )}

      <div className="absolute bottom-2.5 right-2.5 z-10">
        <LikeButton defaultLiked={defaultLiked} />
      </div>
    </div>
  );
}
