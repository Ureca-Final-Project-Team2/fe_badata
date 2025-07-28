import React from 'react';

import { DataUsageWidget } from '../DataUsageWidget';
import { useDataUsageQuery } from '../model/queries';

export const DataUsageWidgetContainer: React.FC = () => {
  const { data, isLoading, error } = useDataUsageQuery();

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
      </div>
    );
  }

  const { userName, planName, remainingData, totalData, unit } = data.content;

  return (
    <DataUsageWidget
      userName={userName}
      planName={planName}
      remainingData={remainingData}
      totalData={totalData}
      unit={unit}
    />
  );
}; 