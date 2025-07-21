'use client';

import { useEffect, useState } from 'react';

import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';
import { DragBottomSheet } from '@/pages/rental/map/ui/DragBottomSheet';
import { StoreCard } from '@/pages/rental/map/ui/StoreCard';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import { renderStoreMarkers } from '../lib/renderStoreMarkers';

import type { DateRange } from 'react-day-picker';

const RentalPage = () => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks(map);
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
      {/* DragBottomSheet Drawer */}
      <DragBottomSheet open={false}>
        <div className="flex flex-col gap-3 px-4 pt-3 pb-6 bg-[#e6f6fd] rounded-t-2xl">
          {stores.stores?.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              storeDetail={{
                storeId: store.id,
                imageUrl: '',
                detailAddress: '서울 강남구 대치동',
                phoneNumber: '',
                distanceFromMe: 530,
                reviewRating: 0,
                isOpening: true,
                startTime: '10:00:00',
                endTime: '20:00:00',
              }}
              deviceCount={3}
            />
          ))}
        </div>
      </DragBottomSheet>
    </BaseLayout>
  );
};

export default RentalPage;
