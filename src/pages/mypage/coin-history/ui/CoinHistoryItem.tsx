import { formatDate, getSourceIcon, getSourceText, isPositiveTransaction } from '@/pages/mypage/coin-history/lib/utils';

import type { CoinHistoryItem as CoinHistoryItemType } from '@/pages/mypage/coin-history/lib/types';

interface CoinHistoryItemProps {
  item: CoinHistoryItemType;
  calculatedBalance: number;
}

export function CoinHistoryItem({ item, calculatedBalance }: CoinHistoryItemProps) {
  const isPositive = isPositiveTransaction(item.coinSource);
  const displayAmount = isPositive ? Math.abs(item.usedCoin) : -Math.abs(item.usedCoin);
  const amountColor = isPositive ? 'text-[var(--main-5)]' : 'text-[var(--red)]';
  const amountPrefix = isPositive ? '+' : '';

  return (
      <div className="bg-[var(--white)] rounded-xl p-4 border-2 border-[var(--gray-light)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-xl">{getSourceIcon(item.coinSource)}</span>
            <span className="font-label-medium text-[var(--black)]">
            {getSourceText(item.coinSource)}
          </span>
        </div>
        <span className={`font-label-semibold ${amountColor}`}>
          {amountPrefix}{displayAmount} 코인
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-small-regular text-[var(--gray-dark)]">
          {formatDate(item.createdAt)}
        </span>
        <span className="font-small-regular text-[var(--gray-dark)]">
          전체 {calculatedBalance} 코인
        </span>
      </div>
    </div>
  );
} 