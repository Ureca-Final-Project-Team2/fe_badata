import React from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface LikeButtonProps {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  size?: 'sm' | 'md';
}

export function LikeButton({ active = false, onClick, size = 'md' }: LikeButtonProps) {
  const iconSize = size === 'sm' ? 21 : 20;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-0 border-none rounded-full flex items-center justify-center min-w-0 min-h-0 ${size === 'sm' ? 'w-[21px] h-[21px]' : 'w-[26px] h-[26px]'}`}
    >
      <Image
        src={active ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE}
        alt={active ? '좋아요 활성' : '좋아요 비활성'}
        width={iconSize}
        height={iconSize}
        draggable={false}
      />
    </button>
  );
}
