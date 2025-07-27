export const PRICE_RANGES = {
  '0_10000': { min: 0, max: 10000, label: '1만원 이하' },
  '10000_30000': { min: 10000, max: 30000, label: '1-3만원' },
  '30000_50000': { min: 30000, max: 50000, label: '3-5만원' },
  OVER_50000: { min: 50000, max: Infinity, label: '5만원 이상' },
} as const;

export const DATA_SORT_OPTIONS = [
  { value: 'latest' as const, label: '최신순' },
  { value: 'popular' as const, label: '인기순' },
] as const;

export type DataSortOption = (typeof DATA_SORT_OPTIONS)[number]['value'];
