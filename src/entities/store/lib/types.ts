export interface FetchStoresParams {
  // 지도 영역 좌표
  swLat?: number;
  swLng?: number;
  neLat?: number;
  neLng?: number;

  // 필터 조건
  rentalStartDate?: string;
  rentalEndDate?: string;
  reviewRating?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  dataCapacity?: number;
  is5G?: boolean;
  maxSupportConnection?: number;
}

export interface FetchStoreDevicesParams extends FetchStoresParams {
  isOpeningNow?: boolean;
}
