'use client';

import Image from 'next/image';

import { useUserInfoQuery } from '@/entities/user/model/queries';
import { useUserCoinQuery } from '@/features/mypage/coin-history/model/queries';
import { AlarmSettingSection } from '@/features/mypage/ui/AlarmSettingSection';
import { DataUsageCardSection } from '@/features/mypage/ui/DataUsageCardSection';
import { RentalSection } from '@/features/mypage/ui/RentalSection';
import { ReportStatusSection } from '@/features/mypage/ui/ReportStatusSection';
import { SosSection } from '@/features/mypage/ui/SosSection';
import { TradeSection } from '@/features/mypage/ui/TradeSection';
import { ICONS } from '@/shared/config/iconPath';
import { BottomNav } from '@/shared/ui/BottomNav';
import { Header } from '@/shared/ui/Header';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

export default function MyPage() {
  const { data: coinData } = useUserCoinQuery();
  const { data: userInfo } = useUserInfoQuery();

  return (
    <div className="relative w-full min-h-screen bg-[var(--main-2)]">
      <div className="fixed top-0 left-0 right-0 z-20 max-w-[428px] mx-auto">
        <Header />
      </div>

      <main className="pt-[70px] pb-[70px] w-full max-w-[428px] mx-auto">
        <div className="w-full bg-[var(--main-1)] pb-16 relative">
          <div className="pt-4 flex justify-center">
            <MyProfileCard
              name={userInfo?.nickName ?? '사용자'}
              days={userInfo?.days ?? 0}
              avatarSrc={userInfo?.profileImage ?? ICONS.ETC.SHELL.src.toString()}
            />
          </div>
          <div className="relative px-4 pt-4 mb-4">
            <DataUsageCardSection />
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
            <TradeSection />
            <RentalSection />
            <SosSection />
            <ReportStatusSection />
            <AlarmSettingSection />
          </div>
        </div>
      </main>
      <div className="bg-[var(--white)] fixed bottom-0 left-0 right-0 z-50 max-w-[428px] mx-auto">
        <BottomNav />
      </div>
    </div>
  );
}
