import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@shared/types/api';
import { axiosInstance } from '@lib/axiosInstance';
import { HTTPError } from '@lib/HTTPError';
import { SUCCESS_CODE } from '@constants/api';
import { ErrorCode, ErrorMessageMap } from '@constants/errorCodes';

interface ErrorResponse {
  status: number;
  code?: number;
  message?: string;
  content?: null;
}

export const setupAxiosInterceptors = () => {
  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    <T>(response: AxiosResponse<ApiResponse<T>>): T => {
      const { code, message, content } = response.data;

      if (code !== SUCCESS_CODE) {
        const fallbackMessage =
          ErrorMessageMap[code as ErrorCode] ?? message ?? '알 수 없는 오류가 발생했습니다.';
        throw new HTTPError(response.status, code, null, fallbackMessage);
      }

      return content as T;
    },

    (error: AxiosError<ErrorResponse>) => {
      if (!error.response) {
        throw new HTTPError(500, undefined, null, '네트워크 오류가 발생했습니다');
      }
      const { data, status } = error.response;
      throw new HTTPError(status, data.code, data.content, data.message);
    },
  );
};
