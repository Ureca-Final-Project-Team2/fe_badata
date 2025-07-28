import { CoinHistoryItem } from './CoinHistoryItem';

import type { CoinHistoryResponse } from '@/pages/mypage/coin-history/lib/types';

interface CoinHistoryListProps {
  historyData: CoinHistoryResponse | undefined;
  isLoading: boolean;
}

export function CoinHistoryList({ historyData, isLoading }: CoinHistoryListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-16 bg-[var(--main-1)] rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!historyData?.item || historyData.item.length === 0) {
    return (
      <div className="bg-[var(--gray-light)] rounded-xl p-8 text-center">
        <p className="font-label-regular text-[var(--gray-dark)]">코인 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {historyData.item.map((item) => (
        <CoinHistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
} 