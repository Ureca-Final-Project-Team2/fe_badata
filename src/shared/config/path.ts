export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  TRADE: {
    MAIN: '/trade',
    DATA: '/trade/data',
    DATA_DETAIL: '/trade/data/:id',
    DATA_REGISTER: '/trade/register/data',
    COUPON: '/trade/coupon',
    COUPON_DETAIL: '/trade/coupon/:id',
    COUPON_REGISTER: '/trade/register/coupon',
    SEARCH: '/trade/search',
  },
} as const;
