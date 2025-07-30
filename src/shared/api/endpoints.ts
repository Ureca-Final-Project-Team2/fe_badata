export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : process.env.NEXT_PUBLIC_API_URL || 'https://api.badata.store';
export const NETWORK_TIMEOUT = 5000;
export const SUCCESS_CODE = 20000;

export const END_POINTS = {
  TRADES: {
    LIST: '/api/v1/trades/posts',
    DETAIL: (postId: number) => `/api/v1/trades/${postId}/post`,
    DELETE: (postId: number) => `/api/v1/trades/${postId}/post`,
    UPDATE_DATA: (postId: number) => `/api/v1/trades/posts/data/${postId}`,
    UPDATE_GIFTICON: (postId: number) => `/api/v1/trades/posts/gifticon/${postId}`,
    DEADLINE: '/api/v1/trades/posts/deadline',
    SEARCH: (keyword: string) => `/api/v1/trades/posts?query=${keyword}`,
    SEARCH_TRENDS: '/api/v1/trades/search/trending',
    REGISTER_DATA: '/api/v1/trades/posts/data',
    REGISTER_GIFTICON: '/api/v1/trades/posts/gifticon',
    USER_POST: (userId: number) => `/api/v1/trades/posts/${userId}`,
    VERIFY_PAYMENT: (impUid: string, postId: number) =>
      `/api/v1/trades/order/payment/${encodeURIComponent(impUid)}/${encodeURIComponent(postId.toString())}`,
    CREATE_PAYMENT: (postId: number) => `/api/v1/trades/order/${postId}`,
    LIKE_POST: (postId: number) => `/api/v1/trades/${postId}/likes`,
    REPORT: (postId: number) => `/api/v1/trades/${postId}/reports`,
    IMAGE: '/api/v1/trades/posts/image',
  },
  USER: {
    LOGIN: '/api/v1/auth/token/issue',
    REISSUE: '/api/v1/auth/reissue/token',
    INFO: '/api/v1/users/info',
    FOLLOW_TOGGLE: (userId: number) => `/api/v1/users/${userId}/follows`,
    SALES: '/api/v1/users/sales',
  },
  STORES: {
    ALLSTORE: (storeId: number) => `/api/v1/stores/${storeId}/devices`,
    ALLDEVICE: () => `/api/v1/stores/map`,
    STORELIST: `/api/v1/stores`,
    STOREDETAIL: (storeId: number) => `/api/v1/stores/${storeId}`,
    LIKESTORE: (storeId: number) => `/api/v1/stores/${storeId}/like`,
    REVIEW: `/api/v1/reviews`,
    STORE_REVIEWS: (storeId: number) => `/api/v1/${storeId}/reviews`,
    REVIEW_META: (storeId: number) => `/api/v1/${storeId}/review-meta`,
    REVIEW_QUICK_REPLIES: `/api/v1/review-quick-replies`,
  },
  RENTAL: {
    AVAILABLE_DEVICE: (storeId: number) => `/api/v1/rentals/${storeId}/devices`, //예약할 기기 조회
    RESERVATIONS: `/api/v1/rentals/devices`,
    RESTOCK: `/api/v1/restock`,
    RESERVATION_DETAILS: (reservationId: number) =>
      `/api/v1/rentals/reservations/${reservationId}/devices`,
  },
  POSITION: {
    POSITION: '/api/v1/addresses', // 주소 이력 생성, 조회
    DELETE_POSITION: (addressId: number) => `/api/v1/addresses/${addressId}`, // 주소 이력 삭제
  },
  MYPAGE: {
    COIN: '/api/v1/users/coin',
    COIN_HISTORY: '/api/v1/users/coin/history',
    DATA_USAGE: '/api/v1/users/data',
    FOLLOWINGS: '/api/v1/users/follows',
    FOLLOWERS: '/api/v1/users/follows',
    DELETE_FOLLOW: (followId: number) => `/api/v1/users/follows/${followId}`,
    PURCHASES_HISTORY: '/api/v1/users/purchases',
    SALES_HISTORY: '/api/v1/users/sales',
    LIKE_STORE: '/api/v1/users/likes/stores',
    RENTAL_HISTORY: '/api/v1/users/rentals',
    LIKE_TRADE_POST: '/api/v1/users/likes/posts',
    RESTOCK_ALARM: '/api/v1/users/restock',
    SOS_HISTORY: '/api/v1/users/sos',
    REPORT_LIST: '/api/v1/users/reports',
    REPORT_INFO: (reportId: number) => `/api/v1/users/${reportId}/report/info`,
    NOTIFICATION: '/api/v1/users/notification',
  },
} as const;
