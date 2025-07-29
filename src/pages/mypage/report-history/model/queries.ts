import { useQuery } from '@tanstack/react-query';

import { getReportHistoryList } from '@/pages/mypage/report-history/api/apis';

import type { ReportHistoryResponse } from '@/pages/mypage/report-history/lib/types';

export const useReportHistoryListQuery = (reportStatus: string, cursor?: number, size = 10) =>
  useQuery<ReportHistoryResponse | null>({
    queryKey: ['reportHistoryList', reportStatus, cursor, size],
    queryFn: () => getReportHistoryList(reportStatus, cursor, size),
  });
