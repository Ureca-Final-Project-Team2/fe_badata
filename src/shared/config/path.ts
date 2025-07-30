export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  TRADE: {
    MAIN: '/trade',
    DATA_DETAIL: '/trade/data/:id',
    DATA_REGISTER: '/trade/register/data',
    GIFTICON_DETAIL: '/trade/gifticon/:id',
    GIFTICON_REGISTER: '/trade/register/gifticon',
    SEARCH: '/trade/search',
    REPORT: '/trade/report/:id',
    DEADLINE: '/trade/deadline',
    TRENDING: '/trade/trending',
  },
  RENTAL: {
    STORE_DETAIL: '/rental/:storeId',
    REGISTER_REVIEW: '/rental/store/register-review',
  },
} as const;
