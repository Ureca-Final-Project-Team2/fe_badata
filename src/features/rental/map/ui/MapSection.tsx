'use client';

import { useCurrentLocationMarker } from '@/features/rental/map/hooks/useCurrentLocationMarkerHooks';
import { useFetchStoresHooks } from '@/features/rental/map/hooks/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/features/rental/map/hooks/useKakaoMapHooks';
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
}: MapSectionProps) {
  const { mapRef, map } = useKakaoMapHooks(initialLat, initialLng);
  const { stores } = useFetchStoresHooks(map, filterState);

  const { isMapReadyRef } = useMarkerRendering(
    map,
    stores,
    filterState,
    onStoreMarkerClick,
    selectedStoreId,
  );

  useCurrentLocationMarker(map, hasUrlParams, onMapClick, onMapReady, isMapReadyRef);

  return <div ref={mapRef} className="w-full h-full" />;
}
