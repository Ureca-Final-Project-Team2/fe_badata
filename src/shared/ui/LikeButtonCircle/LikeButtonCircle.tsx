import React from 'react';
import { LikeButton } from '../LikeButton/LikeButton';

interface LikeButtonCircleProps {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function LikeButtonCircle({ active = false, onClick, className }: LikeButtonCircleProps) {
  return (
    <div
      className={`w-14 h-14 rounded-full bg-white flex items-center justify-center ${className ?? ''}`}
      style={{ width: 56, height: 56 }}
    >
      <LikeButton active={active} onClick={onClick} className="w-[50px] h-[50px]" />
    </div>
  );
}
