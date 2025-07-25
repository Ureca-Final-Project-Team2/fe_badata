export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  TRADE: {
    MAIN: '/trade',
    DATA: '/trade/data',
    DATA_DETAIL: '/trade/data/:id',
    DATA_REGISTER: '/trade/register/data',
    GIFTICON: '/trade/gifticon',
    GIFTICON_DETAIL: '/trade/gifticon/:id',
    GIFTICON_REGISTER: '/trade/register/gifticon',
    SEARCH: '/trade/search',
    REPORT: '/trade/report/:id',
    DEADLINE: '/trade/deadline',
    DEADLINE_DATA: '/trade/deadline/data',
    DEADLINE_GIFTICON: '/trade/deadline/gifticon',
  },
} as const;
