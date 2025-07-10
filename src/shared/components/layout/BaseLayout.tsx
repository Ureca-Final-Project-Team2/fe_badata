import React from 'react';
import { cn } from '@lib/cn';
import { BottomNav } from '@ui/BottomNav';

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export function BaseLayout({ children, header, className }: BaseLayoutProps) {
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="relative w-full max-w-[428px] min-h-screen overflow-hidden">
        {/* 고정 헤더 (home header or page header) */}
        {header && (
          <div className="fixed max-w-[428px] mx-auto top-0 left-0 right-0 z-10">{header}</div>
        )}

        {/* 스크롤 영역 (main content) */}
        <main className={cn('pt-[70px] pb-[70px] h-full overflow-y-auto px-[24px]', className)}>
          {children}
        </main>

        {/* 고정 바텀 네비게이션 */}
        <div className="fixed max-w-[428px] mx-auto bottom-0 left-0 right-0 z-10">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
