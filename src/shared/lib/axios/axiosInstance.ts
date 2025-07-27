import axios from 'axios';

import { BASE_URL, NETWORK_TIMEOUT } from '@/shared/api/endpoints';

import { applyInterceptors } from './axiosInterceptor';

// 개발환경에서는 Next.js 프록시를 사용하여 CORS 문제 해결
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'; // Next.js 프록시를 통해 요청
  }
  return BASE_URL; // 프로덕션에서는 실제 API URL 사용
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: NETWORK_TIMEOUT,
  withCredentials: true,
});

applyInterceptors(axiosInstance);

