import { useAuthStore } from '@/entities/auth/model/authStore';
import { END_POINTS, SUCCESS_CODE } from '@/shared/api/endpoints';
import { ErrorMessageMap } from '@/shared/config/errorCodes';

import { HTTPError } from '../HTTPError';

import { handleAPIError } from './errorHandler';

import type { ApiResponse, ErrorResponse } from '@/shared/lib/axios/responseTypes';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const applyInterceptors = (instance: AxiosInstance): void => {
  // Request Interceptor: 모든 요청에 토큰 추가
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        // authStore에서 토큰을 가져오기
        const token = useAuthStore.getState().accessToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response Interceptor: 응답 처리 (401 에러 처리 제거)
  instance.interceptors.response.use(
    <T>(response: AxiosResponse<ApiResponse<T>>): T | AxiosResponse<ApiResponse<T>> => {
      // 카카오 로그인 API와 팔로우 API, 이미지 검증 API, sales API, coin API, purchases API, 검색 API는 응답 전체를 반환
      if (
        response.config.url?.includes(END_POINTS.USER.LOGIN) ||
        response.config.url?.includes('/follows') ||
        response.config.url?.includes(END_POINTS.TRADES.IMAGE) ||
        response.config.url?.includes(END_POINTS.USER.SALES) ||
        response.config.url?.includes(END_POINTS.MYPAGE.COIN) ||
        response.config.url?.includes(END_POINTS.MYPAGE.COIN_HISTORY) ||
        response.config.url?.includes(END_POINTS.MYPAGE.PURCHASES_HISTORY) ||
        response.config.url?.includes(END_POINTS.POSITION.POSITION) ||
        response.config.url?.includes('/trades/posts?query=') ||
        response.config.url?.includes(END_POINTS.SOS.REQUEST) ||
        response.config.url?.includes(END_POINTS.SOS.RESPOND)
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
      // 401 에러가 여기까지 온 경우는 예상치 못한 상황이므로 로그만 남기고 처리
      if (error.response?.status === 401) {
        console.warn('⚠️ 예상치 못한 401 에러 - useAuthRequiredRequest에서 사전 처리되어야 함');
      }

      // 다른 에러들은 기존 핸들러로 처리
      return handleAPIError(error);
    },
  );
};
