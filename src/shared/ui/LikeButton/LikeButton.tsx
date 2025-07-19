import { ICONS } from '@/shared/config/iconPath';
import Image from 'next/image';
import React from 'react';

interface LikeButtonProps {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function LikeButton({ active = false, onClick }: LikeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[26px] h-[26px] p-0 border-none rounded-full flex items-center justify-center"
      style={{ minWidth: 0, minHeight: 0 }}
    >
      <Image
        src={active ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE}
        alt={active ? '좋아요 활성' : '좋아요 비활성'}
        width={20}
        height={20}
        draggable={false}
      />
    </button>
  );
}
