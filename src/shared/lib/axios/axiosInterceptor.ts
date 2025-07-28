import { useAuthStore } from '@/entities/auth/model/authStore';
import { END_POINTS, SUCCESS_CODE } from '@/shared/api/endpoints';
import { ErrorMessageMap } from '@/shared/config/errorCodes';

import { HTTPError } from '../HTTPError';

import { handleAPIError } from './errorHandler';

import type { ApiResponse, ErrorResponse } from '@/shared/lib/axios/responseTypes';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export const applyInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      // authStore에서 토큰을 가져오기
      const token = useAuthStore.getState().accessToken;
      
      // 알림 설정 API 호출 시 토큰 정보 상세 로깅
      if (config.url?.includes('/api/v1/users/notification')) {
        console.log('🔐 알림 설정 API 토큰 확인:', { 
          url: config.url, 
          hasToken: !!token,
          tokenLength: token?.length,
          tokenStart: token?.substring(0, 30) + '...',
          tokenEnd: token?.substring((token?.length || 0) - 30),
          tokenPayload: token ? JSON.parse(atob(token.split('.')[1])) : null
        });
      }
      
      // 개발 환경에서만 토큰 확인 로그 출력 (선택적)
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEBUG_TOKENS === 'true') {
        console.log('API 요청 토큰 확인:', { 
          url: config.url, 
          token: token ? '토큰 있음' : '토큰 없음',
          tokenLength: token?.length,
          tokenStart: token?.substring(0, 20) + '...',
          tokenEnd: token?.substring(token.length - 20)
        });
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
  instance.interceptors.response.use(
    <T>(response: AxiosResponse<ApiResponse<T>>): T | AxiosResponse<ApiResponse<T>> => {
      // 카카오 로그인 API와 팔로우 API, 이미지 검증 API, sales API는 응답 전체를 반환
      if (
        response.config.url?.includes(END_POINTS.USER.LOGIN) ||
        response.config.url?.includes('/follows') ||
        response.config.url?.includes(END_POINTS.TRADES.IMAGE) ||
        response.config.url?.includes(END_POINTS.USER.SALES)
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
      return handleAPIError(error);
    },
  );
};
