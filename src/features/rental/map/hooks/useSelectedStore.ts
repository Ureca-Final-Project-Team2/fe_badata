import { useCallback, useReducer, useState } from 'react';

import {
  initialSelectedStoreState,
  selectedStoreReducer,
} from '@/features/rental/map/model/selectedStoreReducer';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';

// 선택된 스토어 관리를 위한 커스텀 훅
export const useSelectedStore = (mapInstance?: kakao.maps.Map | null) => {
  const [selectedStore, dispatchSelectedStore] = useReducer(
    selectedStoreReducer,
    initialSelectedStoreState,
  );
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const savedStoreId = localStorage.getItem('selected-store-id');
      return savedStoreId ? parseInt(savedStoreId, 10) : null;
    }
    return null;
  });

  const handleStoreMarkerClick = useCallback(
    (devices: StoreDevice[], storeDetail?: StoreDetail, storeId?: number) => {
      console.log('useSelectedStore - handleStoreMarkerClick 호출:', {
        storeId,
        devices: devices.length,
      });

      if (storeId) {
        console.log('useSelectedStore - selectedStoreId 설정:', storeId);
        setSelectedStoreId(storeId);
        localStorage.setItem('selected-store-id', storeId.toString());
      }

      dispatchSelectedStore({
        type: 'SELECT_STORE',
        devices,
        storeId: storeId ?? 0,
        storeDetail,
      });
    },
    [],
  );

  const handleMapClick = useCallback(async () => {
    if (selectedStore.selectedDevices.length > 0) {
      const currentSelectedStoreId = selectedStoreId;

      setSelectedStoreId(null);
      localStorage.removeItem('selected-store-id');
      dispatchSelectedStore({
        type: 'SELECT_STORE',
        devices: [],
        storeId: 0,
        storeDetail: undefined,
      });

      // 마커 캐시에서 선택 해제 상태로 업데이트
      if (currentSelectedStoreId && mapInstance) {
        try {
          const { markerCaches } = await import('@/features/rental/map/lib/markerCache');
          const cache = markerCaches.get(mapInstance);
          if (cache) {
            cache.updateMarkerSelection(currentSelectedStoreId, false);
          }
        } catch (error) {
          console.error('마커 선택 해제 실패:', error);
        }
      }
    }
  }, [selectedStore.selectedDevices.length, selectedStoreId, mapInstance]);

  return {
    selectedStore,
    selectedStoreId,
    handleStoreMarkerClick,
    handleMapClick,
    dispatchSelectedStore,
  };
};
