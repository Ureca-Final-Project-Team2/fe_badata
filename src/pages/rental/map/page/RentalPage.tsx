'use client';

import { useEffect, useState } from 'react';

import { renderStoreMarkers } from '@/pages/rental/map/lib/renderStoreMarkers';
import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import type { DateRange } from 'react-day-picker';

const RentalPage = () => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

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
        <div className="max-w-[428px] px-4 pt-4 bg-white/80 z-30 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center w-full">
            <div className="w-[90%]">
              <DatePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder="대여 기간을 선택해주세요"
              />
            </div>
            <FilterIcon alt="" className="w-8 h-8 ml-4 flex-shrink-0" />
          </div>
        </div>
      }
    >
      <div ref={mapRef} className="w-full h-full" />
    </BaseLayout>
  );
};

export default RentalPage;
