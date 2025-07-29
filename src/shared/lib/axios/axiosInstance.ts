import axios from 'axios';

import { NETWORK_TIMEOUT } from '@/shared/api/endpoints';

import { applyInterceptors } from './axiosInterceptor';

// 개발환경에서도 실제 API 서버 사용
const getBaseURL = () => {
  // 환경변수가 있으면 사용, 없으면 기본값 사용
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // 기본값으로 실제 API 서버 URL 사용
  return 'http://13.124.160.115:8080';
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: NETWORK_TIMEOUT,
  withCredentials: true,
});

applyInterceptors(axiosInstance);

