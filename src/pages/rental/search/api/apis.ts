import { isLoggedIn } from '@/pages/rental/search/utils/auth/isLoggedIn';
import {
  addLocalAddressHistory,
  deleteLocalAddressHistory,
  getLocalAddressHistoryPaginated,
} from '@/pages/rental/search/utils/localStorage/addressHistory';
import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

// 주소 이력 생성 요청 타입
export interface CreateAddressHistoryRequest {
  detailAddress: string;
  latitude: number;
  longititude: number;
}

// 주소 이력 생성, 삭제 응답 타입
export interface AddressHistoryResponse {
  code: number;
  message: string;
  content: number | null;
}

// 주소 이력 생성 API
export const createAddressHistory = async (
  data: CreateAddressHistoryRequest,
): Promise<AddressHistoryResponse> => {
  if (!isLoggedIn()) {
    // 로그인하지 않은 경우 localStorage 사용
    const addressId = addLocalAddressHistory(data.detailAddress, data.latitude, data.longititude);
    return {
      code: 20000,
      message: 'success',
      content: addressId,
    };
  }

  // 로그인한 경우 서버 API 사용
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
  if (!isLoggedIn()) {
    // 로그인하지 않은 경우 localStorage 사용
    const localData = getLocalAddressHistoryPaginated(page, size, sort);
    return {
      code: 20000,
      message: null,
      getAddressResponses: localData.getAddressResponses,
      hasNext: localData.hasNext,
    };
  }

  // 로그인한 경우 서버 API 사용
  const response: AddressHistoryListResponse = await axiosInstance.get(
    `${END_POINTS.POSITION.POSITION}?page=${page}&size=${size}&sort=${sort}`,
  );
  return response;
};

// 주소 이력 삭제 API
export const deleteAddressHistory = async (addressId: number): Promise<AddressHistoryResponse> => {
  if (!isLoggedIn()) {
    // 로그인하지 않은 경우 localStorage 사용
    const deletedId = deleteLocalAddressHistory(addressId);
    if (deletedId) {
      return {
        code: 20000,
        message: 'success',
        content: deletedId,
      };
    } else {
      return {
        code: 2012,
        message: '주소 정보를 찾을 수 없습니다.',
        content: null,
      };
    }
  }

  // 로그인한 경우 서버 API 사용
  const response: AddressHistoryResponse = await axiosInstance.delete(
    `${END_POINTS.POSITION.DELETE_POSITION(addressId)}`,
  );
  return response;
};
