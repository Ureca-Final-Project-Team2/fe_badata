import { useQuery } from '@tanstack/react-query';

import { getSosHistory } from '@/pages/mypage/sos-history/api/apis';

import type { SosHistoryResponse } from '@/pages/mypage/sos-history/lib/types';

export const useSosHistoryListQuery = (
  cursor?: number,
  size = 10
) =>
  useQuery<SosHistoryResponse['content'] | null>({
    queryKey: ['sosHistoryList', cursor, size],
    queryFn: () => getSosHistory(cursor, size),
  });
