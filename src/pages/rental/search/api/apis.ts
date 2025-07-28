import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

// 주소 이력 생성 요청 타입
export interface CreateAddressHistoryRequest {
  detailAddress: string;
  latitude: number;
  longititude: number;
}

// 주소 이력 생성 응답 타입
export interface AddressHistoryResponse {
  code: number;
  message: string;
  content: number;
}

// 주소 이력 생성 API
export const createAddressHistory = async (
  data: CreateAddressHistoryRequest,
): Promise<AddressHistoryResponse> => {
  const response: AddressHistoryResponse = await axiosInstance.post(
    END_POINTS.POSITION.POSITION,
    data,
  );
  return response;
};

// 주소 이력 조회 응답 타입
export interface AddressHistoryItem {
  addressId: number;
  detailAddress: string;
  longititude: number;
  latitude: number;
}

export interface AddressHistoryListResponse {
  code: number;
  message: string | null;
  getAddressResponses: AddressHistoryItem[];
  hasNext: boolean;
}

// 주소 이력 조회 API
export const getAddressHistoryList = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
): Promise<AddressHistoryListResponse> => {
  const response: AddressHistoryListResponse = await axiosInstance.get(
    `${END_POINTS.POSITION.POSITION}?page=${page}&size=${size}&sort=${sort}`,
  );
  return response;
};
