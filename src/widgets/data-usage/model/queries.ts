import { useQuery } from '@tanstack/react-query';

import { getDataUsage } from '@/widgets/data-usage/api/apis';

import type { DataUsageResponse } from '@/widgets/data-usage/types';

export const useDataUsageQuery = () => {
  return useQuery<DataUsageResponse>({
    queryKey: ['data-usage'],
    queryFn: getDataUsage,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useUserDataAmount = () => {
  return useQuery<DataUsageResponse>({
    queryKey: ['data-usage'],
    queryFn: getDataUsage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};