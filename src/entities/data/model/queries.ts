import { useQuery } from '@tanstack/react-query';

import { getUserDataUsage } from '@/entities/data/api/apis';

import type { UserDataUsage } from '@/entities/data/lib/types';

export const useUserDataUsageQuery = () => {
  return useQuery<UserDataUsage>({
    queryKey: ['userDataUsage'],
    queryFn: getUserDataUsage,
  });
};
