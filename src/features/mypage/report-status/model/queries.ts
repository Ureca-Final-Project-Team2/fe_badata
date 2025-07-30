import { useQuery } from '@tanstack/react-query';

import { getReportStatus } from '../api/apis';

import type { ReportStatus } from '../lib/types';


export const useReportStatusQuery = () =>
  useQuery<ReportStatus>({
    queryKey: ['report-status'],
    queryFn: getReportStatus,
  });

