import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export interface SosRequestData {
  storeId: number;
  message?: string;
}

export interface SosRequestResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const sosMutations = {
  // SOS 요청 API
  requestSos: async (data: SosRequestData): Promise<SosRequestResponse> => {
    try {
      const response = await axiosInstance.post(`${END_POINTS.SOS.REQUEST}`, data);
      return {
        success: true,
        message: response.data.message || 'SOS 요청이 성공적으로 전송되었습니다.',
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'SOS 요청 전송에 실패했습니다.',
      };
    }
  },
};
