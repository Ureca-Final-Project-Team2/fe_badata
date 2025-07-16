import { getSosHistory } from '@features/mypage/api/mypage';
import { useQuery } from '@tanstack/react-query';

export const useSosHistoryQuery = () => {
  return useQuery({
    queryKey: ['sosHistory'],
    queryFn: getSosHistory,
  });
};
