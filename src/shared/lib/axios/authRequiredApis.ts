// 로그인이 필요한 API 엔드포인트 목록
export const AUTH_REQUIRED_APIS = [
  // 사용자 관련
  '/api/v1/users/info',
  '/api/v1/users/sales',
  '/api/v1/users/follows',
  '/api/v1/users/coin',
  '/api/v1/users/coin/history',
  '/api/v1/users/data',
  '/api/v1/users/post/count',
  '/api/v1/users/purchases',
  '/api/v1/users/likes/stores',
  '/api/v1/users/rentals',
  '/api/v1/users/likes/posts',
  '/api/v1/users/restock',
  '/api/v1/users/sos',
  '/api/v1/users/report/totalCount',
  '/api/v1/users/reports',
  '/api/v1/users/notification',

  // FCM 토큰
  '/api/v1/fcm-token',

  // 매장 관련
  '/api/v1/stores',

  // 대여 관련
  '/api/v1/rentals/devices',
  '/api/v1/restock',

  // 주소 관련
  '/api/v1/addresses',

  // 거래 관련 (특정 사용자의 게시물)
  '/api/v1/trades/posts',
  '/api/v1/trades/posts/data',
  '/api/v1/trades/posts/gifticon',
  '/api/v1/trades/search/recent',
  '/api/v1/trades/search/trending',

  // SOS 관련
  '/api/v1/sos/request',
  '/api/v1/sos/accept',
] as const;

// 로그인이 필요한 API인지 확인하는 함수
export const isAuthRequiredApi = (url: string): boolean => {
  const urlPath = url.split('?')[0];
  return AUTH_REQUIRED_APIS.some((api) => urlPath === api || urlPath.startsWith(api + '/'));
};

// 동적 경로를 포함한 로그인 필요 API 패턴
export const AUTH_REQUIRED_PATTERNS = [
  /\/api\/v1\/users\/\d+\/follows/,
  /\/api\/v1\/users\/\d+\/report\/info/,
  /\/api\/v1\/trades\/posts\/\d+/,
  /\/api\/v1\/trades\/\d+\/likes/,
  /\/api\/v1\/trades\/\d+\/reports/,
  /\/api\/v1\/trades\/order\/\d+/,
  /\/api\/v1\/stores\/\d+\/like/,
  /\/api\/v1\/restock\/\d+/,
  /\/api\/v1\/addresses\/\d+/,
  /\/api\/v1\/trades\/purchases\/.+/,
  /\/api\/v1\/trades\/\d+\/post/,
  /\/api\/v1\/trades\/\d+\/payment/,
  /\/api\/v1\/trades\/search\/recent\/\d+/,
] as const;

// 동적 경로를 포함한 API가 로그인이 필요한지 확인하는 함수
export const isAuthRequiredPattern = (url: string): boolean => {
  return AUTH_REQUIRED_PATTERNS.some((pattern) => pattern.test(url));
};

// 최종 로그인 필요 여부 확인 함수
export const requiresAuth = (url: string): boolean => {
  return isAuthRequiredApi(url) || isAuthRequiredPattern(url);
};
