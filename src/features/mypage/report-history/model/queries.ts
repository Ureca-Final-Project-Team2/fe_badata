import { useQuery } from '@tanstack/react-query';

import { getReportHistoryList } from '@/features/mypage/report-history/api/apis';

import type { ReportHistoryApiResponse } from '@/features/mypage/report-history/lib/types';

export const useReportHistoryListQuery = (cursor?: number, size = 10) =>
  useQuery<ReportHistoryApiResponse>({
    queryKey: ['reportHistoryList', 'reports', cursor, size],
    queryFn: () => getReportHistoryList(cursor, size),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: 1,
  });
