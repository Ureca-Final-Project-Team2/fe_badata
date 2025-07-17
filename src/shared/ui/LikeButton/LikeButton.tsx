'use client';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLikeHooks } from '@/shared/model/useLikeHooks';

interface LikeButtonProps {
  defaultLiked?: boolean;
  onChange?: (liked: boolean) => void;
}

export function LikeButton({ defaultLiked = false, onChange }: LikeButtonProps) {
  const { liked, toggle } = useLikeHooks({ defaultLiked, onChange });

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
