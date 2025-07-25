import { useQuery } from '@tanstack/react-query';

import { getReportHistoryList } from '../api/apis';

import type { ReportHistoryResponse } from '../lib/types';

export const useReportHistoryListQuery = (
  reportStatus: string,
  cursor?: number,
  size = 10
) =>
  useQuery<ReportHistoryResponse['content'] | null>({
    queryKey: ['reportHistoryList', reportStatus, cursor, size],
    queryFn: () => getReportHistoryList(reportStatus, cursor, size),
  });
