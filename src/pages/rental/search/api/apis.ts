import {
  addLocalAddressHistory,
  deleteLocalAddressHistory,
  getLocalAddressHistoryPaginated,
  updateAddressUsageTime as updateLocalAddressUsageTime,
} from '@/pages/rental/search/utils/localStorage/addressHistory';
import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

// 주소 이력 생성 요청 타입
export interface CreateAddressHistoryRequest {
  address_name: string;
  id: string;
  phone: string;
  place_name: string;
  road_address_name: string;
  x: number;
  y: number;
}

// 주소 이력 생성, 삭제 응답 타입
export interface AddressHistoryResponse {
  code: number;
  message: string;
  content: number | null;
}

// 주소 이력 생성 API (서버 또는 로컬 스토리지)
export const createAddressHistory = async (
  data: CreateAddressHistoryRequest,
): Promise<AddressHistoryResponse> => {
  // 로그인 상태 확인 (accessToken이 없으면 로컬 스토리지 사용)
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.log('로그인되지 않은 사용자. 로컬 스토리지에 저장합니다.');

    // 로컬 스토리지에 저장
    const addressId = addLocalAddressHistory(
      data.address_name,
      data.id,
      data.phone,
      data.place_name,
      data.road_address_name,
      data.x,
      data.y,
    );

    if (addressId) {
      return {
        code: 20000,
        message: '주소 이력이 로컬 스토리지에 저장되었습니다.',
        content: addressId,
      };
    } else {
      return {
        code: 20000,
        message: '이미 존재하는 주소입니다.',
        content: null,
      };
    }
  }

  // 로그인된 사용자는 서버 API 사용
  const response: AddressHistoryResponse = await axiosInstance.post(
    END_POINTS.POSITION.POSITION,
    data,
  );
  return response;
};

// 주소 이력 조회 응답 타입
export interface AddressHistoryItem {
  addressId: number;
  address_name: string;
  id: string;
  phone: string;
  place_name: string;
  road_address_name: string;
  x: number;
  y: number;
  lastUsed?: number;
}

export interface AddressHistoryContent {
  getAddressResponses: AddressHistoryItem[];
  hasNext: boolean;
}

export interface AddressHistoryListResponse {
  code: number;
  message: string | null;
  content: AddressHistoryContent;
}

// 주소 이력 조회 API (서버 또는 로컬 스토리지)
export const getAddressHistoryList = async (
  page: number = 0,
  size: number = 5,
  sort: string = 'lastUsed,desc', // 기본값을 lastUsed로 변경
): Promise<AddressHistoryListResponse> => {
  // 로그인 상태 확인
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.log('로그인되지 않은 사용자. 로컬 스토리지에서 조회합니다.');

    // 로컬 스토리지에서 조회 (최대 5개)
    const localData = getLocalAddressHistoryPaginated(page, Math.min(size, 5), sort);

    return {
      code: 20000,
      message: null,
      content: localData,
    };
  }

  // 로그인된 사용자는 서버 API 사용 (생성일 기준 정렬)
  const serverSort = 'createdAt,desc';

  const response = await axiosInstance.get(
    `${END_POINTS.POSITION.POSITION}?page=${page}&size=${size}&sort=${serverSort}`,
  );
  return response.data as AddressHistoryListResponse;
};

// 주소 이력 삭제 API (서버 또는 로컬 스토리지)
export const deleteAddressHistory = async (addressId: number): Promise<AddressHistoryResponse> => {
  // 로그인 상태 확인
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.log('로그인되지 않은 사용자. 로컬 스토리지에서 삭제합니다.');

    // 로컬 스토리지에서 삭제
    const deletedId = deleteLocalAddressHistory(addressId);

    if (deletedId) {
      return {
        code: 20000,
        message: '주소 이력이 로컬 스토리지에서 삭제되었습니다.',
        content: deletedId,
      };
    } else {
      return {
        code: 40000,
        message: '삭제할 주소 이력을 찾을 수 없습니다.',
        content: null,
      };
    }
  }

  // 로그인된 사용자는 서버 API 사용
  const response: AddressHistoryResponse = await axiosInstance.delete(
    `${END_POINTS.POSITION.POSITION}/${addressId}`,
  );
  return response;
};

// 주소 사용 시간 업데이트 API (서버용)
export const updateAddressUsageTime = async (
  addressId: number,
): Promise<AddressHistoryResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    // 로컬 스토리지에서 업데이트
    updateLocalAddressUsageTime(addressId);

    return {
      code: 20000,
      message: '주소 사용 시간이 로컬 스토리지에서 업데이트되었습니다.',
      content: addressId,
    };
  }

  // 로그인된 사용자는 서버 API 사용
  const response: AddressHistoryResponse = await axiosInstance.patch(
    `${END_POINTS.POSITION.POSITION}/${addressId}/usage`,
  );
  return response;
};
