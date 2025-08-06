'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CenterScrollSwiper } from '@/entities/scroll';
import { useDrawerState } from '@/features/rental/map/hooks/useDrawerStaterHooks';
import { useFilterState } from '@/features/rental/map/hooks/useFilterStaterHooks';
import { useSelectedStore } from '@/features/rental/map/hooks/useSelectedStoreHooks';
import {
  convertToStoreCardProps,
  useStoreListWithInfiniteScroll,
} from '@/features/rental/map/hooks/useStoreListHooks';
import { useUrlParams } from '@/features/rental/map/hooks/useUrlParamsrHooks';
import { useUserLocation } from '@/features/rental/map/hooks/useUserLocationrHooks';
import { getClusterClickActive } from '@/features/rental/map/lib/clusterMarker';
import { createPlaceMarker } from '@/features/rental/map/lib/placeMarker';
import { filterDevices } from '@/features/rental/map/model/filtereDevices';
import { CurrentLocationButton } from '@/features/rental/map/ui/CurrentLocationButton';
import DeviceCard from '@/features/rental/map/ui/DeviceCard';
import { DrawerSection } from '@/features/rental/map/ui/DrawerSection';
import { ListViewButton } from '@/features/rental/map/ui/ListViewButton';
import { LocationDisplay } from '@/features/rental/map/ui/LocationDisplay';
import { MapSection } from '@/features/rental/map/ui/MapSection';
import RentalFilterContent from '@/features/rental/map/ui/RentalFilterContent';
import { RentalSortFilter } from '@/features/rental/map/ui/RentalSortFilter';
import { SearchPosHeader } from '@/features/rental/map/ui/SearchPosHeader';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';

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

  // URL 파라미터가 있으면 저장
  useEffect(() => {
    if (selectedLat && selectedLng && selectedPlaceName && !hasProcessedUrlParams) {
      setSavedUrlParams({
        lat: selectedLat,
        lng: selectedLng,
        placeName: selectedPlaceName,
      });
    }
  }, [selectedLat, selectedLng, selectedPlaceName, hasProcessedUrlParams]);

  const { userLocation, setUserLocation, userAddress, locationLoading, locationError } =
    useUserLocation();

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
  // 확장된 마커들의 ID를 Set으로 관리
  const [expandedMarkers, setExpandedMarkers] = useState<Set<number>>(() => {
    // 초기화 시 localStorage에서 복원
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

  // 장소 마커 상태 관리
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
      if (devices.length > 0 && storeId) {
        // useSelectedStore의 handleStoreMarkerClick 호출하여 selectedStoreId 설정
        handleStoreMarkerClick(devices, storeDetail, storeId);

        // 마커 확장/축소 토글
        const newExpanded = new Set(expandedMarkers);
        if (newExpanded.has(storeId)) {
          newExpanded.delete(storeId); // 이미 확장된 상태면 축소
        } else {
          // 다른 모든 마커는 축소하고 현재 마커만 확장 (single selection)
          newExpanded.clear();
          newExpanded.add(storeId);
        }
        setExpandedMarkers(newExpanded);

        // 마커 캐시에서 선택 상태 업데이트
        if (mapInstance) {
          try {
            const { markerCaches } = await import('@/features/rental/map/lib/markerCache');
            const cache = markerCaches.get(mapInstance);
            if (cache) {
              // 모든 마커를 먼저 비선택 상태로 변경
              cache.clearAllSelections();

              // 새로 선택된 마커만 선택 상태로 변경
              if (newExpanded.has(storeId)) {
                cache.updateMarkerSelection(storeId, true);
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
            // 마커는 useCurrentLocationMarker 훅에서 관리하므로 여기서는 생성하지 않음
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
            // 마커는 useCurrentLocationMarker 훅에서 관리하므로 여기서는 생성하지 않음
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
  const handleMapClickWrapper = useCallback(
    async (event?: MouseEvent) => {
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
              if (
                markerData.isSelected &&
                markerData.marker instanceof window.kakao.maps.CustomOverlay
              ) {
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
    (map: kakao.maps.Map) => {
      setMapInstance(map);

      // 디바운싱된 로그 출력
      const timeoutId = setTimeout(() => {
        console.log('📍 handleMapReady 호출:', {
          selectedLat,
          selectedLng,
          selectedPlaceName,
          hasProcessedUrlParams,
          savedUrlParams,
          placeMarkerProcessed: placeMarkerProcessedRef.current,
        });
      }, 100);

      // 이미 처리된 경우 무시
      if (placeMarkerProcessedRef.current) {
        console.log('📍 이미 처리된 상태, 무시');
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
        console.log('📍 장소 마커 생성 조건 만족');

        // 👉 클러스터 클릭 플래그가 true면 장소 마커는 생성하되 카메라 이동은 하지 않음
        const isClusterClick = getClusterClickActive();
        if (!isClusterClick) {
          const lat = parseFloat(paramsToUse.lat);
          const lng = parseFloat(paramsToUse.lng);

          if (!isNaN(lat) && !isNaN(lng)) {
            const newPosition = new window.kakao.maps.LatLng(lat, lng);

            // ✅ 검색 위치로 카메라 이동 (단, 클러스터 클릭이 아닐 경우에만)
            map.setCenter(newPosition);
            map.setLevel(4);

            const newPlaceMarker = createPlaceMarker(
              map,
              newPosition,
              paramsToUse.placeName,
              () => {
                console.log('📍 장소 마커 클릭:', paramsToUse.placeName);
              },
            );

            console.log('📍 RentalPage에서 장소 마커 생성 완료:', paramsToUse.placeName);
            setPlaceMarker(newPlaceMarker);
          }
        } else {
          console.log('📍 클러스터 클릭 중이므로 장소 카메라 이동 생략');
        }

        setHasProcessedUrlParams(true); // 장소 마커 처리 완료
        placeMarkerProcessedRef.current = true;
      } else {
        console.log('📍 장소 마커 생성 조건 불만족:', {
          hasSelectedLat: !!paramsToUse.lat,
          hasSelectedLng: !!paramsToUse.lng,
          hasSelectedPlaceName: !!paramsToUse.placeName,
        });
        // 조건이 불만족해도 처리 완료 표시
        placeMarkerProcessedRef.current = true;
      }

      return () => clearTimeout(timeoutId);
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

  // hasUrlParamsValue를 useMemo로 최적화 (디바운싱 추가)
  const hasUrlParamsValue = useMemo(() => {
    const value = !!(selectedLat && selectedLng && !hasProcessedUrlParams);
    return value;
  }, [selectedLat, selectedLng, hasProcessedUrlParams]);

  // 디바운싱된 로그 출력 (개발 환경에서만)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timeoutId = setTimeout(() => {
        console.log('📍 RentalPage hasUrlParams 계산:', {
          selectedLat,
          selectedLng,
          hasProcessedUrlParams,
          hasUrlParamsValue,
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedLat, selectedLng, hasProcessedUrlParams, hasUrlParamsValue]);

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
        )
      }
      headerfab={
        <div className="flex items-center justify-between w-full px-4 relative z-50 gap-4">
          <CurrentLocationButton className="cursor-pointer" onClick={handleCurrentLocation} />
          <ListViewButton className="cursor-pointer" onClick={() => handleListView()} />
        </div>
      }
    >
      <LocationDisplay
        userAddress={userAddress}
        isLoading={locationLoading || urlParamsLoading}
        error={locationError}
      />
      <div className="w-full h-[calc(100vh-190px)]">
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
      <RentalSortFilter
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
            {(device: StoreDevice) => (
              <DeviceCard
                device={device}
                storeId={selectedStoreId ?? undefined}
                dateRange={filterState.dateRange}
              />
            )}
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
            {(device: StoreDevice) => (
              <DeviceCard
                device={device}
                storeId={selectedStoreId ?? undefined}
                dateRange={filterState.dateRange}
              />
            )}
          </CenterScrollSwiper>
        </div>
      )}
    </BaseLayout>
  );
}
