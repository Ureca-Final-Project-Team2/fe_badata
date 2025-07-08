'use client';
import React from 'react';
import { Heart } from 'lucide-react';
import { useLikeToggle } from './useLikeToggle';
import { Button } from '@/components/ui/button';

interface LikeButtonProps {
  defaultLiked?: boolean;
}

export function LikeButton({ defaultLiked = false }: LikeButtonProps) {
  const { liked, toggle } = useLikeToggle(defaultLiked);

  return (
    <Button
      type="button"
      onClick={toggle}
      size="icon"
      variant="ghost"
      className="w-[26px] h-[26px] rounded-full flex items-center justify-center p-0 hover:bg-[var(--gray-light)] hover:text-inherit"
      style={{
        backgroundColor: 'var(--gray-light)',
        color: 'inherit',
      }}
    >
      <Heart
        className="w-4 h-4"
        fill={liked ? 'var(--point-1)' : 'none'}
        stroke={liked ? 'var(--point-1)' : 'white'}
        strokeWidth={2}
      />
    </Button>
  );
}
