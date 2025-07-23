'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FlatTab } from '@/shared/ui/FlatTab/FlatTab';
import { Header_Detail } from '@/shared/ui/Header_Detail';

import type { DateRange } from 'react-day-picker';

const ReservationPage = () => {
  const params = useParams();
  const storeId =
    typeof params === 'object' && params !== null ? (params['storeId'] as string) : '';
  const [tab, setTab] = useState('예약');
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  const tabList = [
    { label: '예약', value: '예약' },
    { label: '상세정보', value: '상세정보' },
    { label: '리뷰', value: '리뷰' },
  ];

  return (
    <BaseLayout
      header={<Header_Detail title={`LG유플러스 플러자 ${storeId}호점`} />}
      showHeader
      showBottomNav
      className="custom-scrollbar"
    >
      <FlatTab items={tabList} value={tab} onValueChange={setTab} />
      {tab === '예약' && (
        <div className="flex flex-col gap-4 mt-4 w-full">
          <div className="font-body-semibold text-lg flex items-center gap-2">
            <CalendarIcon size={20} className="text-[var(--main-5)]" />
            날짜를 선택해주세요
          </div>
          <div className="w-full">
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={setSelectedRange}
              required
              className="rounded-md w-full"
            />
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default ReservationPage;
