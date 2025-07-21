import React from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface LikeButtonProps {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: 20 | 50;
}

export function LikeButton({ active = false, onClick, size = 20 }: LikeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-0 border-none rounded-full flex items-center justify-center"
      style={{ minWidth: 0, minHeight: 0, width: size, height: size }}
    >
      <Image
        src={active ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE}
        alt={active ? '좋아요 활성' : '좋아요 비활성'}
        width={size}
        height={size}
        draggable={false}
      />
    </button>
  );
}
