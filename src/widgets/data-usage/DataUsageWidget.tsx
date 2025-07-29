import React, { forwardRef } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

const widgetVariants = cva(
  'w-full rounded-[16px] bg-white p-4 shadow-sm border border-[var(--gray-light)]',
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
    const remainingData = totalDataAmount - dataAmount;
    const percentage = Math.min(Math.round((remainingData / totalDataAmount) * 100), 100);
    const formattedUsage = `${remainingData}GB / ${totalDataAmount}GB`;

    return (
      <div className={cn(widgetVariants(), className)} ref={ref} {...props}>
        <div className="flex flex-col gap-3">
          {/* 사용자 정보 */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-body-semibold text-[var(--black)]">{nickname}</p>
              <p className="font-caption-regular text-[var(--gray-mid)] mt-[2px]">{planName}</p>
            </div>
          </div>

          {/* 데이터 사용량 */}
          <div>
            <p className="font-body-regular text-[var(--black)] mb-[2px]">남은 데이터</p>
            <p className="font-small-semibold text-[var(--main-5)] mb-[4px]">{formattedUsage}</p>
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