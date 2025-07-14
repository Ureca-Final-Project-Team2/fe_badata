import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { ApiResponse, ErrorResponse } from '@/shared/lib/axios/models';
import { SUCCESS_CODE } from '@constants/api';
import { ErrorMessageMap } from '@constants/errorCodes';
import { HTTPError } from '@lib/HTTPError';
import { handleAPIError } from '@lib/axios/errorHandler';

export const applyInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    <T>(response: AxiosResponse<ApiResponse<T>>): T | AxiosResponse<ApiResponse<T>> => {
      // 카카오 로그인 API는 응답 전체를 반환
      if (response.config.url?.includes('/auth/token/issue')) {
        return response;
      }

      const { code, message, content } = response.data;

      if (code !== SUCCESS_CODE) {
        const fallbackMessage =
          ErrorMessageMap[code as keyof typeof ErrorMessageMap] ??
          message ??
          '알 수 없는 오류가 발생했습니다.';
        throw new HTTPError(response.status, code, null, fallbackMessage);
      }

      return content as T;
    },
    (error: AxiosError<ErrorResponse>) => handleAPIError(error),
  );
};
