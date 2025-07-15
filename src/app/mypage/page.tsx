'use client';

import { BaseLayout } from '@components/layout/BaseLayout';
import { MyDataUsageCard } from '@features/mypage/ui/detail/MyDataUsageCard';
import { MyPageHeader } from '@features/mypage/ui/MyPageHeader';
import { MyRentalSection } from '@features/mypage/ui/MyRentalSection';
import { MyReportStatus } from '@features/mypage/ui/MyReportStatus';
import { MySettings } from '@features/mypage/ui/MySettings';
import { MySosSection } from '@features/mypage/ui/MySosSection';
import { MyTradeSection } from '@features/mypage/ui/MyTradeSection';
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
