'use client';

import { useEffect, useState } from 'react';

import { renderStoreMarkers } from '@/pages/rental/map/lib/renderStoreMarkers';
import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';

const RentalPage = () => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks();
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!map || stores.isLoading) return;
    renderStoreMarkers(map, stores.stores);
  }, [map, stores.stores, stores.isLoading]);

  return (
    <BaseLayout
      centered
      paddingX={false}
      showHeader
      showBottomNav
      header={
        <div className="max-w-[428px] px-4 pt-4 bg-white/80 z-30">
          <div className="flex flex-row justify-start items-center">
            <div className="relative flex-1 pl-1 mr-1">
              <DatePicker
                date={date}
                onDateChange={setDate}
                placeholder="대여 기간을 선택해주세요"
              />
            </div>
            {/* 필터 버튼 */}
          </div>
        </div>
      }
    >
      <div ref={mapRef} className="w-full h-full" />
    </BaseLayout>
  );
};

export default RentalPage;
