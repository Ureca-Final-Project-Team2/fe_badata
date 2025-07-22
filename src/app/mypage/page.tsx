'use client';

import { AlarmSettingSection } from '@/pages/mypage/ui/AlarmSettingSection';
import { DataUsageCardSection } from '@/pages/mypage/ui/DataUsageCardSection';
import { RentalSection } from '@/pages/mypage/ui/RentalSection';
import { ReportStatusSection } from '@/pages/mypage/ui/ReportStatusSection';
import { SosSection } from '@/pages/mypage/ui/SosSection';
import { TradeSection } from '@/pages/mypage/ui/TradeSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';

export default function MyPage() {
  return (
    <BaseLayout header={<Header />}>
      <div className="space-y-6">
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
