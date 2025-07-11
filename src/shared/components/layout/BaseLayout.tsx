'use client';

import React from 'react';
import { cn } from '@lib/cn';
import { BottomNav } from '@ui/BottomNav';
import { SosDrawer } from '@features/sos/components/SosDrawer';
import { useSosDrawer } from '@features/sos/hooks/useSosDrawer';

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  fab?: React.ReactNode;
  className?: string;
  showBottomNav?: boolean;
  showSos?: boolean;
}

export function BaseLayout({
  children,
  header,
  fab,
  className,
  showBottomNav = true,
  showSos = true,
}: BaseLayoutProps) {
  const { isDrawerOpen, openDrawer, closeDrawer } = useSosDrawer();

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="relative w-full max-w-[428px] min-h-screen overflow-hidden">
        {/* 고정 헤더 */}
        {header && (
          <div className="fixed max-w-[428px] mx-auto top-0 left-0 right-0 z-20">{header}</div>
        )}

        {/* 메인 스크롤 영역 */}
        <main className={cn('pt-[70px] pb-[70px] h-full overflow-y-auto px-[24px]', className)}>
          {children}
        </main>

        {/* 플로팅 버튼 영역 */}
        <div className="pointer-events-none fixed bottom-[90px] inset-x-0 z-30">
          <div className="mx-auto max-w-[428px] w-full flex justify-end pr-8 pointer-events-auto">
            {fab}
          </div>
        </div>

        {/* 고정 바텀 네비게이션 */}
        {showBottomNav && (
          <div className="fixed max-w-[428px] mx-auto bottom-0 left-0 right-0 z-[100]">
            <BottomNav
              sosActive={isDrawerOpen}
              onSosClick={isDrawerOpen ? closeDrawer : openDrawer}
            />
          </div>
        )}

        {/* 전역 SOS Drawer */}
        {showSos && (
          <div className="fixed bottom-0 left-0 right-0 z-40">
            <SosDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
          </div>
        )}
      </div>
    </div>
  );
}
