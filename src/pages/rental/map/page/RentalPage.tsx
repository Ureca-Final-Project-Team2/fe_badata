'use client';

import { useEffect, useMemo, useState } from 'react';

import { renderStoreMarkers } from '@/pages/rental/map/lib/renderStoreMarkers';
import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';

const RentalPage = () => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks();
  const [dates, setDates] = useState<{ date1: Date | undefined; date2: Date | undefined }>({
    date1: undefined,
    date2: undefined,
  });

  // dateFields를 useMemo로 관리
  const dateFields = useMemo(
    () => [
      { label: '시작일', key: 'date1' as const },
      { label: '종료일', key: 'date2' as const },
    ],
    [],
  );

  useEffect(() => {
    if (!map || stores.isLoading) return;
    renderStoreMarkers(map, stores.stores);
  }, [map, stores.stores, stores.isLoading]);

  const handleDateChange = (key: keyof typeof dates, value: Date | undefined) => {
    setDates((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <BaseLayout
      centered
      paddingX={false}
      showHeader
      showBottomNav
      header={
        <div className="max-w-[428px] px-4 pt-4 bg-white/80 z-30">
          <div className="flex flex-row gap-4 justify-start">
            {dateFields.map(({ label, key }) => (
              <div key={key} className="relative w-[157px]">
                <DatePicker date={dates[key]} onDateChange={(d) => handleDateChange(key, d)} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div ref={mapRef} className="w-full h-full" />
    </BaseLayout>
  );
};

export default RentalPage;
