'use client';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { AlarmSettingSection } from '@/pages/mypage/ui/AlarmSettingSection';
import { DataUsageCardSection } from '@/pages/mypage/ui/DataUsageCardSection';
import { RentalSection } from '@/pages/mypage/ui/RentalSection';
import { ReportStatusSection } from '@/pages/mypage/ui/ReportStatusSection';
import { SosSection } from '@/pages/mypage/ui/SosSection';
import { TradeSection } from '@/pages/mypage/ui/TradeSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import MyProfileCard from '@/widgets/user/ui/MyProfileCard';

export default function MyPage() {
  const profile = useAuthStore((s) => s.user);

  return (
    <BaseLayout header={<Header />}>
      <div className="space-y-6">
        {/* ✅ 프로필 카드 */}
        <MyProfileCard
          name={profile?.name ?? '사용자'}
          days={profile?.days ?? 0}
          avatarSrc={profile?.avatarSrc ?? '/default-avatar.png'}
        />

        {/* ✅ 데이터 카드 & 코인 */}
        <DataUsageCardSection />

        <TradeSection />
        <RentalSection />
        <SosSection />
        <ReportStatusSection />
        <AlarmSettingSection />
      </div>
    </BaseLayout>
  );
}
