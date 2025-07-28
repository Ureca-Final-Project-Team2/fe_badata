import { formatDate, getSourceIcon, getSourceText } from '@/pages/mypage/coin-history/lib/utils';

import type { CoinHistoryItem as CoinHistoryItemType } from '@/pages/mypage/coin-history/lib/types';

interface CoinHistoryItemProps {
  item: CoinHistoryItemType;
}

export function CoinHistoryItem({ item }: CoinHistoryItemProps) {
  return (
    <div className="bg-[var(--white)] rounded-xl p-4 border-2 border-[var(--gray-light)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-lg">{getSourceIcon(item.coinSource)}</span>
          <span className="font-label-medium text-[var(--black)]">
            {getSourceText(item.coinSource)}
          </span>
        </div>
        <span
          className={`font-label-semibold ${item.usedCoin < 0 ? 'text-[var(--red)]' : 'text-[var(--green)]'}`}
        >
          {item.usedCoin > 0 ? '+' : ''}
          {item.usedCoin} 코인
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-small-regular text-[var(--gray-dark)]">
          {formatDate(item.createdAt)}
        </span>
        <span className="font-small-medium text-[var(--gray-dark)]">
          전체 {item.totalCoin} 코인
        </span>
      </div>
    </div>
  );
} 