'use client';

import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { usePendingRequestExecutor } from '@/shared/hooks/usePendingRequestExecutor';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore'; // 추가
import { SosDrawer } from '@/widgets/sos/ui/SosDrawer';
import { SosNotificationHandler } from '@/widgets/sos/ui/SosNotificationHandler';

import { cn } from '../lib/cn';

import { AuthModal } from './AuthModal';
import { AuthOverlay } from './AuthOverlay';
import { BottomNav } from './BottomNav';

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  headerfab?: React.ReactNode;
  fab?: React.ReactNode;
  className?: string;
  centered?: boolean;
  paddingX?: boolean;
  showHeader?: boolean;
  showBottomNav?: boolean;
  showSos?: boolean;
}

export function BaseLayout({
  children,
  header,
  headerfab,
  fab,
  className,
  centered = true,
  paddingX = true,
  showHeader = true,
  showBottomNav = true,
}: BaseLayoutProps) {
  usePendingRequestExecutor();
  const { isLoggedIn } = useAuthStore();
  const { isAuthModalOpen } = useAuthErrorStore(); // 추가
  const pathname = usePathname();

  // 홈과 마이페이지에서만 로그인 체크
  const requiresAuth = pathname === '/' || pathname === '/mypage';
  const shouldShowAuthOverlay = requiresAuth && !isLoggedIn;

  // AuthModal이 열려있거나 AuthOverlay가 표시될 때 블러 처리
  const shouldBlur = shouldShowAuthOverlay || isAuthModalOpen; // 수정

  return (
    <div className={`w-full ${centered ? 'flex justify-center' : ''} bg-[var(--main-2)]`}>
      <div className="relative w-full max-w-[428px] min-h-screen overflow-hidden bg-white">
        {/* 고정 헤더 */}
        {showHeader && header && (
          <div
            className={`fixed max-w-[428px] mx-auto top-0 left-0 right-0 z-20 ${shouldBlur ? 'filter blur-sm pointer-events-none' : ''}`}
          >
            {header}
          </div>
        )}

        {/* header fab */}
        <div
          className={`pointer-events-none fixed top-[135px] inset-x-0 z-30 ${shouldBlur ? 'filter blur-sm' : ''}`}
        >
          <div className="mx-auto max-w-[428px] w-full flex justify-end pointer-events-auto">
            {headerfab}
          </div>
        </div>

        {/* 메인 스크롤 영역 */}
        <main
          className={cn(
            `${showHeader ? 'pt-[70px]' : ''} ${showBottomNav ? 'pb-[70px]' : ''} h-full overflow-y-auto`,
            paddingX ? 'px-[24px]' : '',
            className,
            shouldBlur ? 'filter blur-sm pointer-events-none' : '',
          )}
        >
          {children}
        </main>

        {/* 플로팅 버튼 영역 */}
        <div
          className={`pointer-events-none fixed bottom-[90px] inset-x-0 z-30 ${shouldBlur ? 'filter blur-sm' : ''}`}
        >
          <div className="mx-auto max-w-[428px] w-full flex justify-end pointer-events-auto px-4">
            {fab}
          </div>
        </div>

        {/* 고정 바텀 네비게이션 */}
        {showBottomNav && (
          <div
            className={`fixed max-w-[428px] mx-auto bottom-0 left-0 right-0 z-[50] ${shouldBlur ? 'filter blur-sm' : ''}`}
          >
            <BottomNav />
          </div>
        )}

        {/* 전역 SOS Drawer */}
        <SosDrawer />

        {/* 전역 SOS 실시간 알림 핸들러 */}
        <SosNotificationHandler />

        {/* 전역 인증 모달 */}
        <AuthModal />

        {/* 로그인하지 않은 경우 오버레이 */}
        {shouldShowAuthOverlay && <AuthOverlay />}
      </div>
    </div>
  );
}
