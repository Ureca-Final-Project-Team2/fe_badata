export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const NETWORK_TIMEOUT = 5000;
export const SUCCESS_CODE = 20000;

export const END_POINTS = {
  USER: {
    LOGIN: '/api/v1/auth/token/issue',
  },
  STORES: {
    ALLSTORE: (storeId: string, query: string) => `/api/v1/stores/${storeId}/devices?${query}`,
    ALLDEVICE: (query: string) => `/api/v1/stores/map?${query}`,
  },
};
