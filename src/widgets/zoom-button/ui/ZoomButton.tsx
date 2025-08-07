import React from 'react';

import { Minus, Plus } from 'lucide-react';

interface ZoomButtonProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
}

export const ZoomButton: React.FC<ZoomButtonProps> = ({ onZoomIn, onZoomOut, className = '' }) => {
  return (
    <div className={`flex flex-col bg-[var(--white)] rounded-lg shadow-lg ${className}`}>
      {/* 줌인 버튼 (+ 버튼) */}
      <button
        onClick={onZoomIn}
        className="cursor-pointer flex items-center justify-center w-10 h-10 border-b border-[var(--gray-light)] hover:bg-[var(--gray-light)] transition-colors rounded-t-lg"
        aria-label="줌인"
      >
        <Plus className="w-4 h-4 text-[var(--gray-dark)]" />
      </button>

      {/* 줌아웃 버튼 (- 버튼) */}
      <button
        onClick={onZoomOut}
        className="cursor-pointer flex items-center justify-center w-10 h-10 hover:bg-[var(--gray-light)] transition-colors rounded-b-lg"
        aria-label="줌아웃"
      >
        <Minus className="w-4 h-4 text-[var(--gray-dark)]" />
      </button>
    </div>
  );
};
