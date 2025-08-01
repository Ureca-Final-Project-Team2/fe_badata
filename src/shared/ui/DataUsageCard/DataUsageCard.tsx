import React, { forwardRef } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

const cardWrapperVariants = cva(
  'w-full h-[225px] rounded-[20px] bg-white p-4 flex flex-col justify-between shadow-sm',
);

export interface DataUsageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  phoneMasked: string;
  planName: string;
  chargeLabel?: string;
  billMonth: string;
  billStatus: string;
  billAmount: string;
  remainingLabel: string;
  totalAmount: string;
  totalValue: number;
  remainingValue: number;
}

export const DataUsageCard = forwardRef<HTMLDivElement, DataUsageCardProps>(
  (
    {
      className,
      phoneMasked,
      planName,
      chargeLabel = '충전',
      billMonth,
      billStatus,
      billAmount,
      remainingLabel,
      totalAmount,
      totalValue,
      remainingValue,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.round((remainingValue / totalValue) * 100), 100);

    const unit = typeof totalAmount === 'string' ? totalAmount.replace(/\d+/g, '') : '';

    const formattedUsage =
      typeof remainingValue === 'number' && typeof totalValue === 'number' && unit
        ? `${remainingValue}${unit} / ${totalValue}${unit}`
        : '-';

    return (
      <div className={cn(cardWrapperVariants(), className)} ref={ref} {...props}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-black font-semibold text-[16px] leading-tight">{phoneMasked}</p>
            <p className="text-[12px] text-[var(--gray-mid)] mt-[2px]">{planName}</p>
          </div>

          <div className="w-[86px]">
            <button
              className="w-full py-1 rounded-full bg-[var(--main-5)] text-white text-[16px] font-title-regular text-center"
              type="button"
            >
              {chargeLabel}
            </button>
          </div>
        </div>

        <div className="border-t border-[var(--gray-light)] my-3" />

        <div className="text-[12px] text-[var(--gray-dark)]">
          <div className="flex justify-between mb-1">
            <div>
              <p className="text-black text-[13px] font-medium">{billMonth}</p>
              <p className="text-[11px] text-[var(--gray-mid)]">{billStatus}</p>
            </div>
            <p className="text-black font-semibold text-[15px]">{billAmount}</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[12px] text-black mb-[2px]">{remainingLabel}</p>
          <p className="text-[11px] text-[var(--main-5)] mb-[4px]">{formattedUsage}</p>
          <div className="w-full h-[6px] rounded-full bg-[var(--gray-light)]">
            <div
              className="h-full rounded-full bg-[var(--main-5)] transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  },
);

DataUsageCard.displayName = 'DataUsageCard';
