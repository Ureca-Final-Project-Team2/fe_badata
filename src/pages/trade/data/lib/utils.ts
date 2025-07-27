import { PRICE_RANGES } from './constants';

import type { AllPost } from '@/entities/trade-post/lib/types';
import type { DataSortOption } from '@/pages/trade/data/lib/constants';
import type { DataFilterState, PriceRange } from '@/pages/trade/data/model/dataFilterReducer';

export const isPriceInRange = (price: number, range: PriceRange): boolean => {
  if (!range) return true;
  const { min, max } = PRICE_RANGES[range];
  return price >= min && price <= max;
};

export const applyDataFilters = (post: AllPost, filters: DataFilterState): boolean => {
  const carrierMatch =
    filters.carriers.length === 0 || filters.carriers.includes(post.mobileCarrier!);
  // const capacityMatch = filters.capacities.length === 0 ||
  //   filters.capacities.includes(String(post.capacity ?? ''));

  const priceMatch = isPriceInRange(post.price, filters.priceRange);
  return (
    carrierMatch &&
    // capacityMatch &&
    priceMatch
  );
};

export const applySorting = (a: AllPost, b: AllPost, sortOption: DataSortOption): number => {
  return sortOption === 'latest'
    ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    : b.likesCount - a.likesCount;
};
