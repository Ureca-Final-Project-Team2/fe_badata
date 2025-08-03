'use client';

import { useCurrentLocationMarker } from '@/features/rental/map/hooks/useCurrentLocationMarkerHooks';
import { useFetchStoresHooks } from '@/features/rental/map/hooks/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/features/rental/map/hooks/useKakaoMapHooks';
import { useMapZoomLevel } from '@/features/rental/map/hooks/useMapZoomLevel';
import { useMarkerRendering } from '@/features/rental/map/hooks/useMarkerRenderingrHooks';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

export interface MapSectionProps {
  filterState: RentalFilterState;
  initialLat?: number;
  initialLng?: number;
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void;
  onMapClick?: () => void;
  onMapReady?: (map: kakao.maps.Map) => void;
  hasUrlParams?: boolean;
  selectedStoreId?: number | null;
  userLat?: number;
  userLng?: number;
  expandedMarkers?: Set<number>; // 확장된 마커들의 ID Set
}

export function MapSection({
  filterState,
  initialLat,
  initialLng,
  onStoreMarkerClick,
  onMapClick,
  onMapReady,
  hasUrlParams = false,
  selectedStoreId,
  userLat,
  userLng,
  expandedMarkers,
}: MapSectionProps) {
  const { mapRef, map } = useKakaoMapHooks(initialLat, initialLng, userLat, userLng);
  const { stores } = useFetchStoresHooks(map, filterState);

  // ✅ 줌 레벨 변경 통합 관리 (근본적 해결)
  useMapZoomLevel(map, filterState, onStoreMarkerClick);

  const { isMapReadyRef } = useMarkerRendering(
    map,
    stores,
    filterState,
    onStoreMarkerClick,
    selectedStoreId,
    expandedMarkers,
  );

  useCurrentLocationMarker(
    map,
    hasUrlParams,
    onMapClick,
    onMapReady,
    isMapReadyRef,
    userLat,
    userLng,
  );

  return <div ref={mapRef} className="w-full h-full" />;
}
