import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { applyInterceptors } from '@shared/lib/axios/axiosInterceptor';

export const setupAxios = () => {
  applyInterceptors(axiosInstance);
};
