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
      className="w-[50px] h-[50px] p-0 border-none rounded-full flex items-center justify-center"
      style={{ minWidth: 0, minHeight: 0 }}
    >
      <img
        src={active ? '/assets/like_active.png' : '/assets/like_nonactive.png'}
        alt={active ? '좋아요 활성' : '좋아요 비활성'}
        className="w-full h-full"
        draggable={false}
      />
    </button>
  );
}
