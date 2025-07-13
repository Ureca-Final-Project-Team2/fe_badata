'use client';

import { MyDataUsageCard } from '@features/mypage/components/MyDataUsageCard';
import { MyPageHeader } from '@features/mypage/components/MyPageHeader';
import { MyRentalSection } from '@features/mypage/components/MyRentalSection';
import { MyReportStatus } from '@features/mypage/components/MyReportStatus';
import { MySettings } from '@features/mypage/components/MySettings';
import { MySosSection } from '@features/mypage/components/MySosSection';
import { MyTradeSection } from '@features/mypage/components/MyTradeSection';
import { BaseLayout } from '@components/layout/BaseLayout';
import { Header } from '@ui/Header';

export default function MyPage() {
  return (
    <BaseLayout header={<Header />}>
      <div className="space-y-6">
        <MyPageHeader />
        <MyDataUsageCard />
        <MyTradeSection />
        <MyRentalSection />
        <MySosSection />
        <MyReportStatus />
        <MySettings />
      </div>
    </BaseLayout>
  );
}
