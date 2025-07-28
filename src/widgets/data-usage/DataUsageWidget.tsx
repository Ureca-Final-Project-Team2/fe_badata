import React, { forwardRef } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

const widgetVariants = cva(
  'w-full rounded-[16px] bg-white p-4 shadow-sm border border-[var(--gray-light)]',
);

export interface DataUsageWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string;
  planName: string;
  remainingData: number;
  totalData: number;
  unit?: string;
}

export const DataUsageWidget = forwardRef<HTMLDivElement, DataUsageWidgetProps>(
  (
    {
      className,
      userName,
      planName,
      remainingData,
      totalData,
      unit = 'GB',
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.round((remainingData / totalData) * 100), 100);
    const formattedUsage = `${remainingData}${unit} / ${totalData}${unit}`;

    return (
      <div className={cn(widgetVariants(), className)} ref={ref} {...props}>
        <div className="flex flex-col gap-3">
          {/* 사용자 정보 */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-black font-semibold text-[16px] leading-tight">{userName}</p>
              <p className="text-[12px] text-[var(--gray-mid)] mt-[2px]">{planName}</p>
            </div>
          </div>

          {/* 데이터 사용량 */}
          <div>
            <p className="text-[12px] text-black mb-[2px]">남은 데이터</p>
            <p className="text-[11px] text-[var(--main-5)] mb-[4px]">{formattedUsage}</p>
            <div className="w-full h-[6px] rounded-full bg-[var(--gray-light)]">
              <div
                className="h-full rounded-full bg-[var(--main-5)] transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

DataUsageWidget.displayName = 'DataUsageWidget'; 