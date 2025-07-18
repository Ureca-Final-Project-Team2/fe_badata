'use client';

import { useRouter } from 'next/navigation';

import { AlarmSettingSection } from '@/pages/mypage/ui/AlarmSettingSection';
import { DataUsageCardSection } from '@/pages/mypage/ui/DataUsageCardSection';
import { RentalSection } from '@/pages/mypage/ui/RentalSection';
import { ReportStatusSection } from '@/pages/mypage/ui/ReportStatusSection';
import { SosSection } from '@/pages/mypage/ui/SosSection';
import { TradeSection } from '@/pages/mypage/ui/TradeSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header, PageHeader } from '@/shared/ui/Header';

export default function MyPage() {
  const router = useRouter();
  return (
    <BaseLayout header={<Header />}>
      <div className="space-y-6">
        <PageHeader title="마이페이지" onBack={() => router.back()} />
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
