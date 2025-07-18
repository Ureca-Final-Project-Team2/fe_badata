'use client';

import { ChevronLeft, MoreVertical, Share } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  variant?: 'default' | 'with-actions';
  onShareClick?: () => void;
  onMoreClick?: () => void;
}

export const PageHeader = ({
  title,
  onBack,
  variant = 'default',
  onShareClick,
  onMoreClick,
}: PageHeaderProps) => (
  <header className="relative w-full h-[70px] flex items-center bg-white shadow-sm">
    <button
      className="absolute left-4 w-[30px] h-[30px] flex items-center justify-center"
      onClick={onBack}
      aria-label="뒤로가기"
    >
      <ChevronLeft size={30} />
    </button>

    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px] font-bold text-black">
      {title}
    </h1>

    {variant === 'with-actions' && (
      <div className="absolute right-4 flex gap-2">
        <button onClick={onShareClick} aria-label="공유하기">
          <Share size={24} />
        </button>
        <button onClick={onMoreClick} aria-label="더보기">
          <MoreVertical size={24} />
        </button>
      </div>
    )}
  </header>
);
