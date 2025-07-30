import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  FetchStoreDevicesParams,
  FetchStoresParams,
  Store,
  StoreDetail,
  StoreDevice,
  StoreListParams,
  StoreListResponse,
} from '@/features/rental/map/lib/types';

/**
 * 전체 가맹점 위치 목록 조회 (조건 필터 포함)
 */
export const fetchStores = async (params: FetchStoresParams): Promise<Store[]> => {
  try {
    const response = await axiosInstance.get(END_POINTS.STORES.ALLDEVICE(), {
      params,
    });
    // response 자체가 배열인지 확인 (axios interceptor에서 이미 data를 추출)
    const stores = Array.isArray(response) ? response : [];
    return stores;
  } catch (error) {
    console.error('fetchStores API 호출 실패:', error);
    return [];
  }
};

/**
 * 특정 가맹점(storeId)의 장비 목록 조회
 */
export const fetchStoreDevices = async (
  storeId: number,
  params: FetchStoreDevicesParams,
): Promise<StoreDevice[]> => {
  try {
    const response = await axiosInstance.get(END_POINTS.STORES.ALLSTORE(storeId), {
      params,
    });
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error(`스토어 ${storeId} 디바이스 조회 실패:`, error);
    return []; // 에러 발생 시 빈 배열 반환하여 마커는 정상 생성
  }
};

/**
 * 클릭한 가맹점 상세 조회
 */
export const fetchStoreDetail = async (
  storeId: number,
  centerLat: number,
  centerLng: number,
): Promise<StoreDetail> => {
  return await axiosInstance.get(END_POINTS.STORES.STOREDETAIL(storeId), {
    params: {
      centerLat,
      centerLng,
    },
  });
};

/**
 * 가맹점 리스트(무한 스크롤) 조회
 */
export const fetchStoreList = async (params: StoreListParams): Promise<StoreListResponse> => {
  // sort 배열을 문자열로 변환하여 쿼리 파라미터에서 [] 표기 제거
  const { sort, ...otherParams } = params;
  const sortString = Array.isArray(sort) ? sort.join(',') : sort;

  const response: StoreListResponse = await axiosInstance.get(END_POINTS.STORES.STORELIST, {
    params: {
      ...otherParams,
      sort: sortString,
    },
  });
  return response;
};

/**
 * 가맹점 좋아요/좋아요 취소 토글
 */
export const toggleStoreLike = async (storeId: number, isLiked: boolean): Promise<boolean> => {
  try {
    await axiosInstance.post(END_POINTS.STORES.LIKESTORE(storeId));
    return !isLiked; // 토글된 상태 반환
  } catch (error) {
    throw error;
  }
};
