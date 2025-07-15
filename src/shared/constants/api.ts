export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const NETWORK_TIMEOUT = 5000;
export const SUCCESS_CODE = 20000;

export const END_POINTS = {
  TRADES: {
    LIST: '/api/v1/trades/posts',
    DETAIL: (postId: number) => `/api/v1/trades/${postId}/post`,
    DEADLINE: '/api/v1/trades/posts/deadline',
  },
  USER: {
    LOGIN: '/api/v1/auth/token/issue',
    REISSUE: '/api/v1/auth/reissue/token',
  },
  STORES: {
    ALLSTORE: (storeId: number, query: string) => `/api/v1/stores/${storeId}/devices?${query}`,
    ALLDEVICE: (query: string) => `/api/v1/stores/map?${query}`,
    STORELIST: `/api/v1/stores`,
  },
  MYPAGE: {
    COIN: '/api/v1/users/coin',
    DATA_USAGE: '/api/v1/users/data',
    SOS_HISTORY: '/api/v1/mypage/sos-history',
  },
};
