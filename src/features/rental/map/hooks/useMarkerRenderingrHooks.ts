import { useCallback, useEffect, useMemo, useRef } from 'react';

import { debouncedRenderMarkers } from '@/features/rental/map/lib/renderStoreMarkers';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

// 마커 렌더링 관리를 위한 커스텀 훅
export const useMarkerRendering = (
  map: kakao.maps.Map | null,
  stores: Store[],
  filterState: RentalFilterState,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
  selectedStoreId?: number | null,
) => {
  const lastStoresRef = useRef<Store[]>([]);
  const lastFilterStateRef = useRef<RentalFilterState>(filterState);
  const isMapReadyRef = useRef(false);

  const renderMarkers = useCallback(async () => {
    if (!map) {
      return;
    }
    debouncedRenderMarkers(map, stores, filterState, onStoreMarkerClick, selectedStoreId);
  }, [map, stores, filterState, onStoreMarkerClick, selectedStoreId]);

  // stores나 filterState가 변경되었을 때만 마커 렌더링
  const shouldRenderMarkers = useMemo(() => {
    const storesChanged = JSON.stringify(stores) !== JSON.stringify(lastStoresRef.current);
    const filterChanged =
      JSON.stringify(filterState) !== JSON.stringify(lastFilterStateRef.current);

    // 맵이 준비되지 않았으면 렌더링하지 않음
    if (!isMapReadyRef.current) {
      return false;
    }

    if (storesChanged || filterChanged) {
      lastStoresRef.current = stores;
      lastFilterStateRef.current = filterState;
      return true;
    }
    return false;
  }, [stores, filterState]);

  // 마커 렌더링 효과
  useEffect(() => {
    if (shouldRenderMarkers) {
      renderMarkers();
    }
  }, [shouldRenderMarkers, renderMarkers]);

  return { isMapReadyRef };
};
