import { useQuery } from '@tanstack/react-query';
import { fetchUserCoin } from '../apis/fetchUserCoin';
import { UserCoin } from '../types/userCoin';

export const useUserCoin = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: fetchUserCoin,
  });
};
