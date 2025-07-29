import React, { useEffect, useState } from 'react';

import { getDataUsage } from '@/widgets/data-usage/api/apis';
import { DataUsageWidget } from '@/widgets/data-usage/DataUsageWidget';

import type { DataUsageResponse } from '@/widgets/data-usage/types';

export const DataUsageWidgetContainer: React.FC = () => {
  const [data, setData] = useState<DataUsageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDataUsage();
      setData(response);
    } catch (err) {
      console.error('Failed to fetch data usage:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full rounded-[16px] bg-white p-4 shadow-sm border border-[var(--gray-light)]">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 bg-gray-200 rounded mb-2"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full rounded-[16px] bg-white p-4 shadow-sm border border-[var(--gray-light)]">
        <div className="text-center text-gray-500">
          데이터 사용량을 불러올 수 없습니다.
        </div>
        <button 
          onClick={fetchData}
          className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const { nickname, planName, totalDataAmount, dataAmount } = data.content;

  return (
    <DataUsageWidget
      nickname={nickname}
      planName={planName}
      totalDataAmount={totalDataAmount}
      dataAmount={dataAmount}
    />
  );
}; 