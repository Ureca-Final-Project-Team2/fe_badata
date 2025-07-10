'use client';

import React, { useState } from 'react';
import { cn } from '@lib/cn';
import { BottomNav } from '@ui/BottomNav';
import { SosDrawer } from '@/features/sos/components/SosDrawer';
import { useSosDrawer } from '@/features/sos/hooks/useSosDrawer';

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  showBottomNav?: boolean;
  showSos?: boolean;
}

export function BaseLayout({
  children,
  header,
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
          <div className="fixed w-full max-w-[428px] mx-auto top-0 left-1/2 transform -translate-x-1/2 z-30">
            {header}
          </div>
        )}

        {/* 메인 스크롤 영역 */}
        <main
          className={cn(
            'h-full overflow-y-auto',
            header ? 'pt-[70px]' : 'pt-0',
            showBottomNav ? 'pb-[70px]' : 'pb-0',
            'px-[24px]',
            className,
          )}
        >
          {children}
        </main>

        {/* 고정 바텀 네비게이션 */}
        {showBottomNav && (
          <div className="fixed w-full max-w-[428px] mx-auto bottom-0 left-1/2 transform -translate-x-1/2 z-30">
            <BottomNav sosActive={isDrawerOpen} onSosClick={openDrawer} />
          </div>
        )}

        {/* 전역 SOS Drawer */}
        {showSos && <SosDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={closeDrawer} />
        )}
      </div>
    </div>
  );
}
