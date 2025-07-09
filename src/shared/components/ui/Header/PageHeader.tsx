'use client';

import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

export const PageHeader = ({ title, onBack }: PageHeaderProps) => (
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
  </header>
);
