import type { StoreCardProps, StoreListResponse } from '@/features/rental/map/lib/types';

/**
 * API 응답의 StoreResponse를 StoreCardProps로 변환하는 함수
 */
export const transformStoreResponseToStoreCard = (
  storeResponse: StoreListResponse,
): StoreCardProps => {
  return {
    id: storeResponse.id,
    store: {
      id: storeResponse.id,
      name: storeResponse.name,
      latitude: storeResponse.latitude,
      longititude: storeResponse.longititude,
    },
    storeDetail: {
      storeId: storeResponse.id,
      imageUrl: '',
      detailAddress: storeResponse.detailAddress,
      reviewRating: 0,
      endTime: storeResponse.closeTime,
      name: storeResponse.name,
      isOpening: false,
      startTime: '',
    },
    deviceCount: storeResponse.leftDeviceCount,
  };
};

/**
 * StoreResponse 배열을 StoreCardProps 배열로 변환하는 함수
 */
export const transformStoreListResponse = (
  storeResponses: StoreListResponse[],
): StoreCardProps[] => {
  return storeResponses.map(transformStoreResponseToStoreCard);
};
