'use client';

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDrawerState } from '@/features/rental/map/hooks/useDrawerStaterHooks';
import { useFilterState } from '@/features/rental/map/hooks/useFilterStaterHooks';
import { useSelectedStore } from '@/features/rental/map/hooks/useSelectedStoreHooks';
import {
  convertToStoreCardProps,
  useStoreListWithInfiniteScroll,
} from '@/features/rental/map/hooks/useStoreListHooks';
import { useUrlParams } from '@/features/rental/map/hooks/useUrlParamsrHooks';
import { useUserLocation } from '@/features/rental/map/hooks/useUserLocationrHooks';
import { useZoom } from '@/features/rental/map/hooks/useZoomHooks';
import { getClusterClickActive } from '@/features/rental/map/lib/clusterMarker';
import { createPlaceMarker } from '@/features/rental/map/lib/placeMarker';
import { filterDevices } from '@/features/rental/map/model/filtereDevices';
import { CurrentLocationButton } from '@/features/rental/map/ui/CurrentLocationButton';
import { ListViewButton } from '@/features/rental/map/ui/ListViewButton';
import { LocationDisplay } from '@/features/rental/map/ui/LocationDisplay';
import RentalFilterContent from '@/features/rental/map/ui/RentalFilterContent';
import { SearchPosHeader } from '@/features/rental/map/ui/SearchPosHeader';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';
import { ZoomButton } from '@/widgets/zoom-button';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';

// Lazy loaded components for performance optimization
const MapSection = lazy(() =>
  import('@/features/rental/map/ui/MapSection').then((module) => ({ default: module.MapSection })),
);
const DrawerSection = lazy(() =>
  import('@/features/rental/map/ui/DrawerSection').then((module) => ({
    default: module.DrawerSection,
  })),
);
const RentalSortFilter = lazy(() =>
  import('@/features/rental/map/ui/RentalSortFilter').then((module) => ({
    default: module.RentalSortFilter,
  })),
);
const DeviceCard = lazy(() =>
  import('@/features/rental/map/ui/DeviceCard').then((module) => ({ default: module.default })),
);
const CenterScrollSwiper = lazy(() =>
  import('@/entities/scroll').then((module) => ({ default: module.CenterScrollSwiper })),
);

// Loading fallback components
const MapLoadingFallback = () => (
  <div className="w-full h-[calc(100vh-190px)] bg-gray-100 flex items-center justify-center">
    <div className="text-gray-500">지도 로딩 중...</div>
  </div>
);

const DrawerLoadingFallback = () => null; // Drawer는 필요할 때만 표시되므로 빈 fallback

const FilterLoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="text-gray-500">필터 로딩 중...</div>
  </div>
);

