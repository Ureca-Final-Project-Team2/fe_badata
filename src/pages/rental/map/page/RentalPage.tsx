'use client';

import { useReducer, useState } from 'react';

import { CenterScrollSwiper } from '@/entities/scroll';
import { useLocation } from '@/pages/rental/map/hooks/useLocationHooks';
import {
  initialSelectedStoreState,
  selectedStoreReducer,
} from '@/pages/rental/map/model/selectedStoreReducer';
import { useFetchStoreListHooks } from '@/pages/rental/map/model/useFetchStoreListHooks';
import DeviceCard from '@/pages/rental/map/ui/DeviceCard';
import { DrawerSection } from '@/pages/rental/map/ui/DrawerSection';
import { LocationDisplay } from '@/pages/rental/map/ui/LocationDisplay';
import { MapSection } from '@/pages/rental/map/ui/MapSection';
import RentalFilterContent from '@/pages/rental/map/ui/RentalFilterContent';
import { SearchPosHeader } from '@/pages/rental/map/ui/SearchPosHeader';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import type { StoreDetail, StoreDevice } from '@/pages/rental/map/lib/types';

const RentalPage = () => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedStore, dispatchSelectedStore] = useReducer(
    selectedStoreReducer,
    initialSelectedStoreState,
  );

  // 위치 관련 훅 사용
  const {
    userLocation,
    userAddress,
    isLoading: locationLoading,
    error: locationError,
  } = useLocation();

  // useFetchStoreListHooks로 스토어 리스트 관리
  const { stores } = useFetchStoreListHooks(
    userLocation
      ? {
          centerLat: userLocation.lat,
          centerLng: userLocation.lng,
          page: 0,
          size: 10,
          sort: ['distance,asc'],
        }
      : {
          centerLat: 37.5665,
          centerLng: 126.978,
          page: 0,
          size: 10,
          sort: ['distance,asc'],
        },
    [userLocation],
  );

  return (
    <BaseLayout
      centered
      paddingX={false}
      showHeader
      showBottomNav
      header={
        <div className="max-w-[428px] px-4 pt-4 z-30">
          <div className="flex flex-row items-center gap-1">
            <SearchPosHeader search="" setSearch={() => {}} onSubmit={() => {}} />
            <FilterIcon
              alt="필터 아이콘"
              className="w-8 h-8 flex-shrink-0 cursor-pointer"
              onClick={() => setFilterDrawerOpen(true)}
            />
          </div>
        </div>
      }
    >
      <LocationDisplay
        userAddress={userAddress}
        isLoading={locationLoading}
        error={locationError}
      />

      <div className="w-full h-[calc(100vh-190px)]">
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
      </div>
      <DrawerSection
        open={true}
        storeList={stores.map((store) => ({
          id: store.id,
          store,
          storeDetail: {
            storeName: store.name,
            storeId: store.id,
            imageUrl: '',
            detailAddress: '',
            phoneNumber: '',
            distanceFromMe: 0,
            reviewRating: 0,
            isOpening: false,
            startTime: '',
            endTime: '',
          },
          deviceCount: 0,
        }))}
      />
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
