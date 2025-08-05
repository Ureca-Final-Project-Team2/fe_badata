import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { getReportStatus } from '@/features/mypage/report-status/api/apis';

import type { ReportStatus } from '@/features/mypage/report-status/lib/types';

export const useReportStatusQuery = () => {
  const { isLoggedIn } = useAuthStore();

  return useQuery<ReportStatus>({
    queryKey: ['report-status'],
    queryFn: getReportStatus,
    enabled: isLoggedIn,
  });
};
