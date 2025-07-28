import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  UpdateNotificationSettingRequest,
  UpdateNotificationSettingResponse
} from '../lib/types';

// 토큰 페이로드 안전 디코딩 함수
const decodeTokenPayload = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('토큰 디코딩 실패:', error);
    return null;
  }
};

// 토큰 만료 시간 확인 함수
const isTokenExpired = (token: string) => {
  const payload = decodeTokenPayload(token);
  if (!payload || !payload.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

// API 연결 상태 확인 함수
const logApiRequest = (method: string, url: string, data?: unknown, params?: unknown) => {
  console.log('🌐 API 요청 정보:', {
    method,
    url,
    data,
    params,
    timestamp: new Date().toISOString()
  });
};

const logApiResponse = (response: { status: number; statusText: string; data: unknown; headers: unknown }, url: string) => {
  console.log('📡 API 응답 정보:', {
    url,
    status: response.status,
    statusText: response.statusText,
    data: response.data,
    headers: response.headers,
    timestamp: new Date().toISOString()
  });
};

// API 연결 상태 테스트 함수
export const testApiConnection = async () => {
  try {
    console.log('🧪 API 연결 상태 테스트 시작');
    
    // 토큰 상태 확인
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = decodeTokenPayload(token);
      const expired = isTokenExpired(token);
      console.log('🔐 토큰 분석:', {
        hasToken: !!token,
        tokenLength: token.length,
        tokenStart: token.substring(0, 30) + '...',
        tokenEnd: token.substring(token.length - 30),
        payload,
        isExpired: expired,
        currentTime: new Date().toISOString(),
        tokenExpTime: payload?.exp ? new Date(payload.exp * 1000).toISOString() : 'N/A'
      });
    }
    
    // 다른 마이페이지 API들 테스트
    const testApis = [
      { name: '알림 설정', url: END_POINTS.MYPAGE.NOTIFICATION },
      { name: '신고 내역', url: END_POINTS.MYPAGE.REPORT_LIST },
      { name: '코인 정보', url: END_POINTS.MYPAGE.COIN },
      { name: '데이터 사용량', url: END_POINTS.MYPAGE.DATA_USAGE },
      { name: 'SOS 내역', url: END_POINTS.MYPAGE.SOS_HISTORY },
    ];
    
    const results = [];
    
    for (const api of testApis) {
      try {
        console.log(`🔍 ${api.name} API 테스트:`, api.url);
        const response = await axiosInstance.get(api.url);
        console.log(`✅ ${api.name} API 성공:`, response.status);
        results.push({ name: api.name, status: 'success', statusCode: response.status });
      } catch (error) {
        console.error(`❌ ${api.name} API 실패:`, error);
        const statusCode = error && typeof error === 'object' && 'response' in error 
          ? (error as { response?: { status?: number } }).response?.status || 'unknown'
          : 'unknown';
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.push({ name: api.name, status: 'error', statusCode, error: errorMessage });
      }
    }
    
    // 현재 axios 설정 확인
    console.log('🔧 Axios 설정:', {
      baseURL: axiosInstance.defaults.baseURL,
      timeout: axiosInstance.defaults.timeout,
      withCredentials: axiosInstance.defaults.withCredentials
    });
    
    return {
      success: true,
      message: 'API 연결 테스트 완료',
      tokenInfo: token ? {
        hasToken: true,
        isExpired: isTokenExpired(token),
        payload: decodeTokenPayload(token)
      } : {
        hasToken: false
      },
      apiResults: results,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ API 연결 테스트 실패:', error);
    return {
      success: false,
      message: 'API 연결 테스트 실패',
      error: error,
      timestamp: new Date().toISOString()
    };
  }
};

// 알림 설정 조회 API
export const getNotificationSetting = async (): Promise<{ isNotificationEnabled: boolean }> => {
  try {
    const url = END_POINTS.MYPAGE.NOTIFICATION;
    logApiRequest('GET', url);
    
    // 토큰 상태 사전 확인
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = decodeTokenPayload(token);
      const expired = isTokenExpired(token);
      console.log('🔐 API 호출 전 토큰 상태:', {
        hasToken: !!token,
        isExpired: expired,
        payload,
        currentTime: new Date().toISOString(),
        tokenExpTime: payload?.exp ? new Date(payload.exp * 1000).toISOString() : 'N/A'
      });
    }
    
    console.log('🔍 알림 설정 조회 API 호출:', url);
    
    // like-store 방식으로 수정: 직접 응답 반환
    const response = await axiosInstance.get(url);
    console.log('✅ 알림 설정 조회 성공:', response);
    return response as unknown as { isNotificationEnabled: boolean };
  } catch (error) {
    console.error('❌ 알림 설정 조회 실패:', error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { status: number; statusText: string; data: unknown } };
      console.error('❌ 응답 에러 상세:', {
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data,
        errorType: error.constructor.name,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // 401 에러 특별 분석
      if (axiosError.response.status === 401) {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const payload = decodeTokenPayload(token);
          const expired = isTokenExpired(token);
          console.error('🔍 401 에러 토큰 분석:', {
            hasToken: !!token,
            tokenLength: token.length,
            isExpired: expired,
            payload,
            currentTime: new Date().toISOString(),
            tokenExpTime: payload?.exp ? new Date(payload.exp * 1000).toISOString() : 'N/A'
          });
        } else {
          console.error('🔍 401 에러: 토큰이 없음');
        }
      }
    }
    throw error;
  }
};

// 알림 설정 변경 API
export const updateNotificationSetting = async (
  data: UpdateNotificationSettingRequest,
): Promise<UpdateNotificationSettingResponse> => {
  try {
    const url = END_POINTS.MYPAGE.NOTIFICATION;
    logApiRequest('POST', url, null, data);
    
    console.log('🔧 알림 설정 변경 API 호출:', {
      url: url,
      data: data
    });
    const response = await axiosInstance.post(
      url,
      null,
      { params: data },
    );
    
    logApiResponse(response, url);
    console.log('✅ 알림 설정 변경 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 알림 설정 변경 실패:', error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { status: number; statusText: string; data: unknown } };
      console.error('❌ 응답 에러:', {
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        data: axiosError.response.data
      });
    }
    throw error;
  }
}; 