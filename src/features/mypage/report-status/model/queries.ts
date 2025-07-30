import { useQuery } from '@tanstack/react-query';

import { getReportStatus } from '../api/apis';

import type { ReportStatusResponse } from '../lib/types';

export const useReportStatusQuery = () =>
  useQuery<ReportStatusResponse>({
    queryKey: ['report-status'],
    queryFn: getReportStatus,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
