import { formatDateToLocalDateTime } from '@/shared/lib/formatDate';

import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

interface BoundsType {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

export const mapFilterStateToApiParams = (
  bounds: BoundsType,
  filterState?: RentalFilterState,
  zoomLevel?: number,
): Record<string, unknown> => {
  const mergedParams: Record<string, unknown> = { ...bounds };

  // zoomLevel 추가
  if (zoomLevel !== undefined) {
    mergedParams.zoomLevel = zoomLevel;
  }

  // filterState가 없으면 기본 필터 값들을 추가하지 않음 (초기 로드)
  if (!filterState) {
    return mergedParams;
  }

  // filterState가 있을 때만 필터 조건들 추가
  // 오픈 여부
  if ('isOpeningNow' in filterState && filterState.isOpeningNow !== undefined) {
    mergedParams.isOpeningNow = filterState.isOpeningNow;
  }

  // 가격
  if (
    filterState.minPrice !== undefined &&
    filterState.minPrice !== null &&
    filterState.minPrice > 0
  ) {
    mergedParams.minPrice = filterState.minPrice;
  }
  if (
    filterState.maxPrice !== undefined &&
    filterState.maxPrice !== null &&
    filterState.maxPrice > 0
  ) {
    mergedParams.maxPrice = filterState.maxPrice;
  }
  // 별점
  if (filterState.star && filterState.star > 0) {
    mergedParams.reviewRating = filterState.star;
  }
  // 일일 데이터 제공량 (dataAmount → dataCapacity)
  if (filterState.dataAmount && filterState.dataAmount !== '무제한') {
    mergedParams.dataCapacity = parseInt(filterState.dataAmount.replace('GB', ''));
  } else if (filterState.dataAmount === '무제한') {
    mergedParams.dataCapacity = 999; // 백엔드와 협의된 값 사용
  }
  // 데이터 타입 (dataType → is5G)
  if (filterState.dataType === '5G') {
    mergedParams.is5G = true;
  } else if (filterState.dataType === '4G/LTE') {
    mergedParams.is5G = false;
  }
  // 최대 접속 가능 기기 수 (number)
  if (filterState.maxSupportConnection) {
    mergedParams.maxSupportConnection = filterState.maxSupportConnection;
  }
  // 날짜
  if (filterState.dateRange?.from) {
    mergedParams.rentalStartDate = formatDateToLocalDateTime(filterState.dateRange.from);
  }
  if (filterState.dateRange?.to) {
    mergedParams.rentalEndDate = formatDateToLocalDateTime(filterState.dateRange.to);
  }

  return mergedParams;
};
