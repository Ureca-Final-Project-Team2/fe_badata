import { useQuery } from '@tanstack/react-query';

import { getReportStatus } from '@/features/mypage/report-status/api/apis';

import type { ReportStatus } from '@/features/mypage/report-status/lib/types';


export const useReportStatusQuery = () =>
  useQuery<ReportStatus>({
    queryKey: ['report-status'],
    queryFn: getReportStatus,
  });

