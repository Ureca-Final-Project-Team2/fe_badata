'use client';

import { usePathname } from 'next/navigation';

import { Coins, Star } from 'lucide-react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { usePendingRequestExecutor } from '@/shared/hooks/usePendingRequestExecutor';
import { SosDrawer } from '@/widgets/sos/ui/SosDrawer';
import { SosNotificationHandler } from '@/widgets/sos/ui/SosNotificationHandler';

import { cn } from '../lib/cn';

import { AuthModal } from './AuthModal';
import { BottomNav } from './BottomNav';

interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  headerfab?: React.ReactNode;
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
  headerfab,
  fab,
  className,
  centered = true,
  paddingX = true,
  showHeader = true,
  showBottomNav = true,
}: BaseLayoutProps) {
  // pendingRequest 실행
  usePendingRequestExecutor();
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();

  // 홈과 마이페이지에서만 로그인 체크
  const requiresAuth = pathname === '/' || pathname === '/mypage';
  const shouldShowAuthOverlay = requiresAuth && !isLoggedIn;
  return (
    <div className={`w-full ${centered ? 'flex justify-center' : ''} bg-[var(--main-2)]`}>
      <div className="relative w-full max-w-[428px] min-h-screen overflow-hidden bg-white">
        {/* 고정 헤더 */}
        {showHeader && header && (
          <div
            className={`fixed max-w-[428px] mx-auto top-0 left-0 right-0 z-20 ${shouldShowAuthOverlay ? 'filter blur-sm pointer-events-none' : ''}`}
          >
            {header}
          </div>
        )}

        {/* header fab */}
        <div
          className={`pointer-events-none fixed top-[135px] inset-x-0 z-30 ${shouldShowAuthOverlay ? 'filter blur-sm' : ''}`}
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
            shouldShowAuthOverlay ? 'filter blur-sm pointer-events-none' : '',
          )}
        >
          {children}
        </main>

        {/* 플로팅 버튼 영역 */}
        <div
          className={`pointer-events-none fixed bottom-[90px] inset-x-0 z-30 ${shouldShowAuthOverlay ? 'filter blur-sm' : ''}`}
        >
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

        {/* 전역 SOS 실시간 알림 핸들러 */}
        <SosNotificationHandler />

        {/* 전역 인증 모달 */}
        <AuthModal />

        {/* 로그인하지 않은 경우 오버레이 */}
        {shouldShowAuthOverlay && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--black)]/50">
            <div className="bg-[var(--white)] rounded-2xl overflow-hidden max-w-[400px] mx-4">
              {/* 헤더 배경 */}
              <div className="bg-gradient-to-r from-[var(--main-3)] to-[var(--main-4)] px-6 pt-8 pb-6 relative">
                <div className="text-center text-[var(--white)]">
                  <h2 className="font-body-semibold mb-2">어? 잠깐! 🙋‍♀️</h2>
                  <p className="font-small-semibold opacity-90">
                    로그인하고 더 많은 기능을 이용해보세요!
                  </p>
                </div>
              </div>

              {/* 콘텐츠 */}
              <div className="px-6 py-6">
                {/* 혜택 안내 */}
                <div className="mb-6">
                  <h3 className="font-small-semibold text-[var(--black)] mb-4 text-center">
                    로그인하면 이런 혜택이 있어요! ✨
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[var(--main-1)] rounded-lg">
                      <div className="w-8 h-8 bg-[var(--main-4)] rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-[var(--white)]" />
                      </div>
                      <div>
                        <p className="font-small-semibold text-[var(--black)]">
                          거래 게시물 맞춤 추천
                        </p>
                        <p className="text-xs text-[var(--gray-dark)]">
                          나에게 딱 맞는 거래를 찾아드려요
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[var(--main-1)] rounded-lg">
                      <div className="w-8 h-8 bg-[var(--main-5)] rounded-full flex items-center justify-center flex-shrink-0">
                        <Coins className="w-4 h-4 text-[var(--white)]" />
                      </div>
                      <div>
                        <p className="font-small-medium text-[var(--black)] text-sm">
                          리워드 코인 사용
                        </p>
                        <p className="text-xs text-[var(--gray-dark)]">
                          활동하며 쌓은 코인으로 혜택을 받아요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 로그인 버튼 */}
                <button
                  onClick={() => {
                    // 카카오 로그인 실행
                    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
                    const REDIRECT_URI =
                      process.env.NODE_ENV === 'production'
                        ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_RELEASE
                        : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
                    const AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;

                    if (!REST_API_KEY || !REDIRECT_URI || !AUTH_URL) {
                      console.error('카카오 로그인 환경변수 누락');
                      return;
                    }

                    // 현재 페이지 정보 저장
                    localStorage.setItem('redirectTo', window.location.pathname);

                    const kakaoAuthUrl = `${AUTH_URL}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
                    window.location.href = kakaoAuthUrl;
                  }}
                  className="w-full h-12 bg-yellow-400 hover:bg-yellow-300 text-[var(--black)] font-semibold rounded-xl transition-colors shadow-sm"
                >
                  카카오로 3초만에 시작하기 🚀
                </button>

                <p className="text-xs text-[var(--gray-mid)] text-center mt-3">
                  간편하고 안전한 카카오 로그인으로 시작해보세요
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
