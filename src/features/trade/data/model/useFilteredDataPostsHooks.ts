import { useMemo } from 'react';

import { applyDataFilters, applySorting } from '@/features/trade/data/lib/utils';

import type { AllPost } from '@/entities/trade-post/lib/types';
import type { DataSortOption } from '@/features/trade/data/lib/constants';
import type { DataFilterState } from '@/features/trade/data/model/dataFilterReducer';

export const useFilteredDataPostsHooks = (
  posts: AllPost[] | undefined,
  filters: DataFilterState,
  sortOption: DataSortOption,
) => {
  return useMemo(() => {
    if (!posts) return [];

    return posts
      .filter((p) => p.postCategory === 'DATA')
      .filter((p) => applyDataFilters(p, filters))
      .sort((a, b) => applySorting(a, b, sortOption));
  }, [posts, filters, sortOption]);
};
