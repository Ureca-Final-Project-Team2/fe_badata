'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useLike } from '@features/like/hooks/useLike';
import { Button } from '@/components/ui/button';

interface LikeButtonProps {
  defaultLiked?: boolean;
  onChange?: (liked: boolean) => void;
}

export function LikeButton({ defaultLiked = false, onChange }: LikeButtonProps) {
  const { liked, toggle } = useLike({ defaultLiked, onChange });

  return (
    <Button
      type="button"
      onClick={toggle}
      size="icon"
      variant="ghost"
      className={`
        w-[26px] h-[26px] rounded-full flex items-center justify-center p-0 
        bg-[var(--gray)] text-inherit hover:bg-[var(--gray)] hover:text-inherit
      `}
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
