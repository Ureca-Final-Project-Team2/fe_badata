export interface FetchStoresParams {
  rentalStartDate?: string;
  rentalEndDate?: string;
  reviewRating?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  dataCapacity?: number[];
  is5G?: boolean;
  maxSupportConnection?: number[];
}

export interface FetchStoreDevicesParams extends FetchStoresParams {
  isOpeningNow?: boolean;
}
