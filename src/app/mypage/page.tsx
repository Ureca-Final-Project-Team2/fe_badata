'use client';

import Image from 'next/image';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useUserInfoQuery } from '@/entities/user/model/queries';
import { useUserCoinQuery } from '@/features/mypage/coin-history/model/queries';
import { AlarmSettingSection } from '@/features/mypage/ui/AlarmSettingSection';
import DataUsageCardSection from '@/features/mypage/ui/DataUsageCardSection';
import { RentalSection } from '@/features/mypage/ui/RentalSection';
import { ReportStatusSection } from '@/features/mypage/ui/ReportStatusSection';
import { SosSection } from '@/features/mypage/ui/SosSection';
import { TradeSection } from '@/features/mypage/ui/TradeSection';
import { ICONS } from '@/shared/config/iconPath';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

export default function MyPage() {
  const { isLoggedIn } = useAuthStore();
  const { data: coinData } = useUserCoinQuery();
  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfoQuery();

  // 로그인하지 않은 경우 기본값 사용
  const defaultUserInfo = {
    nickName: '사용자',
    profileImage: '',
    days: 0,
  };

  // 모든 사용자 정보가 로딩된 후에만 프로필 카드 렌더링
  const isProfileReady = isLoggedIn
    ? userInfo && userInfo.nickName && userInfo.profileImage && userInfo.days !== undefined
    : true; // 로그인하지 않은 경우 항상 true

  return (
    <BaseLayout header={<Header />} paddingX={false}>
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
          {isLoggedIn ? (
            isProfileReady ? (
              <MyProfileCard
                name={userInfo?.nickName || '사용자'}
                days={userInfo?.days || 0}
                avatarSrc={userInfo?.profileImage || ''}
              />
            ) : (
              <MyProfileCard
                name="로딩 중..."
                days={0}
                avatarSrc={ICONS.ETC.SHELL.src.toString()}
                isLoading={isUserInfoLoading}
              />
            )
          ) : (
            <MyProfileCard name="사용자" days={0} avatarSrc="" />
          )}
        </div>
        <div className="relative px-4 pt-4 mb-4">
          <DataUsageCardSection />
        </div>
        <div className="absolute right-4 bottom-10 flex flex-col items-center">
          <div className="bg-[var(--white)] rounded-full px-3 py-1 shadow-md mb-2 min-w-[48px] text-center z-0">
            <span className="mb-2 font-body-semibold text-[var(--main-5)]">
              {isLoggedIn ? (coinData?.coin ?? 0) : 0}
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
    </BaseLayout>
  );
}
