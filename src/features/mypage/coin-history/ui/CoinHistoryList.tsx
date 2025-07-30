import { CoinHistoryItem } from '@/features/mypage/coin-history/ui/CoinHistoryItem';

import type { CoinHistoryResponse } from '@/features/mypage/coin-history/lib/types';

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

  // 현재 잔액에서 역순으로 계산하여 각 시점의 잔액 구하기
  const itemsWithCalculatedBalance = historyData.item.map((item, index) => {
    // 현재 잔액에서 시작 (가장 최근 내역의 totalCoin)
    let balance = historyData.item[0].totalCoin;

    // 현재 내역부터 역순으로 계산
    for (let i = 0; i <= index; i++) {
      const currentItem = historyData.item[i];
      // 현재 내역의 usedCoin을 빼서 이전 시점의 잔액 계산
      balance -= currentItem.usedCoin;
    }

    return {
      ...item,
      calculatedBalance: balance,
    };
  });

  return (
    <div className="space-y-3">
      {itemsWithCalculatedBalance.map((item) => (
        <CoinHistoryItem key={item.id} item={item} calculatedBalance={item.calculatedBalance} />
      ))}
    </div>
  );
}
