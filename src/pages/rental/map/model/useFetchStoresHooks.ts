import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchStores } from '@/pages/rental/map/api/apis';

import type { Store } from '@/pages/rental/map/lib/types';
import type { RentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';

export const useFetchStoresHooks = (
  map: kakao.maps.Map | null,
  filterState?: RentalFilterState,
) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBounds, setCurrentBounds] = useState({
    swLat: 33.0,
    swLng: 124.0,
    neLat: 39.0,
    neLng: 132.0,
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 지도 bounds 업데이트 함수 (디바운싱 적용)
  const updateStoresByBounds = useCallback(async () => {
    if (!map) return;

    // 이전 타이머가 있다면 취소
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 300ms 디바운싱
    debounceRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);

        const bounds = map.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

        const newBounds = {
          swLat: swLatLng.getLat(),
          swLng: swLatLng.getLng(),
          neLat: neLatLng.getLat(),
          neLng: neLatLng.getLng(),
        };

        setCurrentBounds(newBounds);

        // 필터 파라미터 가공: API 명세에 맞게 변환 (초기값은 파라미터에 포함하지 않음)
        const mergedParams: Record<string, unknown> = { ...newBounds };
        if (filterState) {
          // 가격
          if (filterState.minPrice !== undefined && filterState.minPrice !== 0) {
            mergedParams.minPrice = filterState.minPrice;
          }
          if (filterState.maxPrice !== undefined && filterState.maxPrice !== 0) {
            mergedParams.maxPrice = filterState.maxPrice;
          }
          // 별점
          if (filterState.star && filterState.star > 0) {
            mergedParams.reviewRating = filterState.star;
          }
          // 일일 데이터 제공량 (dataAmount → dataCapacity: number[])
          if (filterState.dataAmount && filterState.dataAmount !== '무제한') {
            mergedParams.dataCapacity = [parseInt(filterState.dataAmount.replace('GB', ''))];
          } else if (filterState.dataAmount === '무제한') {
            mergedParams.dataCapacity = [99999]; // 백엔드와 협의된 값 사용
          }
          // 데이터 타입 (dataType → is5G)
          if (filterState.dataType === '5G') {
            mergedParams.is5G = true;
          } else if (filterState.dataType === '4G/LTE') {
            mergedParams.is5G = false;
          }
          // 최대 접속 가능 기기 수 (number[])
          if (filterState.maxSupportConnection) {
            mergedParams.maxSupportConnection = filterState.maxSupportConnection;
          }
          // 날짜
          if (filterState.dateRange?.from) {
            mergedParams.rentalStartDate =
              filterState.dateRange.from instanceof Date
                ? filterState.dateRange.from.toISOString()
                : filterState.dateRange.from;
          }
          if (filterState.dateRange?.to) {
            mergedParams.rentalEndDate =
              filterState.dateRange.to instanceof Date
                ? filterState.dateRange.to.toISOString()
                : filterState.dateRange.to;
          }
          // 오픈 여부
          if ('isOpeningNow' in filterState && filterState.isOpeningNow !== undefined) {
            mergedParams.isOpeningNow = filterState.isOpeningNow;
          }
        }
        // 디버깅: 실제 요청 파라미터 확인
        console.log('[fetchStores] mergedParams:', mergedParams);
        const stores = await fetchStores(mergedParams);
        // 디버깅: 응답 데이터 확인
        console.log('[fetchStores] 응답 stores:', stores);
        setStores(stores);

        console.log('현재 카메라 영역의 스토어 조회:', {
          bounds: newBounds,
          storeCount: stores.length,
        });
      } catch (e) {
        // 디버깅: 에러 객체 확인
        console.error('[fetchStores] API 호출 에러:', e);
        console.error('가맹점 불러오기 실패:', e);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [map, filterState]);

  // 초기 로드 및 지도 bounds 변경 감지
  useEffect(() => {
    if (!map) return;

    // 초기 로드
    updateStoresByBounds();

    // 지도 이동/줌 이벤트 리스너 등록
    const boundsChangedListener = () => {
      updateStoresByBounds();
    };

    window.kakao.maps.event.addListener(map, 'bounds_changed', boundsChangedListener);
    window.kakao.maps.event.addListener(map, 'zoom_changed', boundsChangedListener);

    // 클린업
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      window.kakao.maps.event.removeListener(map, 'bounds_changed', boundsChangedListener);
      window.kakao.maps.event.removeListener(map, 'zoom_changed', boundsChangedListener);
    };
  }, [map, updateStoresByBounds]);

  return {
    stores,
    isLoading,
    currentBounds,
    refreshStores: updateStoresByBounds,
  };
};
