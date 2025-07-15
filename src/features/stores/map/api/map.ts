import { END_POINTS } from '@constants/api';
import {
  FetchStoreDevicesParams,
  FetchStoresParams,
  Store,
  StoreDevice,
} from '@features/stores/map/lib';
import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { ApiResponse } from '@shared/lib/axios/models';
import { buildQueryParams } from '@utils/buildQueryParams';
import type { AxiosResponse } from 'axios';

/**
 * 특정 가맹점(storeId)의 장비 목록 조회
 */
export const fetchStoreDevices = async (
  storeId: number,
  params: FetchStoreDevicesParams,
): Promise<AxiosResponse<ApiResponse<StoreDevice[]>>> => {
  const query = buildQueryParams(params);
  return await axiosInstance.get<ApiResponse<StoreDevice[]>>(
    END_POINTS.STORES.ALLSTORE(storeId, query),
  );
};

/**
 * 전체 가맹점 위치 목록 조회 (조건 필터 포함)
 */
export const fetchStores = async (
  params: FetchStoresParams,
): Promise<AxiosResponse<ApiResponse<Store[]>>> => {
  const query = buildQueryParams(params);
  return await axiosInstance.get<ApiResponse<Store[]>>(END_POINTS.STORES.ALLDEVICE(query));
};
