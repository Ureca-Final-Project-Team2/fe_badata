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
 // 현재 잔액에서 모든 거래를 역산하여 초기 잔액 계산
  let initialBalance = currentBalance;
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    const isPositive = isPositiveTransaction(item.coinSource);
    if (isPositive) {
      initialBalance -= Math.abs(item.usedCoin);
    } else {
      initialBalance += Math.abs(item.usedCoin);
    }
  }
  
  // 초기 잔액부터 순방향으로 각 거래 후 잔액 계산
  let runningBalance = Math.max(0, initialBalance);
  return items.map((item) => {
    const isPositive = isPositiveTransaction(item.coinSource);
    if (isPositive) {
      runningBalance += Math.abs(item.usedCoin);
    } else {
      runningBalance -= Math.abs(item.usedCoin);
    }
    
    return {
      ...item,
      calculatedBalance: Math.max(0, runningBalance),
    };
  });
};