import axios from 'axios';
import { BASE_URL, NETWORK_TIMEOUT } from '@shared/constants/api';
import { applyInterceptors } from './axiosInterceptor';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  withCredentials: true,
});

applyInterceptors(axiosInstance);
