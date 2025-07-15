import { useQuery } from '@tanstack/react-query';
import { getUserDataUsage } from '../api/mypage';
import { UserDataUsage } from '../lib/types';

export const useUserDataUsage = () => {
  return useQuery<UserDataUsage>({
    queryKey: ['userDataUsage'],
    queryFn: getUserDataUsage,
  });
};
