import { COIN_SOURCE_CONFIG } from '@/features/mypage/coin-history/lib/constants';

import type { CoinHistoryItem } from '@/features/mypage/coin-history/lib/types';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

export const getSourceText = (source: string) => {
  return COIN_SOURCE_CONFIG[source as keyof typeof COIN_SOURCE_CONFIG]?.text || '기타';
};

export const getSourceIcon = (source: string): string | { src: string; width: number; height: number } => {
  return COIN_SOURCE_CONFIG[source as keyof typeof COIN_SOURCE_CONFIG]?.icon || '💰';
};

export const isPositiveTransaction = (source: string) => {
  return COIN_SOURCE_CONFIG[source as keyof typeof COIN_SOURCE_CONFIG]?.isPositive || false;
};

// 잔액 계산 로직을 유틸리티 함수로 분리
export const calculateBalanceHistory = (
  items: CoinHistoryItem[],
  currentBalance: number
): (CoinHistoryItem & { calculatedBalance: number })[] => {
  return items.map((item, index) => {
    // 현재 사용자의 코인 잔액에서 시작
    let balance = currentBalance;

    // 현재 내역부터 역순으로 계산하여 각 시점의 잔액 구하기
    for (let i = 0; i <= index; i++) {
      const currentItem = items[i];
      const isPositive = isPositiveTransaction(currentItem.coinSource);
      
      if (isPositive) {
        // 획득한 코인은 현재 잔액에서 빼서 이전 시점의 잔액 계산
        balance -= Math.abs(currentItem.usedCoin);
      } else {
        // 사용한 코인은 현재 잔액에 더해서 이전 시점의 잔액 계산
        balance += Math.abs(currentItem.usedCoin);
      }
    }

    // 각 거래 후의 잔액을 계산
    const isPositive = isPositiveTransaction(item.coinSource);
    let finalBalance = balance;
    
    if (isPositive) {
      // 획득한 거래의 경우, 해당 거래 후의 잔액 = 이전 잔액 + 획득 코인
      finalBalance = balance + Math.abs(item.usedCoin);
    } else {
      // 사용한 거래의 경우, 해당 거래 후의 잔액 = 이전 잔액 - 사용 코인
      finalBalance = balance - Math.abs(item.usedCoin);
    }

    return {
      ...item,
      calculatedBalance: Math.max(0, finalBalance),
    };
  });
};
