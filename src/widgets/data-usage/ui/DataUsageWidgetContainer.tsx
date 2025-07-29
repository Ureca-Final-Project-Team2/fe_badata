import React from 'react';

import { DataUsageWidget } from '../DataUsageWidget';
import { useDataUsageQuery } from '../model/queries';

export const DataUsageWidgetContainer: React.FC = () => {
  const { data, isLoading, error } = useDataUsageQuery();

  // 디버깅을 위한 로그
  console.log('DataUsageWidgetContainer - isLoading:', isLoading);
  console.log('DataUsageWidgetContainer - error:', error);
  console.log('DataUsageWidgetContainer - data:', data);

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
    console.log('DataUsageWidgetContainer - Error or no data:', { error, data });
    return (
      <div className="w-full rounded-[16px] bg-white p-4 shadow-sm border border-[var(--gray-light)]">
        <div className="text-center text-gray-500">
          데이터 사용량을 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  const { nickname, planName, totalDataAmount, dataAmount } = data.content;
  
  // 디버깅을 위한 로그
  console.log('DataUsageWidgetContainer - Extracted data:', { nickname, planName, totalDataAmount, dataAmount });

  return (
    <DataUsageWidget
      nickname={nickname}
      planName={planName}
      totalDataAmount={totalDataAmount}
      dataAmount={dataAmount}
    />
  );
}; 