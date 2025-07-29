import { useCallback, useEffect, useRef } from 'react';

import { isPositiveTransaction } from '@/features/mypage/coin-history/lib/utils';
import { useUserCoinHistoryInfiniteQuery, useUserCoinQuery } from '@/features/mypage/coin-history/model/queries';
import { CoinHistoryItem } from '@/features/mypage/coin-history/ui/CoinHistoryItem';

export function CoinHistoryInfiniteList() {
  const { data: userCoinData } = useUserCoinQuery();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserCoinHistoryInfiniteQuery();

  const observerRef = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }, { threshold: 0.1 });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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

  if (isError) {
    return (
      <div className="bg-[var(--gray-light)] rounded-xl p-8 text-center">
        <p className="font-label-regular text-[var(--gray-dark)]">
          코인 내역을 불러오지 못했습니다.
        </p>
      </div>
    );
  }

  const allItems = data?.pages.flatMap((page) => page.item) || [];

  if (allItems.length === 0) {
    return (
      <div className="bg-[var(--gray-light)] rounded-xl p-8 text-center">
        <p className="font-label-regular text-[var(--gray-dark)]">코인 내역이 없습니다.</p>
      </div>
    );
  }

  // 현재 사용자의 코인 잔액을 기준으로 각 시점의 잔액 계산
  const itemsWithCalculatedBalance = allItems.map((item, index) => {
    // 현재 사용자의 코인 잔액에서 시작
    let balance = userCoinData?.coin || 0;
    
    console.log(`[DEBUG] 현재 잔액: ${balance}, 아이템 ${index + 1}: ${item.coinSource} - ${item.usedCoin}코인`);

    // 현재 내역부터 역순으로 계산하여 각 시점의 잔액 구하기
    for (let i = 0; i <= index; i++) {
      const currentItem = allItems[i];
      const isPositive = isPositiveTransaction(currentItem.coinSource);
      
      if (isPositive) {
        // 획득한 코인은 현재 잔액에서 빼서 이전 시점의 잔액 계산
        balance -= Math.abs(currentItem.usedCoin);
        console.log(`[DEBUG] 획득 거래 처리: ${currentItem.usedCoin}코인 차감, 잔액: ${balance}`);
      } else {
        // 사용한 코인은 현재 잔액에 더해서 이전 시점의 잔액 계산
        balance += Math.abs(currentItem.usedCoin);
        console.log(`[DEBUG] 사용 거래 처리: ${currentItem.usedCoin}코인 추가, 잔액: ${balance}`);
      }
    }

    const finalBalance = Math.max(0, balance);
    console.log(`[DEBUG] 최종 계산된 잔액: ${finalBalance}`);

    return {
      ...item,
      calculatedBalance: finalBalance,
    };
  });

  return (
    <div className="space-y-3">
      {itemsWithCalculatedBalance.map((item, index) => {
        // 마지막 아이템에 ref 추가
        if (index === itemsWithCalculatedBalance.length - 1) {
          return (
            <div key={item.id} ref={lastElementRef}>
              <CoinHistoryItem item={item} calculatedBalance={item.calculatedBalance} />
            </div>
          );
        }
        return <CoinHistoryItem key={item.id} item={item} calculatedBalance={item.calculatedBalance} />;
      })}
      {isFetchingNextPage && (
        <div className="text-center py-4">
          <p className="font-small-regular text-[var(--gray-dark)]">로딩 중...</p>
        </div>
      )}
    </div>
  );
} 