import { getUserCoin } from '@features/mypage/api/mypage';
import { UserCoin } from '@features/mypage/lib/types';
import { useQuery } from '@tanstack/react-query';

export const useUserCoin = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: getUserCoin,
  });
};
