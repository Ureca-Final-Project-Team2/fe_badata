import { useQuery } from '@tanstack/react-query';

import { getReportHistoryList } from '@/pages/mypage/report-history/api/apis';

import type { ReportHistoryItem } from '@/pages/mypage/report-history/lib/types';

export const useReportHistoryListQuery = (
  reportStatus: string,
  cursor?: number,
  size = 10
) =>
  useQuery<{
    item: ReportHistoryItem[];
    nextCursor: number;
    hasNext: boolean;
  } | null>({
    queryKey: ['reportHistoryList', reportStatus, cursor, size],
    queryFn: () => getReportHistoryList(reportStatus, cursor, size),
    staleTime: 1000 * 60 * 5, // like-store와 동일한 설정
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
