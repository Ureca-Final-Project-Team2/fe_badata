import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { getDataUsage } from '@/widgets/data-usage/api/apis';

import type { DataUsageResponse } from '@/widgets/data-usage/lib/types';

export const useUserDataAmount = () => {
  const { isLoggedIn } = useAuthStore();
  
  return useQuery<DataUsageResponse>({
    queryKey: ['data-usage'],
    queryFn: getDataUsage,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};