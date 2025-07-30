import Image from 'next/image';

import {
  formatDate,
  getSourceIcon,
  getSourceText,
  isPositiveTransaction,
} from '@/features/mypage/coin-history/lib/utils';

import type { CoinHistoryItem as CoinHistoryItemType } from '@/features/mypage/coin-history/lib/types';

interface CoinHistoryItemProps {
  item: CoinHistoryItemType;
  calculatedBalance?: number;
}

export function CoinHistoryItem({ item, calculatedBalance }: CoinHistoryItemProps) {
  const isPositive = isPositiveTransaction(item.coinSource);
  const displayAmount = isPositive ? Math.abs(item.usedCoin) : -Math.abs(item.usedCoin);
  const amountColor = isPositive ? 'text-[var(--main-5)]' : 'text-[var(--red)]';
  const amountPrefix = isPositive ? '+' : '';
  const icon = getSourceIcon(item.coinSource);
  const isImageIcon = typeof icon === 'object' && icon !== null;
  const isImagePath = typeof icon === 'string' && icon.includes('.png');

  return (
    <div className="bg-[var(--white)] rounded-xl p-4 border-2 border-[var(--gray-light)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {isImageIcon ? (
            <Image
              src={icon}
              alt="아이콘"
              width={24}
              height={24}
              className="object-contain"
              unoptimized
            />
          ) : isImagePath ? (
            <Image
              src={icon}
              alt="아이콘"
              width={24}
              height={24}
              className="object-contain"
              unoptimized
            />
          ) : (
            <span className="text-xl">{icon}</span>
          )}
          <span className="font-label-medium text-[var(--black)]">
            {getSourceText(item.coinSource)}
          </span>
        </div>
        <span className={`font-label-semibold ${amountColor}`}>
          {amountPrefix}
          {displayAmount} 코인
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-small-regular text-[var(--gray-dark)]">
          {formatDate(item.createdAt)}
        </span>
        {calculatedBalance !== undefined && (
          <span className="font-small-regular text-[var(--gray-dark)]">
            전체 {calculatedBalance} 코인
          </span>
        )}
      </div>
    </div>
  );
}
