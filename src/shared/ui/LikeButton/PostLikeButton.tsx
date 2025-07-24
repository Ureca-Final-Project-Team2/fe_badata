import React from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface PostLikeButtonProps {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function PostLikeButton({ active = false, onClick, disabled = false }: PostLikeButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-[26px] h-[26px] p-0 border-none bg-[var(--main-1)] rounded-full flex items-center justify-center cursor-pointer"
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
