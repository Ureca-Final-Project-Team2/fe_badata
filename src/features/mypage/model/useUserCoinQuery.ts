import { useQuery } from '@tanstack/react-query';
import { getUserCoin } from '../api/mypage';
import { UserCoin } from '../lib/types';

export const useUserCoin = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: getUserCoin,
  });
};
