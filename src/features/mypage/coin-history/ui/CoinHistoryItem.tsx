import { COIN_SOURCE_CONFIG, formatDate } from '../lib/constants';

import type { CoinSource } from '@/features/mypage/coin-history/lib/constants';
import type { CoinHistoryItem as CoinHistoryItemType } from '@/features/mypage/coin-history/lib/types';

interface CoinHistoryItemProps {
  item: CoinHistoryItemType;
}

export function CoinHistoryItem({ item }: CoinHistoryItemProps) {
  const isValidCoinSource = (source: string): source is CoinSource =>
    Object.keys(COIN_SOURCE_CONFIG).includes(source);

  const source = isValidCoinSource(item.coinSource) ? item.coinSource : 'REVIEW_REWARD'; // fallback
  const { isPositive, text: sourceText } = COIN_SOURCE_CONFIG[source];

  const displayAmount = isPositive ? `+${item.usedCoin}` : `-${Math.abs(item.usedCoin)}`;
  const amountColor = isPositive ? 'text-[var(--main-5)]' : 'text-[var(--red)]';
  const displayDate = formatDate(item.createdAt);
  const totalCoinText = item.totalCoin !== null ? `전체 ${item.totalCoin} 코인` : '';

  return (
    <div className="space-y-2">
      <p className="font-small-regular text-[var(--gray-dark)] px-1">{displayDate}</p>

      <div className="bg-[var(--white)] rounded-xl border border-[var(--gray)] px-4 py-3 flex items-center justify-between">
        <span className="font-label-regular text-[var(--black)]">{sourceText}</span>

        <div className="flex flex-col items-end">
          <span className={`font-label-semibold ${amountColor}`}>{displayAmount} 코인</span>
          {item.totalCoin !== null && (
            <span className="font-small-regular text-[var(--gray-dark)]">{totalCoinText}</span>
          )}
        </div>
      </div>
    </div>
  );
}
