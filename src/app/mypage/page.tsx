'use client';

import Image from 'next/image';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useUserCoinQuery } from '@/pages/mypage/coin-history/model/queries';
import { AlarmSettingSection } from '@/pages/mypage/ui/AlarmSettingSection';
import { DataUsageCardSection } from '@/pages/mypage/ui/DataUsageCardSection';
import { RentalSection } from '@/pages/mypage/ui/RentalSection';
import { ReportStatusSection } from '@/pages/mypage/ui/ReportStatusSection';
import { SosSection } from '@/pages/mypage/ui/SosSection';
import { TradeSection } from '@/pages/mypage/ui/TradeSection';
import { ICONS } from '@/shared/config/iconPath';
import { BottomNav } from '@/shared/ui/BottomNav';
import { Header } from '@/shared/ui/Header';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

export default function MyPage() {
  const profile = useAuthStore((s) => s.user);
  const { data: coinData } = useUserCoinQuery();

  return (
    <div className="relative w-full min-h-screen bg-[var(--main-2)]">
      <div className="fixed top-0 left-0 right-0 z-20 max-w-[428px] mx-auto">
        <Header />
      </div>

      <main className="pt-[70px] pb-[70px] w-full max-w-[428px] mx-auto">
        <div className="w-full bg-[var(--main-1)] pb-16 relative">
          <div className="px-4 pt-4 flex justify-center">
            <MyProfileCard
              name={profile?.name ?? '사용자'}
              days={15} // 일단 기본값 사용
              avatarSrc={profile?.profile_image_url}
            />
          </div>
          <div className="relative px-4 pt-4 mb-4">
            <DataUsageCardSection />
          </div>
          <div className="absolute right-4 bottom-10 flex flex-col items-center">
            <div className="bg-white rounded-full px-3 py-1 shadow-md mb-2 min-w-[48px] text-center">
              <span className="text-[16px] font-semibold text-[var(--main-5)]">
                {coinData?.coin ?? 0}
              </span>
            </div>
            <a href="/mypage/coin-history">
              <Image 
                src={ICONS.MYPAGE.COIN_STACK} 
                alt="코인 이미지" 
                width={100} 
                height={100}
                className="w-[100px] h-[100px] cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div
          className="bg-white rounded-t-[50px] relative px-6 -mt-12"
          style={{ minHeight: 'calc(100vh - 100px)' }}
        >
          <div className="pt-6 pb-6 space-y-6">
            <TradeSection />
            <RentalSection />
            <SosSection />
            <ReportStatusSection />
            <AlarmSettingSection />
          </div>
        </div>
      </main>
      <div className="bg-white fixed bottom-0 left-0 right-0 z-50 max-w-[428px] mx-auto">
        <BottomNav />
      </div>
    </div>
  );
}
