import { useQuery } from '@tanstack/react-query';

import { getReportHistoryList } from '@/features/mypage/report-history/api/apis';

import type { ReportHistoryResponse } from '../lib/types';

export const useReportHistoryListQuery = (reportStatus: string, cursor?: number, size = 10) =>
  useQuery<ReportHistoryResponse['content']>({
    queryKey: ['reportHistoryList', reportStatus, cursor, size],
    queryFn: () => getReportHistoryList(reportStatus, cursor, size),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: 1,
  });
