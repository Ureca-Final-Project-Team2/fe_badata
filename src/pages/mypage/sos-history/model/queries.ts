import { useQuery } from '@tanstack/react-query';

import { getSosHistory } from '../api/apis';

import type { SosHistoryResponse } from '../lib/types';

export const useSosHistoryListQuery = (
  cursor?: number,
  size = 10
) =>
  useQuery<SosHistoryResponse['content']>({
    queryKey: ['sosHistoryList', cursor, size],
    queryFn: () => getSosHistory(cursor, size),
  });
