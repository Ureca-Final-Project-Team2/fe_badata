import { useQuery } from '@tanstack/react-query';
import { getUserCoin } from '../api/userCoin';
import { UserCoin } from '../model/userCoin';

export const useUserCoin = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: getUserCoin,
  });
};
