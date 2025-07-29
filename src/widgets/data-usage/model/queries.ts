import { useQuery } from '@tanstack/react-query';

import { getDataUsage } from '../api/apis';

import type { DataUsageResponse } from '../types';

export const useDataUsageQuery = () => {
  return useQuery<DataUsageResponse>({
    queryKey: ['data-usage'],
    queryFn: getDataUsage,
  });
}; 