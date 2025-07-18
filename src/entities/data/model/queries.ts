import { useQuery } from '@tanstack/react-query';

import { getUserDataUsage } from '../api/apis';

import type { UserDataUsage } from '../lib/types';

export const useUserDataUsageQuery = () => {
  return useQuery<UserDataUsage>({
    queryKey: ['userDataUsage'],
    queryFn: getUserDataUsage,
  });
};
