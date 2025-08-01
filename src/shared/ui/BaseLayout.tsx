'use client';

import { SosDrawer } from '@/widgets/sos/ui/SosDrawer';

import { cn } from '../lib/cn';

import { BottomNav } from './BottomNav';

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  fab?: React.ReactNode;
  className?: string;
  centered?: boolean; // 가운데 정렬 여부
  paddingX?: boolean; // 양옆 패딩 여부
  showHeader?: boolean; // 헤더 표시 여부
  showBottomNav?: boolean; // 바텀네비 표시 여부
  showSos?: boolean;
}

export function BaseLayout({
  children,
  header,
  fab,
  className,
  centered = true,
  paddingX = true,
  showHeader = true,
  showBottomNav = true,
}: BaseLayoutProps) {
  return (
    <div className={`w-full ${centered ? 'flex justify-center' : ''} bg-[var(--main-2)]`}>
      <div className="relative w-full max-w-[428px] min-h-screen overflow-hidden bg-white">
        {/* 고정 헤더 */}
        {showHeader && header && (
          <div className="fixed max-w-[428px] mx-auto top-0 left-0 right-0 z-20">{header}</div>
        )}

        {/* 메인 스크롤 영역 */}
        <main
          className={cn(
            `${showHeader ? 'pt-[70px]' : ''} ${showBottomNav ? 'pb-[70px]' : ''} h-full overflow-y-auto`,
            paddingX ? 'px-[24px]' : '',
            className,
          )}
        >
          {children}
        </main>

        {/* 플로팅 버튼 영역 */}
        <div className="pointer-events-none fixed bottom-[90px] inset-x-0 z-30">
          <div className="mx-auto max-w-[428px] w-full flex justify-end pointer-events-auto px-4">
            {fab}
          </div>
        </div>

        {/* 고정 바텀 네비게이션 */}
        {showBottomNav && (
          <div className="fixed max-w-[428px] mx-auto bottom-0 left-0 right-0 z-[50]">
            <BottomNav />
          </div>
        )}

        {/* 전역 SOS Drawer */}
        <SosDrawer />
      </div>
    </div>
  );
}
