'use client';

import React, { useState } from 'react';
import { cn } from '@lib/cn';
import { BottomNav } from '@ui/BottomNav';
import { SosDrawer } from '@/features/sos/components/SosDrawer';
import { useSosDrawer } from '@/features/sos/hooks/useSosDrower';

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export function BaseLayout({ children, header, className }: BaseLayoutProps) {
  const { isDrawerOpen, openDrawer, closeDrawer } = useSosDrawer();

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="relative w-full max-w-[428px] min-h-screen overflow-hidden">
        {/* 고정 헤더 */}
        {header && (
          <div className="fixed max-w-[428px] mx-auto top-0 left-0 right-0 z-50">{header}</div>
        )}

        {/* 스크롤 영역 */}
        <main className={cn('pt-[70px] pb-[70px] h-full overflow-y-auto px-[24px]', className)}>
          {children}
        </main>

        {/* 고정 바텀 네비게이션 */}
        <div className="fixed max-w-[428px] mx-auto bottom-0 left-0 right-0 z-10">
          <BottomNav sosActive={isDrawerOpen} onSosClick={openDrawer} />
          <SosDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
        </div>
      </div>
    </div>
  );
}
