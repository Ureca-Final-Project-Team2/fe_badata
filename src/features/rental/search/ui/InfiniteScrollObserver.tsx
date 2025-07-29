import React, { useCallback, useEffect, useRef } from 'react';

// 무한스크롤 관찰자 컴포넌트
const InfiniteScrollObserver = React.memo(
  ({
    hasNext,
    isLoadingMore,
    onLoadMore,
  }: {
    hasNext: boolean;
    isLoadingMore: boolean;
    onLoadMore?: () => void;
  }) => {
    const observerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer를 사용한 무한스크롤
    const handleObserver = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasNext && !isLoadingMore && onLoadMore) {
          try {
            onLoadMore();
          } catch (error) {
            console.error('Failed to load more items:', error);
          }
        }
      },
      [hasNext, isLoadingMore, onLoadMore],
    );

    useEffect(() => {
      const element = observerRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(handleObserver, {
        threshold: 0.1,
      });

      observer.observe(element);

      return () => observer.disconnect();
    }, [handleObserver]);

    if (!hasNext) return null;

    return (
      <div ref={observerRef} className="py-4 text-center">
        {isLoadingMore ? (
          <p className="text-[var(--gray-dark)]">더 많은 결과를 불러오는 중...</p>
        ) : (
          <div className="h-4" /> // 관찰자 역할만 하는 빈 요소
        )}
      </div>
    );
  },
);

InfiniteScrollObserver.displayName = 'InfiniteScrollObserver';

export default InfiniteScrollObserver;
