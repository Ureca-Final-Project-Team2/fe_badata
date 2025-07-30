'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { CenterScrollSwiper } from '@/entities/scroll';
import { useDrawerState } from '@/features/rental/map/hooks/useDrawerStaterHooks';
import { useFilterState } from '@/features/rental/map/hooks/useFilterStaterHooks';
import { useSelectedStore } from '@/features/rental/map/hooks/useSelectedStore';
import {
  convertToStoreCardProps,
  useStoreListWithInfiniteScroll,
} from '@/features/rental/map/hooks/useStoreListHooks';
import { useUrlParams } from '@/features/rental/map/hooks/useUrlParamsrHooks';
import { useUserLocation } from '@/features/rental/map/hooks/useUserLocationrHooks';
import { createCurrentLocationMarker } from '@/features/rental/map/lib/currentLocationMarker';
import { filterDevices } from '@/features/rental/map/model/filtereDevices';
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

import type { StoreDevice } from '@/features/rental/map/lib/types';

export default function RentalPage() {
  const {
    selectedLat,
    selectedLng,
    selectedAddress,
    selectedPlaceName,
    hasProcessedUrlParams,
    setHasProcessedUrlParams,
    clearUrlParams,
  } = useUrlParams();

  const { userLocation, setUserLocation, userAddress, locationLoading, locationError } =
    useUserLocation(selectedLat || null, selectedLng || null, hasProcessedUrlParams);

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isSortDrawerOpen,
    setIsSortDrawerOpen,
    currentSort,
    handleListView,
    handleSortClick,
    handleSortSelect,
  } = useDrawerState();

  const {
    filterState,
    tempFilterState,
    setTempFilterState,
    filterDrawerOpen,
    setFilterDrawerOpen,
    handleFilterSubmit,
  } = useFilterState();

  const [mapInstance, setMapInstance] = useState<kakao.maps.Map | null>(null);

  const {
    selectedStore,
    selectedStoreId,
    handleStoreMarkerClick,
    handleMapClick,
    dispatchSelectedStore,
  } = useSelectedStore(mapInstance);

  // URL 파라미터 처리 완료 표시
  useEffect(() => {
    if (selectedLat && selectedLng && !hasProcessedUrlParams) {
      setHasProcessedUrlParams(true);
      clearUrlParams();
    }
  }, [selectedLat, selectedLng, hasProcessedUrlParams, setHasProcessedUrlParams, clearUrlParams]);

  // 현재 위치로 이동하는 함수
  const handleCurrentLocation = useCallback(() => {
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
            createCurrentLocationMarker(mapInstance);
          }
        },
        (error) => {
          console.log('위치 정보를 가져올 수 없습니다:', error.message);
          // fallback: 서울시청 좌표
          const fallbackLocation = {
            lat: 37.5665,
            lng: 126.978,
          };
          setUserLocation(fallbackLocation);

          if (mapInstance) {
            const newPosition = new window.kakao.maps.LatLng(
              fallbackLocation.lat,
              fallbackLocation.lng,
            );
            mapInstance.setCenter(newPosition);
            createCurrentLocationMarker(mapInstance);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5분 캐시 허용
        },
      );
    }
  }, [mapInstance, setUserLocation]);

  // 지도 클릭 핸들러
  const handleMapClickWrapper = useCallback(async () => {
    await handleMapClick();
  }, [handleMapClick]);

  // 지도 준비 완료 시 호출되는 콜백
  const handleMapReady = useCallback(
    (map: kakao.maps.Map) => {
      setMapInstance(map);

      // URL 파라미터가 있으면 선택된 위치에 마커 생성 (일회성)
      if (selectedLat && selectedLng && !hasProcessedUrlParams) {
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
    [selectedLat, selectedLng, selectedAddress, selectedPlaceName, hasProcessedUrlParams],
  );

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
    dispatchSelectedStore,
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
          onMapClick={handleMapClickWrapper}
          onMapReady={handleMapReady}
          hasUrlParams={!!(selectedLat && selectedLng && !hasProcessedUrlParams)}
          selectedStoreId={selectedStoreId}
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
          onSubmit={handleFilterSubmit}
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
      {/* 필터링된 결과가 없지만 선택된 디바이스가 있는 경우 원본 디바이스 표시 */}
      {filteredDevicesList.length === 0 && selectedStore.selectedDevices.length > 0 && (
        <div className="absolute bottom-20 left-0 w-full flex justify-center z-50">
          <CenterScrollSwiper
            key={selectedStore.selectedDevices.map((d: StoreDevice) => d.storeDeviceId).join('-')}
            items={selectedStore.selectedDevices}
          >
            {(device: StoreDevice) => <DeviceCard device={device} />}
          </CenterScrollSwiper>
        </div>
      )}
    </BaseLayout>
  );
}
