'use client';

import { useEffect, useReducer, useState } from 'react';

import { CenterScrollSwiper } from '@/entities/scroll';
import {
  initialSelectedStoreState,
  selectedStoreReducer,
} from '@/pages/rental/map/model/selectedStoreReducer';
import DeviceCard from '@/pages/rental/map/ui/DeviceCard';
import { DrawerSection } from '@/pages/rental/map/ui/DrawerSection';
import { LocationDisplay } from '@/pages/rental/map/ui/LocationDisplay';
import { MapSection } from '@/pages/rental/map/ui/MapSection';
import RentalFilterContent from '@/pages/rental/map/ui/RentalFilterContent';
import { formatDateToLocalDateTime } from '@/shared/lib/formatDate';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import type { StoreDetail, StoreDevice } from '@/pages/rental/map/lib/types';
import {
  useStoreListWithInfiniteScroll,
  convertToStoreCardProps,
} from '../hooks/useStoreListHooks';
import { filterDevices } from '../model/filtereDevices';
import { RentalFilterState, initialRentalFilterState } from '../model/rentalFilterReducer';
import { SearchPosHeader } from '../ui/SearchPosHeader';

const RentalPage = () => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedStore, dispatchSelectedStore] = useReducer(
    selectedStoreReducer,
    initialSelectedStoreState,
  );
  const [filterState, setFilterState] = useState<RentalFilterState>(initialRentalFilterState);
  const [tempFilterState, setTempFilterState] =
    useState<RentalFilterState>(initialRentalFilterState);
  const [userLocation, setUserLocation] = useState({
    lat: 0, // 초기값은 0으로 설정
    lng: 0,
  });
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('위치 정보를 가져올 수 없습니다:', error.message);
          // 기본 위치 사용
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5분
        },
      );
    }
  }, []);

  // 현재 위치로 이동하는 함수
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);

          // 카메라를 현재 위치로 이동
          if (mapInstance) {
            const newPosition = new window.kakao.maps.LatLng(newLocation.lat, newLocation.lng);
            mapInstance.setCenter(newPosition);
          }
        },
        (error) => {
          console.log('위치 정보를 가져올 수 없습니다:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        },
      );
    }
  };

  // DragDrawer 상태 추가
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('distance,asc');

  // 목록보기 버튼 클릭 핸들러
  const handleListView = () => {
    setIsDrawerOpen((prev) => !prev); // Drawer 열림/닫힘 토글
  };

  // 정렬 기준 클릭 핸들러
  const handleSortClick = () => {
    setIsSortDrawerOpen(true);
  };

  // 정렬 기준 선택 핸들러
  const handleSortSelect = (sortType: string) => {
    setCurrentSort(sortType);
  };

  // 스토어 리스트 무한 스크롤 훅 사용
  const { stores, isLoading, isFetchingNextPage, hasNextPage, isError, error, fetchNextPage } =
    useStoreListWithInfiniteScroll({
      centerLat: userLocation.lat,
      centerLng: userLocation.lng,
      sort: [currentSort], // 현재 선택된 정렬 기준 사용
      enabled: userLocation.lat !== 0 && userLocation.lng !== 0, // 위치가 설정된 후에만 API 호출
      // 필터링 조건들 추가 (사용자가 선택한 경우만)
      rentalStartDate: dateRange?.from ? formatDateToLocalDateTime(dateRange.from) : undefined,
      rentalEndDate: dateRange?.to ? formatDateToLocalDateTime(dateRange.to) : undefined,
      reviewRating: filterState.star > 0 ? filterState.star : undefined,
      minPrice: filterState.minPrice && filterState.minPrice > 0 ? filterState.minPrice : undefined,
      maxPrice: filterState.maxPrice && filterState.maxPrice > 0 ? filterState.maxPrice : undefined,
      dataCapacity: (() => {
        if (!filterState.dataAmount) return undefined;
        switch (filterState.dataAmount) {
          case '5GB':
            return [5];
          case '10GB':
            return [10];
          case '20GB':
            return [20];
          case '무제한':
            return [999]; // 무제한은 큰 숫자로 표현
          default:
            return undefined;
        }
      })(),
      is5G:
        filterState.dataType === '5G'
          ? true
          : filterState.dataType === '4G/LTE'
            ? false
            : undefined,
      maxSupportConnection: filterState.maxSupportConnection
        ? [filterState.maxSupportConnection]
        : undefined,
    });

  // API 데이터를 StoreCardProps 형태로 변환
  const storeList = convertToStoreCardProps(stores);
  // 필터링 조건이 바뀔 때마다 현재 선택된 가맹점의 디바이스도 다시 필터링
  const filteredDevicesList = filterDevices(selectedStore.selectedDevices, filterState);

  // 필터 상태가 변경될 때 스토어 리스트 다시 불러오기
  useEffect(() => {
    // useStoreListWithInfiniteScroll의 queryKey가 변경되면 자동으로 다시 불러옴
  }, [filterState, dateRange, userLocation, currentSort]);

  useEffect(() => {
    if (!selectedStore.selectedDevices.length) return;
    if (filteredDevicesList.length === 0) {
      dispatchSelectedStore({
        type: 'SELECT_STORE',
        devices: [],
        storeId: selectedStore.selectedStoreId ?? 0,
        storeDetail: selectedStore.selectedStoreDetail,
      });
    } else if (filteredDevicesList.length !== selectedStore.selectedDevices.length) {
      dispatchSelectedStore({
        type: 'SELECT_STORE',
        devices: filteredDevicesList,
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
            name: store.name,
            liked: false,
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
