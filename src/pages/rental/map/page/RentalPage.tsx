'use client';

import { useEffect, useReducer, useState } from 'react';

import { CenterScrollSwiper } from '@/entities/scroll';
import { initialRentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';
import {
  initialSelectedStoreState,
  selectedStoreReducer,
} from '@/pages/rental/map/model/selectedStoreReducer';
import { useFilteredDevices } from '@/pages/rental/map/model/useFilteredDevices';
import DeviceCard from '@/pages/rental/map/ui/DeviceCard';
import { DrawerSection } from '@/pages/rental/map/ui/DrawerSection';
import { MapSection } from '@/pages/rental/map/ui/MapSection';
import RentalFilterContent from '@/pages/rental/map/ui/RentalFilterContent';
import { mockStoreList } from '@/pages/rental/map/utils/storeList';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import type { StoreDevice } from '@/pages/rental/map/lib/types';
import type { RentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';
import type { DateRange } from 'react-day-picker';

const RentalPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedStore, dispatchSelectedStore] = useReducer(
    selectedStoreReducer,
    initialSelectedStoreState,
  );
  const [filterState, setFilterState] = useState<RentalFilterState>(initialRentalFilterState);
  const [tempFilterState, setTempFilterState] =
    useState<RentalFilterState>(initialRentalFilterState);

  // 필터링 조건이 바뀔 때마다 현재 선택된 가맹점의 디바이스도 다시 필터링
  const filteredDevices = useFilteredDevices(selectedStore.selectedDevices, filterState);
  useEffect(() => {
    if (!selectedStore.selectedDevices.length) return;
    if (filteredDevices.length === 0) {
      dispatchSelectedStore({
        type: 'SELECT_STORE',
        devices: [],
        storeId: selectedStore.selectedStoreId ?? 0,
        storeDetail: selectedStore.selectedStoreDetail,
      });
    } else if (filteredDevices.length !== selectedStore.selectedDevices.length) {
      dispatchSelectedStore({
        type: 'SELECT_STORE',
        devices: filteredDevices,
        storeId: selectedStore.selectedStoreId ?? 0,
        storeDetail: selectedStore.selectedStoreDetail,
      });
    }
  }, [filterState]);

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
              onClick={() => {
                setTempFilterState(filterState); // Drawer 열 때 tempFilterState를 filterState로 초기화
                setFilterDrawerOpen(true);
              }}
            />
          </div>
        </div>
      }
    >
      <MapSection
        filterState={filterState}
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
      <DrawerSection open={true} storeList={mockStoreList} />
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        className="bg-[var(--main-2)]"
      >
        <RentalFilterContent
          onClose={() => setFilterDrawerOpen(false)}
          filterState={tempFilterState}
          setFilterState={setTempFilterState}
          onSubmit={(filters) => {
            setFilterState(filters); // 결과보기 클릭 시에만 실제 filterState 반영
            setFilterDrawerOpen(false);
          }}
        />
      </FilterDrawer>
      {filteredDevices.length > 0 && (
        <div className="absolute bottom-20 left-0 w-full flex justify-center z-50">
          <CenterScrollSwiper
            key={filteredDevices.map((d: StoreDevice) => d.storeDeviceId).join('-')}
            items={filteredDevices}
          >
            {(device: StoreDevice) => <DeviceCard device={device} />}
          </CenterScrollSwiper>
        </div>
      )}
    </BaseLayout>
  );
};

export default RentalPage;
