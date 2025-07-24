import { useQuery } from '@tanstack/react-query';

import { getMyReports } from '../api/apis';

import type { ReportListResponse } from '../api/apis';


export const useMyReports = (status: string = 'ANSWER') => {
  return useQuery<ReportListResponse>({
    queryKey: ['myReports', status],
    queryFn: () => getMyReports(status),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 3,
  });
};
