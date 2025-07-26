import React from 'react';

import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface DetailLikeButtonProps {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function DetailLikeButton({
  active = false,
  onClick,
  disabled = false,
}: DetailLikeButtonProps) {
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
      disabled={disabled}
      className={`w-[56px] h-[56px] p-0 border-none bg-[var(--white)] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
        disabled
          ? 'opacity-50 cursor-not-allowed scale-95'
          : 'cursor-pointer hover:scale-105 active:scale-95'
      }`}
    >
      <Image
        src={active ? ICONS.ETC.LIKE_ACTIVE : ICONS.ETC.LIKE_NONACTIVE}
        alt={active ? '좋아요 활성' : '좋아요 비활성'}
        width={50}
        height={50}
        draggable={false}
        className={`transition-all duration-200 ${disabled ? 'opacity-60' : ''}`}
      />
    </button>
  );
}
