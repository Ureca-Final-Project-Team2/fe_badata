import { useQuery } from '@tanstack/react-query';

import { getSosHistory } from '@/pages/mypage/sos-history/api/apis';

export const useSosHistoryQuery = () => {
  return useQuery({
    queryKey: ['sosHistory'],
    queryFn: getSosHistory,
  });
};
