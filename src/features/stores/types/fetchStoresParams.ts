export interface FetchStoresParams {
  isOpeningNow?: boolean;
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  rentalStartDate?: string;
  rentalEndDate?: string;
  reviewRating?: number;
  minPrice?: number;
  maxPrice?: number;
  dataCapacity?: number[];
  is5G?: boolean;
  maxSupportConnection?: number[];
}
