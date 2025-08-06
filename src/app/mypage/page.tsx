'use client';

import { lazy, Suspense } from 'react';

import Image from 'next/image';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useUserInfoQuery } from '@/entities/user/model/queries';
import { useUserCoinQuery } from '@/features/mypage/coin-history/model/queries';
import { ICONS } from '@/shared/config/iconPath';
import { Header } from '@/shared/ui/Header';

// Lazy loaded components for performance optimization
const AlarmSettingSection = lazy(() =>
  import('@/features/mypage/ui/AlarmSettingSection').then((module) => ({
    default: module.AlarmSettingSection,
  })),
);
const DataUsageCardSection = lazy(() =>
  import('@/features/mypage/ui/DataUsageCardSection').then((module) => ({
    default: module.default,
  })),
);
const RentalSection = lazy(() =>
  import('@/features/mypage/ui/RentalSection').then((module) => ({
    default: module.RentalSection,
  })),
);
const ReportStatusSection = lazy(() =>
  import('@/features/mypage/ui/ReportStatusSection').then((module) => ({
    default: module.ReportStatusSection,
  })),
);
const SosSection = lazy(() =>
  import('@/features/mypage/ui/SosSection').then((module) => ({ default: module.SosSection })),
);
const TradeSection = lazy(() =>
  import('@/features/mypage/ui/TradeSection').then((module) => ({ default: module.TradeSection })),
);
const SosDrawer = lazy(() =>
  import('@/widgets/sos/ui/SosDrawer').then((module) => ({ default: module.SosDrawer })),
);
const MyProfileCard = lazy(() =>
  import('@/widgets/user/ui/MyProfileCard').then((module) => ({ default: module.default })),
);

// Loading fallback components
const SectionLoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="text-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--main-5)] mx-auto mb-2"></div>
      <p className="text-[var(--main-5)] text-sm">섹션 로딩 중...</p>
    </div>
  </div>
);

const ProfileLoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="text-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--main-5)] mx-auto mb-2"></div>
      <p className="text-[var(--main-5)] text-sm">프로필 로딩 중...</p>
    </div>
  </div>
);

const SosDrawerLoadingFallback = () => null; // SOS Drawer는 필요할 때만 표시되므로 빈 fallback

export default function MyPage() {
  const { isLoggedIn } = useAuthStore();
  const { data: coinData } = useUserCoinQuery();
  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfoQuery();

  // 모든 사용자 정보가 로딩된 후에만 프로필 카드 렌더링
  const isProfileReady = isLoggedIn
    ? userInfo && userInfo.nickName && userInfo.profileImage && userInfo.days !== undefined
    : true; // 로그인하지 않은 경우 항상 true

  return (
    <div className="relative w-full min-h-screen bg-[var(--main-2)]">
      <div className="fixed top-0 left-0 right-0 z-20 max-w-[428px] mx-auto">
        <Header />
      </div>

      <main className="pt-[70px] pb-[70px] w-full max-w-[428px] mx-auto">
        <div
          className="w-full bg-[var(--main-1)] pb-16 relative"
          style={{
            backgroundImage: `url(${ICONS.MYPAGE.BACKGROUND})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="pt-4 flex justify-center">
            <Suspense fallback={<ProfileLoadingFallback />}>
              {isProfileReady ? (
                <MyProfileCard
                  name={userInfo.nickName}
                  days={userInfo.days}
                  avatarSrc={userInfo.profileImage}
                />
              ) : (
                <MyProfileCard
                  name="로딩 중..."
                  days={0}
                  avatarSrc={ICONS.ETC.SHELL.src.toString()}
                  isLoading={isUserInfoLoading}
                />
              )}
            </Suspense>
          </div>
          <div className="relative px-4 pt-4 mb-4">
            <Suspense fallback={<SectionLoadingFallback />}>
              <DataUsageCardSection />
            </Suspense>
          </div>
          <div className="absolute right-4 bottom-10 flex flex-col items-center">
            <div className="bg-[var(--white)] rounded-full px-3 py-1 shadow-md mb-2 min-w-[48px] text-center z-0">
              <span className="mb-2 font-body-semibold text-[var(--main-5)]">
                {coinData?.coin ?? 0}
              </span>
            </div>
            <a href="/mypage/coin-history" className="z-10">
              <Image
                src={ICONS.MYPAGE.COIN_STACK}
                alt="코인 이미지"
                width={100}
                height={100}
                className="w-[100px] h-[100px] cursor-pointer transition-transform duration-200 hover:scale-110 z-10"
              />
            </a>
          </div>
        </div>
        <div
          className="bg-[var(--white)] rounded-t-[50px] relative px-6 -mt-12"
          style={{ minHeight: 'calc(100vh - 100px)' }}
        >
          <div className="pt-10 pb-6 space-y-8">
            <Suspense fallback={<SectionLoadingFallback />}>
              <TradeSection />
            </Suspense>
            <Suspense fallback={<SectionLoadingFallback />}>
              <RentalSection />
            </Suspense>
            <Suspense fallback={<SectionLoadingFallback />}>
              <SosSection />
            </Suspense>
            <Suspense fallback={<SectionLoadingFallback />}>
              <ReportStatusSection />
            </Suspense>
            <Suspense fallback={<SectionLoadingFallback />}>
              <AlarmSettingSection />
            </Suspense>
          </div>
        </div>
      </main>
      <div className="bg-[var(--white)] fixed bottom-0 left-0 right-0 z-50 max-w-[428px] mx-auto">
        <BottomNav />
      </div>

      {/* SOS Drawer 추가 */}
      <Suspense fallback={<SosDrawerLoadingFallback />}>
        <SosDrawer />
      </Suspense>
    </div>
  );
}
