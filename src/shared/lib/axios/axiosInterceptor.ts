import { useAuthStore } from '@/entities/auth/model/authStore';
import { END_POINTS, SUCCESS_CODE } from '@/shared/api/endpoints';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';

import { HTTPError } from '../HTTPError';

import { handleAPIError } from './errorHandler';

import type { ApiResponse, ErrorResponse } from '@/shared/lib/axios/responseTypes';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const applyInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      // authStore에서 토큰을 가져오기
      const token = useAuthStore.getState().accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  instance.interceptors.response.use(
    <T>(response: AxiosResponse<ApiResponse<T>>): T | AxiosResponse<ApiResponse<T>> => {
      // 카카오 로그인 API와 팔로우 API, 이미지 검증 API, sales API, coin API, purchases API는 응답 전체를 반환
      if (
        response.config.url?.includes(END_POINTS.USER.LOGIN) ||
        response.config.url?.includes('/follows') ||
        response.config.url?.includes(END_POINTS.TRADES.IMAGE) ||
        response.config.url?.includes(END_POINTS.USER.SALES) ||
        response.config.url?.includes(END_POINTS.MYPAGE.COIN) ||
        response.config.url?.includes(END_POINTS.MYPAGE.COIN_HISTORY) ||
        response.config.url?.includes(END_POINTS.MYPAGE.PURCHASES_HISTORY) ||
        response.config.url?.includes(END_POINTS.POSITION.POSITION)
      ) {
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
    (error: AxiosError<ErrorResponse>) => {
      // 401 Unauthorized 에러 처리
      if (error.response?.status === 401) {
        const { openAuthModal } = useAuthErrorStore.getState();

        // 원래 요청을 저장하고 AuthModal 열기
        openAuthModal(async () => {
          // 로그인 후 원래 요청 재실행
          const originalRequest = error.config;
          if (originalRequest) {
            // 토큰이 업데이트되었을 수 있으므로 다시 요청
            return await instance(originalRequest);
          }
        }, error.config?.url || window.location.pathname);

        // 에러를 throw하지 않고 Promise.reject로 처리하여 요청을 중단
        return Promise.reject(new Error('Authentication required'));
      }

      return handleAPIError(error);
    },
  );
};
