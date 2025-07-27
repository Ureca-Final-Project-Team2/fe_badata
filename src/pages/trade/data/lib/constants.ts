export const PRICE_RANGES = {
  '0_3000': { label: '0원 ~ 3,000원', min: 0, max: 3000 },
  '3000_7000': { label: '3,000원 ~ 7,000원', min: 3000, max: 7000 },
  '7000_10000': { label: '7,000원 ~ 10,000원', min: 7000, max: 10000 },
  '10000_15000': { label: '1만원 ~ 1.5만원', min: 10000, max: 15000 },
  OVER_15000: { label: '1.5만원 초과', min: 15000, max: Infinity },
};

export const DATA_SORT_OPTIONS = [
  { value: 'latest' as const, label: '최신순' },
  { value: 'popular' as const, label: '인기순' },
] as const;

export type DataSortOption = (typeof DATA_SORT_OPTIONS)[number]['value'];
