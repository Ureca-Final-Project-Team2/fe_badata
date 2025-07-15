import { useQuery } from '@tanstack/react-query';
import { getSosHistory } from '../api/mypage';

export const useSosHistoryQuery = () => {
  return useQuery({
    queryKey: ['sosHistory'],
    queryFn: getSosHistory,
  });
};
