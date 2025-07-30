import React, { forwardRef } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

const widgetVariants = cva(
  'w-full rounded-[20px] p-6 shadow-lg border border-[var(--gray-light)] bg-gradient-to-br from-[var(--main-1)] via-[var(--main-2)] to-[var(--main-3)]',
);

export interface DataUsageWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  nickname: string;
  planName: string;
  totalDataAmount: number;
  dataAmount: number;
}

export const DataUsageWidget = forwardRef<HTMLDivElement, DataUsageWidgetProps>(
  (
    {
      className,
      nickname,
      planName,
      totalDataAmount,
      dataAmount,
      ...props
    },
    ref,
  ) => {
    const remainingData = Math.max(totalDataAmount - dataAmount, 0);
    const percentage = totalDataAmount > 0 ? Math.min(Math.round((remainingData / totalDataAmount) * 100), 100) : 0;
    const formattedUsage = `${remainingData}GB / ${totalDataAmount}GB`;

    return (
      <div className={cn(widgetVariants(), className)} ref={ref} {...props}>
        <div className="flex flex-col gap-6">
          {/* 헤더 섹션 */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              {/* 사용자 이름 */}
              <h3 className="font-body-semibold text-[var(--black)] text-lg leading-tight">{nickname}</h3>
              
              {/* 요금제 정보 */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--main-5)] shadow-sm"></div>
                <span className="font-body-bold text-[var(--gray-dark)] leading-tight">{planName}</span>
              </div>
            </div>
          </div>

          {/* 데이터 사용량 섹션 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body-semibold text-[var(--black)] text-base">남은 데이터</span>
              <span className="font-caption-medium text-[var(--main-5)]">{percentage}% 남음</span>
            </div>
            
            {/* 데이터 양 표시 */}
            <div className="text-center">
              <p className="font-body-bold text-[var(--main-5)] text-2xl leading-none mb-1">{formattedUsage}</p>
            </div>
            
            {/* 진행률 바 */}
            <div className="space-y-2">
              <div className="relative w-full h-3 rounded-full bg-[var(--main-1)] overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--main-4)] to-[var(--main-5)] transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${percentage}%` }}
                />
                {/* 파도 효과 레이어 */}
                <div
                  className="absolute top-0 h-full rounded-full bg-gradient-to-r from-[var(--main-3)] to-[var(--main-4)] opacity-70 transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(percentage - 15, 0)}%` }}
                />
                <div
                  className="absolute top-0 h-1/2 rounded-full bg-gradient-to-r from-white/30 to-transparent opacity-40 transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

DataUsageWidget.displayName = 'DataUsageWidget'; 