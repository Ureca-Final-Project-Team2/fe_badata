import { getUserDataUsage } from '@features/mypage/api/mypage';
import { UserDataUsage } from '@features/mypage/lib/types';
import { useQuery } from '@tanstack/react-query';

export const useUserDataUsage = () => {
  return useQuery<UserDataUsage>({
    queryKey: ['userDataUsage'],
    queryFn: getUserDataUsage,
  });
};