export default function RentalPage() {
  const {
    selectedLat,
    selectedLng,
    selectedPlaceName,
    hasProcessedUrlParams,
    setHasProcessedUrlParams,
    clearUrlParams,
    isLoading: urlParamsLoading,
  } = useUrlParams();

  // URL 파라미터 값을 별도로 저장 (헤더용)
  const [savedUrlParamsForHeader, setSavedUrlParamsForHeader] = useState<{
    lat: string | null;
    lng: string | null;
    placeName: string | null;
  } | null>(null);

  // URL 파라미터가 있는지 확인 (로딩 중이 아닐 때만)
  const hasUrlParams =
    !urlParamsLoading &&
    (!!(selectedLat && selectedLng && selectedPlaceName) ||
      !!(
        savedUrlParamsForHeader?.lat &&
        savedUrlParamsForHeader?.lng &&
        savedUrlParamsForHeader?.placeName
      ));

  // URL 파라미터 값을 저장 (헤더용)
  useEffect(() => {
    if (selectedLat && selectedLng && selectedPlaceName && !hasProcessedUrlParams) {
      setSavedUrlParamsForHeader({
        lat: selectedLat,
        lng: selectedLng,
        placeName: selectedPlaceName,
      });
    }
  }, [selectedLat, selectedLng, selectedPlaceName, hasProcessedUrlParams]);

  // URL 파라미터 값을 저장 (마커용)
  const [savedUrlParams, setSavedUrlParams] = useState<{
    lat: string | null;
    lng: string | null;
    placeName: string | null;
  } | null>(null);

  // 장소 마커 처리 상태 추적
  const placeMarkerProcessedRef = useRef(false);
  // 검색 위치로 카메라 이동 처리 상태 추적
  const cameraMoveProcessedRef = useRef(false);

  // URL 파라미터가 있으면 저장
  useEffect(() => {
    if (selectedLat && selectedLng && selectedPlaceName && !hasProcessedUrlParams) {
      setSavedUrlParams({
        lat: selectedLat,
        lng: selectedLng,
        placeName: selectedPlaceName,
      });
      // 새로운 검색 위치가 있으면 카메라 이동 상태 초기화
      cameraMoveProcessedRef.current = false;
    }
  }, [selectedLat, selectedLng, selectedPlaceName, hasProcessedUrlParams]);

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

  // Lazy load heavy hooks only when needed
  const { userLocation, userAddress, locationLoading, locationError, moveToUserLocation } =
    useUserLocation({ mapInstance });

  // 줌 기능 훅 사용
  const { handleZoomIn, handleZoomOut } = useZoom({ mapInstance });
  const [expandedMarkers, setExpandedMarkers] = useState<Set<number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('expanded-markers');
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch (error) {
          console.error('확장된 마커 상태 복원 실패:', error);
        }
      }
    }
    return new Set();
  });
  const [placeMarker, setPlaceMarker] = useState<kakao.maps.CustomOverlay | null>(null);
  const {
    selectedStore,
    selectedStoreId,
    handleStoreMarkerClick,
    handleMapClick,
    dispatchSelectedStore,
  } = useSelectedStore(mapInstance);

  // 마커 클릭 핸들러 수정 - 하단 스와이퍼로 표시 및 확장 상태 관리
  const handleMarkerClick = useCallback(
    async (devices: StoreDevice[], storeDetail?: StoreDetail, storeId?: number) => {
      console.log('🎯 마커 클릭 핸들러 시작:', { storeId, devicesLength: devices.length });

      // 디버깅: 마커 클릭 로그
      console.log('🎯 마커 클릭 핸들러 호출:', {
        storeId,
        devicesLength: devices.length,
        storeDetail: !!storeDetail,
        devices: devices.map((d) => ({
          storeDeviceId: d.storeDeviceId,
          deviceName: d.deviceName,
          dataCapacity: d.dataCapacity,
          price: d.price,
        })),
      });

      // 디바이스가 없어도 storeId가 있으면 처리 (마커 유지 및 DeviceCard 표시)
      if (storeId) {
        console.log('🎯 handleStoreMarkerClick 호출 전:', {
          storeId,
          devicesLength: devices.length,
        });
        handleStoreMarkerClick(devices, storeDetail, storeId);
        console.log('🎯 handleStoreMarkerClick 호출 후');

        // 확장 상태 업데이트 (안정성 개선)
        const newExpanded = new Set(expandedMarkers);
        const isCurrentlyExpanded = newExpanded.has(storeId);

        if (isCurrentlyExpanded) {
          // 이미 확장된 상태면 축소
          newExpanded.delete(storeId);
          console.log('🎯 마커 축소:', storeId);
        } else {
          // 확장되지 않은 상태면 확장 (다른 마커는 모두 축소)
          newExpanded.clear();
          newExpanded.add(storeId);
          console.log('🎯 마커 확장:', storeId);
        }

        // 상태 업데이트를 즉시 수행
        setExpandedMarkers(newExpanded);

        // localStorage에도 즉시 저장
        if (typeof window !== 'undefined') {
          localStorage.setItem('expanded-markers', JSON.stringify(Array.from(newExpanded)));
        }

        if (mapInstance && storeId) {
          try {
            const { markerCaches } = await import('@/features/rental/map/lib/markerCache');
            const cache = markerCaches.get(mapInstance);
            const markerData = cache?.getMarkerData(storeId);
            if (markerData?.marker) {
              const markerPosition = markerData.marker.getPosition();
              const mapBounds = mapInstance.getBounds();
              const ne = mapBounds.getNorthEast();
              const sw = mapBounds.getSouthWest();
              const latRange = ne.getLat() - sw.getLat();
              const offsetLat = markerPosition.getLat() - latRange * 0.2;
              const adjustedPosition = new window.kakao.maps.LatLng(
                offsetLat,
                markerPosition.getLng(),
              );
              mapInstance.panTo(adjustedPosition);
            }
          } catch (error) {
            console.error('마커 좌표 가져오기 실패:', error);
          }
        }

        // 선택 상태 마커 스타일 업데이트 (깜빡임 방지)
        if (mapInstance) {
          try {
            const { markerCaches } = await import('@/features/rental/map/lib/markerCache');
            const cache = markerCaches.get(mapInstance);
            if (cache) {
              console.log('🎯 마커 선택 상태 업데이트:', {
                storeId,
                newExpanded: Array.from(newExpanded),
              });

              // 모든 마커의 선택 상태를 먼저 해제
              cache.clearAllSelections();

              // 새로 선택된 마커만 선택 상태로 변경
              if (newExpanded.has(storeId)) {
                cache.updateMarkerSelection(storeId, true);
                console.log('🎯 마커 선택 상태 설정 완료:', storeId);
              }
            }
          } catch (error) {
            console.error('마커 선택 업데이트 실패:', error);
          }
        }
      }
    },
    [handleStoreMarkerClick, mapInstance, expandedMarkers],
  );

  // URL 파라미터 처리 완료 표시 (장소 마커 생성 후에만)
  useEffect(() => {
    if (selectedLat && selectedLng && hasProcessedUrlParams) {
      clearUrlParams();
    }
  }, [selectedLat, selectedLng, hasProcessedUrlParams, clearUrlParams]);

  // 확장된 마커 상태를 localStorage에 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('expanded-markers', JSON.stringify(Array.from(expandedMarkers)));
    }
  }, [expandedMarkers]);

  // 현재 위치로 이동하는 함수
  const handleCurrentLocation = useCallback(() => {
    moveToUserLocation();
  }, [moveToUserLocation]);

  // 지도 클릭 핸들러
  const handleMapClickWrapper = useCallback(
    async (event?: MouseEvent) => {
      console.log('📍 지도 클릭 이벤트:', {
        hasEvent: !!event,
        target: event?.target,
        targetClass: (event?.target as Element)?.className,
      });

      // 마커 클릭으로 인한 지도 클릭인지 확인
      if (
        event &&
        event.target &&
        ((event.target as Element).closest('.droplet-marker') ||
          (event.target as Element).closest('.cluster-marker') ||
          (event.target as Element).closest('.kakao-maps-customoverlay'))
      ) {
        console.log('📍 마커 클릭으로 인한 지도 클릭 무시');
        return;
      }

      console.log('📍 지도 클릭됨');

      // 장소 마커 제거
      if (placeMarker) {
        placeMarker.setMap(null);
        setPlaceMarker(null);
      }

      // 장소 마커 처리 상태 리셋
      placeMarkerProcessedRef.current = false;

      // 모든 마커 축소
      setExpandedMarkers(new Set());

      // 마커 캐시에서 모든 선택 상태 해제
      if (mapInstance) {
        try {
          const { markerCaches } = await import('@/features/rental/map/lib/markerCache');
          const cache = markerCaches.get(mapInstance);
          if (cache) {
            // 모든 마커의 선택 상태 해제
            cache.markers.forEach((markerData) => {
              if (markerData.marker instanceof window.kakao.maps.CustomOverlay) {
                cache.updateMarkerSelection(markerData.storeId, false);
              }
            });
          }
        } catch (error) {
          console.error('마커 선택 해제 실패:', error);
        }
      }

      await handleMapClick();
    },
    [handleMapClick, mapInstance, placeMarker],
  );

  // 지도 준비 완료 시 호출되는 콜백 (디바운싱 추가)
  const handleMapReady = useCallback(
    async (map: kakao.maps.Map) => {
      setMapInstance(map);

      // 이미 처리된 경우 무시
      if (placeMarkerProcessedRef.current) {
        return;
      }

      // 기존 장소 마커 제거
      if (placeMarker) {
        placeMarker.setMap(null);
        setPlaceMarker(null);
      }

      // URL 파라미터가 있으면 선택된 위치에 장소 마커 생성
      const paramsToUse = savedUrlParams || {
        lat: selectedLat,
        lng: selectedLng,
        placeName: selectedPlaceName,
      };

      if (paramsToUse.lat && paramsToUse.lng && paramsToUse.placeName) {
        // 👉 클러스터 클릭 플래그가 true면 장소 마커는 생성하되 카메라 이동은 하지 않음
        const isClusterClick = getClusterClickActive();
        if (!isClusterClick && !cameraMoveProcessedRef.current) {
          const lat = parseFloat(paramsToUse.lat);
          const lng = parseFloat(paramsToUse.lng);

          if (!isNaN(lat) && !isNaN(lng)) {
            const newPosition = new window.kakao.maps.LatLng(lat, lng);

            // ✅ 검색 위치로 카메라 이동 (한 번만 실행되도록 처리)
            map.setCenter(newPosition);
            map.setLevel(4);
            cameraMoveProcessedRef.current = true;

            const newPlaceMarker = createPlaceMarker(
              map,
              newPosition,
              paramsToUse.placeName,
              () => {},
            );

            setPlaceMarker(newPlaceMarker);
          }
        } else {
          // 클러스터 클릭 중에도 장소 마커는 생성
          const lat = parseFloat(paramsToUse.lat);
          const lng = parseFloat(paramsToUse.lng);

          if (!isNaN(lat) && !isNaN(lng)) {
            const newPosition = new window.kakao.maps.LatLng(lat, lng);

            const newPlaceMarker = createPlaceMarker(
              map,
              newPosition,
              paramsToUse.placeName,
              () => {},
            );

            setPlaceMarker(newPlaceMarker);
          }
        }

        setHasProcessedUrlParams(true); // 장소 마커 처리 완료
        placeMarkerProcessedRef.current = true;
      } else {
        // 조건이 불만족해도 처리 완료 표시
        placeMarkerProcessedRef.current = true;
      }
    },
    [savedUrlParams, setHasProcessedUrlParams],
  );

  // 메모이제이션된 스토어 리스트 props
  const storeListProps = useMemo(
    () => ({
      centerLat: (() => {
        // 검색 위치가 있으면 검색 위치, 없으면 사용자 위치
        if (selectedLat && selectedLng && !hasProcessedUrlParams) {
          return parseFloat(selectedLat);
        }
        return userLocation.lat ?? 0;
      })(),
      centerLng: (() => {
        // 검색 위치가 있으면 검색 위치, 없으면 사용자 위치
        if (selectedLat && selectedLng && !hasProcessedUrlParams) {
          return parseFloat(selectedLng);
        }
        return userLocation.lng ?? 0;
      })(),
      sort: [currentSort],
      enabled:
        // 목록보기가 열려있거나, 사용자 위치가 유효한 경우에만 활성화
        isDrawerOpen ||
        (userLocation.lat !== null &&
          userLocation.lng !== null &&
          userLocation.lat !== 0 &&
          userLocation.lng !== 0),
      reviewRating: filterState.star > 0 ? filterState.star : undefined,
      minPrice: filterState.minPrice && filterState.minPrice > 0 ? filterState.minPrice : undefined,
      maxPrice: filterState.maxPrice && filterState.maxPrice > 0 ? filterState.maxPrice : undefined,
      dataCapacity: (() => {
        if (!filterState.dataAmount) return undefined;
        switch (filterState.dataAmount) {
          case '5GB':
            return 5;
          case '10GB':
            return 10;
          case '20GB':
            return 20;
          case '무제한':
            return 999;
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
        ? filterState.maxSupportConnection
        : undefined,
    }),
    [
      selectedLat,
      selectedLng,
      hasProcessedUrlParams,
      userLocation.lat,
      userLocation.lng,
      currentSort,
      filterState.star,
      filterState.minPrice,
      filterState.maxPrice,
      filterState.dataAmount,
      filterState.dataType,
      filterState.maxSupportConnection,
      isDrawerOpen,
    ],
  );

  // 스토어 리스트 훅
  const {
    stores,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
    refetch,
  } = useStoreListWithInfiniteScroll(storeListProps);

  // 목록보기가 열릴 때 데이터 새로고침
  useEffect(() => {
    if (isDrawerOpen && stores.length === 0) {
      refetch();
    }
  }, [isDrawerOpen, stores.length, refetch]);

  // 메모이제이션된 데이터
  const storeList = useMemo(() => convertToStoreCardProps(stores), [stores]);

  const filteredDevicesList = useMemo(
    () => filterDevices(selectedStore.selectedDevices, filterState),
    [selectedStore.selectedDevices, filterState],
  );

  // 필터링된 디바이스 업데이트 - 필터링된 결과가 없어도 원본 디바이스 유지
  useEffect(() => {
    if (!selectedStore.selectedDevices.length) return;

    // 필터링된 결과가 있으면 필터링된 결과 사용, 없으면 원본 디바이스 유지
    if (filteredDevicesList.length > 0) {
      dispatchSelectedStore({
        type: 'UPDATE_FILTERED_DEVICES',
        filteredDevices: filteredDevicesList,
      });
    } else {
      // 필터링된 결과가 없으면 원본 디바이스로 복원
      dispatchSelectedStore({
        type: 'UPDATE_FILTERED_DEVICES',
        filteredDevices: selectedStore.originalDevices,
      });
    }
  }, [
    filterState,
    filteredDevicesList,
    selectedStore.selectedDevices.length,
    selectedStore.originalDevices,
    dispatchSelectedStore,
  ]);

  // hasUrlParamsValue를 useMemo로 최적화 (디바운싱 추가)
  const hasUrlParamsValue = useMemo(() => {
    const value = !!(selectedLat && selectedLng && !hasProcessedUrlParams);
    return value;
  }, [selectedLat, selectedLng, hasProcessedUrlParams]);

  return (
    <BaseLayout
      centered
      paddingX={false}
      showHeader
      showBottomNav
      header={
        hasUrlParams ? (
          // URL 파라미터가 있을 때 Header_Detail 사용
          <Header_Detail
            title={savedUrlParamsForHeader?.placeName || selectedPlaceName || '검색 위치'}
          />
        ) : (
          // URL 파라미터가 없을 때 기존 헤더 사용
          <div className="max-w-[428px] px-4 pt-4 z-30">
            <div className="flex flex-row items-center gap-4">
              <div className="flex-1 min-w-0 max-w-[calc(100%)]">
                <SearchPosHeader search="" setSearch={() => {}} onSubmit={() => {}} />
              </div>
            </div>
          </div>
        )
      }
      headerfab={
        <div className="flex items-center justify-between w-full px-4 relative z-50 gap-4">
          <CurrentLocationButton className="cursor-pointer" onClick={handleCurrentLocation} />
          <ListViewButton className="cursor-pointer" onClick={() => handleListView()} />
        </div>
      }
      headerZoom={<ZoomButton onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />}
    >
      <div className="flex items-center justify-between w-full px-4">
        <LocationDisplay
          userAddress={userAddress}
          isLoading={locationLoading || urlParamsLoading}
          error={locationError}
        />
        <FilterIcon
          alt="필터 아이콘"
          className="w-8 h-8 flex-shrink-0 cursor-pointer"
          onClick={() => setFilterDrawerOpen(true)}
        />
      </div>
      <div className="w-full h-[calc(100vh-190px)]">
        <Suspense fallback={<MapLoadingFallback />}>
          <MapSection
            filterState={filterState}
            initialLat={selectedLat ? parseFloat(selectedLat) : undefined}
            initialLng={selectedLng ? parseFloat(selectedLng) : undefined}
            onStoreMarkerClick={handleMarkerClick}
            onMapClick={handleMapClickWrapper}
            onMapReady={handleMapReady}
            hasUrlParams={hasUrlParamsValue}
            selectedStoreId={selectedStoreId}
            userLat={userLocation.lat ?? undefined}
            userLng={userLocation.lng ?? undefined}
            expandedMarkers={expandedMarkers}
          />
        </Suspense>
      </div>
      <Suspense fallback={<DrawerLoadingFallback />}>
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
      </Suspense>
      <Suspense fallback={<FilterLoadingFallback />}>
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
      </Suspense>
      <Suspense fallback={<FilterLoadingFallback />}>
        <RentalSortFilter
          isOpen={isSortDrawerOpen}
          onClose={() => setIsSortDrawerOpen(false)}
          onSortSelect={handleSortSelect}
          currentSort={currentSort}
        />
      </Suspense>
      {/* 필터링된 결과가 있으면 필터링된 디바이스 표시, 없으면 원본 디바이스 표시 */}
      {(filteredDevicesList.length > 0 || selectedStore.selectedDevices.length > 0) && (
        <div className="absolute bottom-20 left-0 w-full flex justify-center z-20">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-4">디바이스 로딩 중...</div>
            }
          >
            <CenterScrollSwiper
              key={(filteredDevicesList.length > 0
                ? filteredDevicesList
                : selectedStore.selectedDevices
              )
                .map((d: StoreDevice) => d.storeDeviceId)
                .join('-')}
              items={
                filteredDevicesList.length > 0 ? filteredDevicesList : selectedStore.selectedDevices
              }
            >
              {(device: unknown) => (
                <DeviceCard
                  device={device as StoreDevice}
                  storeId={selectedStoreId ?? undefined}
                  dateRange={filterState.dateRange}
                />
              )}
            </CenterScrollSwiper>
          </Suspense>
        </div>
      )}
    </BaseLayout>
  );
}
