import { useQuery } from '@tanstack/react-query';

import { getSosHistory } from '@/features/mypage/sos-history/api/apis';

export const useSosHistoryListQuery = (cursor?: number, size = 10) =>
  useQuery({
    queryKey: ['sosHistoryList', cursor, size],
    queryFn: () => getSosHistory(cursor, size),
  });
