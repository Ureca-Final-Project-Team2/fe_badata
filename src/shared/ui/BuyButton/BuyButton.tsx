import React from 'react';
import { LikeButtonCircle } from '../LikeButtonCircle/LikeButtonCircle';

interface BuyButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  likeActive?: boolean;
  onLikeClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function BuyButton({ onClick, likeActive = false, onLikeClick }: BuyButtonProps) {
  return (
    <div className="flex flex-row items-center gap-6">
      <LikeButtonCircle active={likeActive} onClick={onLikeClick} />
      <button
        type="button"
        onClick={onClick}
        className="w-[300px] h-[55px] rounded-[20px] bg-[var(--main-5)] active:bg-[var(--main-4)] text-white flex items-center justify-center transition-colors"
        style={{ minWidth: 0, minHeight: 0 }}
      >
        <span style={{ fontSize: 'var(--font-title-semibold)', fontWeight: 600 }}>구매하기</span>
      </button>
    </div>
  );
}
