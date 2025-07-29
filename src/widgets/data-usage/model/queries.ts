import { useQuery } from '@tanstack/react-query';

import { getDataUsage } from '../api/apis';

import type { DataUsageResponse } from '../types';

// 데이터 사용량 조회 쿼리
export const useDataUsageQuery = () => {
  return useQuery<DataUsageResponse>({
    queryKey: ['data-usage'],
    queryFn: getDataUsage,
  });
}; 