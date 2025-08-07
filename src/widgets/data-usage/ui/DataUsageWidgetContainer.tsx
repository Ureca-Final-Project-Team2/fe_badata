import React, { useEffect, useState } from 'react';

import { getDataUsage } from '@/widgets/data-usage/api/apis';
import { DataUsageWidget } from '@/widgets/data-usage/DataUsageWidget';

import type { DataUsageResponse } from '@/widgets/data-usage/lib/types';

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
      <div className="w-full rounded-[16px] bg-[var(--white)] p-4 shadow-sm border border-[var(--gray-light)]">
        <div className="animate-pulse">
          <div className="h-4 bg-[var(--gray-light)] rounded mb-2"></div>
          <div className="h-3 bg-[var(--gray-light)] rounded mb-3"></div>
          <div className="h-3 bg-[var(--gray-light)] rounded mb-2"></div>
          <div className="h-2 bg-[var(--gray-light)] rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full rounded-[16px] bg-[var(--white)] p-4 shadow-sm border border-[var(--gray-light)]">
        <div className="text-center text-[var(--gray-dark)]">
          데이터 사용량을 불러올 수 없습니다.
        </div>
        <div className="text-center">
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-[var(--main-5)] text-[var(--white)] rounded-lg font-label-regular"
          >
            다시 시도
          </button>
        </div>
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
