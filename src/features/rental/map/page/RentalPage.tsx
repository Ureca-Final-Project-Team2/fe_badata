'use client';

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { CenterScrollSwiper } from '@/entities/scroll';
import { useLocation } from '@/features/rental/map/hooks/useLocationHooks';
import {
  convertToStoreCardProps,
  useStoreListWithInfiniteScroll,
} from '@/features/rental/map/hooks/useStoreListHooks';
import { filterDevices } from '@/features/rental/map/model/filtereDevices';
import { initialRentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';
import {
  initialSelectedStoreState,
  selectedStoreReducer,
} from '@/features/rental/map/model/selectedStoreReducer';
import { CurrentLocationButton } from '@/features/rental/map/ui/CurrentLocationButton';
import DeviceCard from '@/features/rental/map/ui/DeviceCard';
import { DrawerSection } from '@/features/rental/map/ui/DrawerSection';
import { ListViewButton } from '@/features/rental/map/ui/ListViewButton';
import { LocationDisplay } from '@/features/rental/map/ui/LocationDisplay';
import { MapSection } from '@/features/rental/map/ui/MapSection';
import RentalFilterContent from '@/features/rental/map/ui/RentalFilterContent';
import { SearchPosHeader } from '@/features/rental/map/ui/SearchPosHeader';
import { SortDrawer } from '@/features/rental/map/ui/SortDrawer';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

export default function RentalPage() {
  const searchParams = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedStore, dispatchSelectedStore] = useReducer(
    selectedStoreReducer,
    initialSelectedStoreState,
  );
  const [filterState, setFilterState] = useState<RentalFilterState>(initialRentalFilterState);
  const [tempFilterState, setTempFilterState] =
    useState<RentalFilterState>(initialRentalFilterState);
  const [userLocation, setUserLocation] = useState({
    lat: null as number | null,
    lng: null as number | null,
  });
  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);

  // URL 파라미터에서 선택된 위치 정보 가져오기
  const selectedLat = searchParams?.get('lat');
  const selectedLng = searchParams?.get('lng');
  const selectedAddress = searchParams?.get('address');
  const selectedPlaceName = searchParams?.get('placeName');

  // 위치 관련 훅 사용
  const {
    userLocation: locationData,
    userAddress,
    isLoading: locationLoading,
    error: locationError,
    refreshLocation,
  } = useLocation();

  // URL 파라미터로부터 선택된 위치 설정
  useEffect(() => {
    if (selectedLat && selectedLng) {
      const lat = parseFloat(selectedLat);
      const lng = parseFloat(selectedLng);

      if (!isNaN(lat) && !isNaN(lng)) {
        setUserLocation({ lat, lng });
      }
    }
  }, [selectedLat, selectedLng]);

  // 사용자 위치 가져오기 (URL 파라미터가 없을 때만)
  useEffect(() => {
    if (!selectedLat && !selectedLng) {
      if (locationData) {
        setUserLocation({
          lat: locationData.lat,
          lng: locationData.lng,
        });
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
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
    }
  }, [locationData, selectedLat, selectedLng]);

  // 현재 위치로 이동하는 함수
  const handleCurrentLocation = useCallback(() => {
    refreshLocation();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);

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
  }, [refreshLocation, mapInstance]);

  // 지도 준비 완료 시 호출되는 콜백
  const handleMapReady = useCallback(
    (map: kakao.maps.Map) => {
      setMapInstance(map);

      // URL 파라미터가 있으면 선택된 위치에 마커 생성
      if (selectedLat && selectedLng) {
        const lat = parseFloat(selectedLat);
        const lng = parseFloat(selectedLng);

        if (!isNaN(lat) && !isNaN(lng)) {
          const newPosition = new window.kakao.maps.LatLng(lat, lng);

          // 선택된 위치 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: newPosition,
            map: map,
          });

          // 인포윈도우 생성
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `
              <div style="padding: 10px; text-align: center; min-width: 150px;">
                <div style="font-weight: bold; margin-bottom: 5px;">${selectedPlaceName || '선택된 위치'}</div>
                <div style="font-size: 12px; color: #666;">${selectedAddress || ''}</div>
              </div>
            `,
          });

          // 마커 클릭 시 인포윈도우 표시
          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });

          // 인포윈도우 자동 표시
          infowindow.open(map, marker);
        }
      }
    },
    [selectedLat, selectedLng, selectedAddress, selectedPlaceName],
  );

  // Drawer 상태 관리
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('distance,asc');

  // 이벤트 핸들러들
  const handleListView = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const handleSortClick = useCallback(() => {
    setIsSortDrawerOpen(true);
  }, []);

  const handleSortSelect = useCallback((sortType: string) => {
    setCurrentSort(sortType);
  }, []);

  // 스토어 리스트 훅
  const { stores, isLoading, isFetchingNextPage, hasNextPage, isError, error, fetchNextPage } =
    useStoreListWithInfiniteScroll({
      centerLat: userLocation.lat ?? 0,
      centerLng: userLocation.lng ?? 0,
      sort: [currentSort],
      enabled:
        userLocation.lat !== null &&
        userLocation.lng !== null &&
        userLocation.lat !== 0 &&
        userLocation.lng !== 0,
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
            return [999];
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

  // 메모이제이션된 데이터
  const storeList = useMemo(() => convertToStoreCardProps(stores), [stores]);

  const filteredDevicesList = useMemo(
    () => filterDevices(selectedStore.selectedDevices, filterState),
    [selectedStore.selectedDevices, filterState],
  );

  // 콜백 함수들
  const handleStoreMarkerClick = useCallback(
    (devices: StoreDevice[], storeDetail?: StoreDetail, storeId?: number) => {
      dispatchSelectedStore({
        type: 'SELECT_STORE',
        devices,
        storeId: storeId ?? 0,
        storeDetail,
      });
    },
    [],
  );

  // 필터링된 디바이스 업데이트
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
  }, [
    filterState,
    filteredDevicesList,
    selectedStore.selectedDevices.length,
    selectedStore.selectedStoreDetail,
    selectedStore.selectedStoreId,
  ]);

  return (
    <BaseLayout
      centered
      paddingX={false}
      showHeader
      showBottomNav
      header={
        <div className="max-w-[428px] px-4 pt-4 z-30">
          <div className="flex flex-row items-center gap-4">
            <div className="flex-1 min-w-0 max-w-[calc(100%-40px)]">
              <SearchPosHeader search="" setSearch={() => {}} onSubmit={() => {}} />
            </div>
            <FilterIcon
              alt="필터 아이콘"
              className="w-8 h-8 flex-shrink-0 cursor-pointer"
              onClick={() => setFilterDrawerOpen(true)}
            />
          </div>
        </div>
      }
      fab={
        <div className="flex items-center justify-between w-full px-4 relative z-50 gap-4">
          <CurrentLocationButton className="cursor-pointer" onClick={handleCurrentLocation} />
          <ListViewButton className="cursor-pointer" onClick={handleListView} />
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
          filterState={filterState}
          initialLat={selectedLat ? parseFloat(selectedLat) : undefined}
          initialLng={selectedLng ? parseFloat(selectedLng) : undefined}
          onStoreMarkerClick={handleStoreMarkerClick}
          onMapReady={handleMapReady}
        />
      </div>
      <DrawerSection
        storeList={storeList}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        isError={isError}
        error={error}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLoadMore={fetchNextPage}
        onSortClick={handleSortClick}
        currentSort={currentSort}
      />
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
            setFilterState(filters);
            setFilterDrawerOpen(false);
          }}
        />
      </FilterDrawer>
      <SortDrawer
        isOpen={isSortDrawerOpen}
        onClose={() => setIsSortDrawerOpen(false)}
        onSortSelect={handleSortSelect}
        currentSort={currentSort}
      />
      {filteredDevicesList.length > 0 && (
        <div className="absolute bottom-20 left-0 w-full flex justify-center z-50">
          <CenterScrollSwiper
            key={filteredDevicesList.map((d: StoreDevice) => d.storeDeviceId).join('-')}
            items={filteredDevicesList}
          >
            {(device: StoreDevice) => <DeviceCard device={device} />}
          </CenterScrollSwiper>
        </div>
      )}
    </BaseLayout>
  );
}
