import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { getUserCoin } from '@/features/mypage/coin-history/api/apis';

export const useUserCoinQuery = () => {
  const { isLoggedIn } = useAuthStore();

  return useQuery<{ coin: number }>({
    queryKey: ['user-coin'],
    queryFn: getUserCoin,
    enabled: isLoggedIn,
    staleTime: 1000 * 60,
  });
};
