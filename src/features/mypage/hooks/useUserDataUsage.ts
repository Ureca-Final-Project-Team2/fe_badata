import { useQuery } from '@tanstack/react-query';
import { getUserDataUsage } from '../apis/userDataUsage';
import { UserDataUsage } from '../model/userDataUsage';

export const useUserDataUsage = () => {
  return useQuery<UserDataUsage>({
    queryKey: ['userDataUsage'],
    queryFn: getUserDataUsage,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
