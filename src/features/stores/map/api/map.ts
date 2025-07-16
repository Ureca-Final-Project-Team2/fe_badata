import type { AxiosResponse } from 'axios';

import { END_POINTS } from '@constants/api';
import {
  FetchStoreDevicesParams,
  FetchStoresParams,
  Store,
  StoreDetail,
  StoreDevice,
} from '@features/stores/map/lib';
import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { ApiResponse } from '@shared/lib/axios/models';
import { buildQueryParams } from '@utils/buildQueryParams';

/**
 * 특정 가맹점(storeId)의 장비 목록 조회
 */
export const fetchStoreDevices = async (
  storeId: number,
  params: FetchStoreDevicesParams,
): Promise<StoreDevice[]> => {
  const { data } = await axiosInstance.get(END_POINTS.STORES.ALLSTORE(storeId), {
    params,
  });
  return data;
};

/**
 * 전체 가맹점 위치 목록 조회 (조건 필터 포함)
 */
export const fetchStores = async (
  params: FetchStoresParams,
): Promise<Store[]> => {
  const { data } = await axiosInstance.get(END_POINTS.STORES.ALLDEVICE(), {
    params,
  });
  return data;
};

/**
 * 클릭한 가맹점 상세 조회
 */
export const fetchStoreDetail = async (
  storeId: number,
  centerLat: number,
  centerLng: number
): Promise<StoreDetail> => {
  const { data } = await axiosInstance.get(END_POINTS.STORES.STOREDETAIL(storeId), {
    params: {
      centerLat,
      centerLng,
    },
  });
  return data;
};