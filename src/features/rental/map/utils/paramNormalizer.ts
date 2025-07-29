import type { StoreListParams } from '@/features/rental/map/lib/types';

// utils/paramNormalizer.ts
export const normalizeApiParams = (params: StoreListParams): StoreListParams => {
  const normalized: Partial<StoreListParams> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;

    if (value === null) {
      normalized[key as keyof StoreListParams] = '' as never;
    } else if (Array.isArray(value)) {
      normalized[key as keyof StoreListParams] = (
        value.length === 0 ? '' : key === 'sort' ? value.join(',') : value
      ) as never;
    } else {
      normalized[key as keyof StoreListParams] = value as never;
    }
  });

  return normalized as StoreListParams;
};
