'use client';

import { useReducer, useState } from 'react';

import { CenterScrollSwiper } from '@/entities/scroll';
import { mockStoreList } from '@/pages/rental/map/__mocks__/storeList.mock';
import {
  initialSelectedStoreState,
  selectedStoreReducer,
} from '@/pages/rental/map/model/selectedStoreReducer';
import DeviceCard from '@/pages/rental/map/ui/DeviceCard';
import { DrawerSection } from '@/pages/rental/map/ui/DrawerSection';
import { MapSection } from '@/pages/rental/map/ui/MapSection';
import RentalFilterContent from '@/pages/rental/map/ui/RentalFilterContent';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import type { StoreDevice } from '@/pages/rental/map/lib/types';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';
import type { DateRange } from 'react-day-picker';

const RentalPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedStore, dispatchSelectedStore] = useReducer(
    selectedStoreReducer,
    initialSelectedStoreState,
  );

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
            <FilterIcon
              alt=""
              className="w-8 h-8 ml-4 flex-shrink-0"
              onClick={() => setFilterDrawerOpen(true)}
            />
          </div>
        </div>
      }
    >
      <MapSection
        onStoreMarkerClick={(
          devices: StoreDevice[],
          storeDetail?: StoreDetail,
          storeId?: number,
        ) => {
          dispatchSelectedStore({
            type: 'SELECT_STORE',
            devices,
            storeId: storeId ?? 0,
            storeDetail,
          });
        }}
      />
      <DrawerSection open={false} storeList={mockStoreList} />
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        className="bg-[var(--main-2)]"
      >
        <RentalFilterContent onClose={() => setFilterDrawerOpen(false)} />
      </FilterDrawer>
      {selectedStore.selectedDevices.length > 0 && (
        <div className="absolute bottom-20 left-0 w-full flex justify-center z-50">
          <CenterScrollSwiper
            key={selectedStore.selectedDevices.map((d) => d.storeDeviceId).join('-')}
            items={selectedStore.selectedDevices}
          >
            {(device) => <DeviceCard device={device} />}
          </CenterScrollSwiper>
        </div>
      )}
    </BaseLayout>
  );
};

export default RentalPage;
