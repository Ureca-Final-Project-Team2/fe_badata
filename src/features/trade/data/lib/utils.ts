import { PRICE_RANGES } from './constants';

import type { AllPost } from '@/entities/trade-post/lib/types';
import type { DataSortOption } from '@/features/trade/data/lib/constants';
import type { DataFilterState, PriceRange } from '@/features/trade/data/model/dataFilterReducer';

export const isPriceInRange = (price: number, range: PriceRange): boolean => {
  if (!range) return true;
  const { min, max } = PRICE_RANGES[range];
  return price >= min && price <= max;
};

export const getCapacityLabel = (capacity?: number): string | null => {
  if (capacity === undefined) return null;
  if (capacity <= 100) return '100MB 이하';
  if (capacity <= 500) return '100MB~500MB';
  if (capacity <= 1024) return '500MB~1GB';
  if (capacity <= 5120) return '1GB~5GB';
  return '5GB 이상';
};

export const applyDataFilters = (post: AllPost, filters: DataFilterState): boolean => {
  const carrierMatch =
    filters.carriers.length === 0 ||
    (post.mobileCarrier !== undefined && filters.carriers.includes(post.mobileCarrier));

  const capacityLabel = getCapacityLabel(post.capacity);
  const capacityMatch =
    filters.capacities.length === 0 ||
    (capacityLabel ? filters.capacities.includes(capacityLabel) : false);

  const priceMatch = isPriceInRange(post.price, filters.priceRange);

  return carrierMatch && capacityMatch && priceMatch;
};

export const applySorting = (a: AllPost, b: AllPost, sortOption: DataSortOption): number => {
  return sortOption === 'latest'
    ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    : b.likesCount - a.likesCount;
};
