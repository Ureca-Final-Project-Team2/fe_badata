import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { motion, useAnimation } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';

import { StoreCard } from '@/features/rental/map/ui/StoreCard';

import type { DragBottomSheetProps } from '@/features/rental/map/lib/types';

interface ExtendedDragBottomSheetProps extends DragBottomSheetProps {
  open?: boolean;
  onClose?: () => void;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isError?: boolean;
  error?: Error | null;
  onLoadMore?: () => void; // 무한 스크롤을 위한 콜백 추가
  onSortClick?: () => void; // 정렬 기준 클릭 핸들러
  currentSort?: string; // 현재 정렬 기준
}

export const DragBottomSheet = ({
  open,
  onClose,
  children,
  storeList,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  isError = false,
  error = null,
  onLoadMore,
  onSortClick,
  currentSort = 'distance,asc',
}: ExtendedDragBottomSheetProps) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const lastOpenRef = useRef(false); // useRef로 이전 상태 추적
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const [lastStoreCount, setLastStoreCount] = useState(0);
  const renderCountRef = useRef(0);

  // 메모이제이션된 계산값들
  const calculatedValues = useMemo(() => {
    const expandedY = windowHeight > 0 ? 60 : 0; // header 높이
    const middleY = windowHeight > 0 ? windowHeight * 0.3 : 0; // 중간 높이를 30%로 조정
    const collapsedY = windowHeight > 0 ? windowHeight * 0.8 : 0; // 접힌 높이 (80% 아래)

    return { expandedY, middleY, collapsedY };
  }, [windowHeight]);

  // 무한 스크롤 핸들러 (디바운싱 적용)
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !onLoadMore || isFetchingNextPage || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 하단 100px 전에 로드

    if (isNearBottom) {
      onLoadMore();
    }
  }, [onLoadMore, isFetchingNextPage, hasNextPage]);

  // 새로 로드된 아이템들을 추적하여 애니메이션 적용 (메모이제이션)
  useEffect(() => {
    if (storeList && storeList.length > lastStoreCount) {
      const newItems = storeList.slice(lastStoreCount);
      const newAnimatedItems = new Set(animatedItems);

      // 새로 로드된 아이템들을 애니메이션 대상으로 추가
      newItems.forEach((store, index) => {
        const itemKey = `${store.id || `item-${lastStoreCount + index}`}`;
        newAnimatedItems.add(itemKey);
      });

      setAnimatedItems(newAnimatedItems);
      setLastStoreCount(storeList.length);
    }
  }, [storeList, lastStoreCount, animatedItems]);

  const controls = useAnimation();

  // 렌더링 횟수 제한 (개발 환경에서만)
  renderCountRef.current += 1;

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const height = window.innerHeight;
      setWindowHeight(height);
      // 초기값을 collapsed 상태로 설정 (닫힌 상태)
      setCurrentY(height * 0.8);
    }
  }, []);

  useEffect(() => {
    if (windowHeight === 0) {
      return;
    }

    // open 상태가 변경되었을 때만 애니메이션 실행
    if (open !== lastOpenRef.current) {
      lastOpenRef.current = open || false;

      if (open) {
        // 열린 상태로 애니메이션
        controls.start({
          y: calculatedValues.expandedY,
          transition: { type: 'spring', damping: 25, stiffness: 200 },
        });
        setCurrentY(calculatedValues.expandedY);
      } else {
        // 닫힌 상태로 애니메이션
        controls.start({
          y: calculatedValues.collapsedY,
          transition: { type: 'spring', damping: 25, stiffness: 200 },
        });
        setCurrentY(calculatedValues.collapsedY);
        // open이 false로 변경될 때 onClose 호출하지 않음 (무한 루프 방지)
      }
    }
  }, [open, windowHeight, calculatedValues, controls]);

  const handleDragEnd = (_: unknown, info: { point: { y: number } }) => {
    const { y } = info.point;
    const threshold = 50; // 드래그 임계값

    // 현재 위치에 따라 상태 결정
    if (y < calculatedValues.middleY - threshold) {
      // 위쪽으로 드래그하면 expanded 상태
      controls.start({
        y: calculatedValues.expandedY,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
      setCurrentY(calculatedValues.expandedY);
    } else if (y > calculatedValues.middleY + threshold) {
      // 아래쪽으로 드래그하면 collapsed 상태 (닫기)
      controls.start({
        y: calculatedValues.collapsedY,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
      setCurrentY(calculatedValues.collapsedY);
      // 드래그로 닫을 때 onClose 호출
      onClose?.();
    } else {
      // 중간 영역이면 middle 상태로 이동
      controls.start({
        y: calculatedValues.middleY,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
      setCurrentY(calculatedValues.middleY);
    }
  };

  const handleSortClick = () => {
    onSortClick?.();
  };

  const getSortLabel = (sortType: string) => {
    switch (sortType) {
      case 'distance,asc':
        return '거리순';
      case 'reviewCount,desc':
        return '리뷰순';
      case 'likeCount,desc':
        return '좋아요순';
      default:
        return '거리순';
    }
  };

  // open이 false이면 렌더링하지 않음
  if (!open) {
    return null;
  }

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: windowHeight }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={controls}
      style={{
        y: currentY,
        height: `calc(${windowHeight}px - ${currentY}px)`,
        minHeight: '200px', // 최소 높이 설정
        zIndex: 40, // 명시적으로 z-index 설정
      }}
      className="fixed left-0 right-0 bottom-0 pointer-events-auto w-full max-w-[428px] mx-auto rounded-t-2xl border border-light-gray flex flex-col bg-[var(--main-2)]"
    >
      {/* Header 부분 */}
      <div className="px-4 pt-4 pb-2">
        <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        <div className="flex items-center justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleSortClick}>
            <ArrowUpDown size={20} className="text-[var(--black)] font-body-semibold" />
            <div className="font-body-semibold text-[var(--black)]">
              {getSortLabel(currentSort)}
            </div>
          </div>
        </div>
      </div>

      {/* StoreCard 리스트 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 pb-36 overflow-y-auto custom-scrollbar"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 px-4 pt-8 pb-6 min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <div className="text-center text-[var(--gray-dark)]">스토어 목록을 불러오는 중...</div>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 px-4 pt-8 pb-6 min-h-[200px]">
            <div className="text-center text-[var(--red-main)]">
              에러가 발생했습니다: {error?.message || '알 수 없는 오류'}
            </div>
          </div>
        ) : storeList && storeList.length > 0 ? (
          <div className="flex flex-col items-center gap-3 px-4 pt-3 pb-6">
            {storeList.map((store, idx) => {
              const itemKey = `${store.id || `item-${idx}`}`;
              const isNewItem = animatedItems.has(itemKey);
              const isInitialLoad = idx < 5; // 초기 로드된 아이템들

              // 초기 로드된 아이템들은 순차 애니메이션, 새로 로드된 아이템들은 즉시 애니메이션
              const staggerClass = isInitialLoad
                ? `animate-stagger-${Math.min(idx + 1, 5)}`
                : 'animate-slide-in-up';

              // 새로 로드된 아이템들은 즉시 애니메이션 적용
              const animationClass =
                isNewItem && !isInitialLoad
                  ? 'animate-slide-in-up animate-fade-in'
                  : `animate-slide-in-up ${staggerClass}`;

              return (
                <div key={itemKey} className={`w-full ${animationClass}`}>
                  <StoreCard {...store} />
                </div>
              );
            })}
            {/* 무한 스크롤 로딩 인디케이터 */}
            {isFetchingNextPage && (
              <div className="text-center text-[var(--gray-dark)] py-4 animate-fade-in">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                더 많은 스토어를 불러오는 중...
              </div>
            )}
            {/* 더 이상 데이터가 없을 때 */}
            {!hasNextPage && storeList.length > 0 && (
              <div className="text-center text-[var(--gray-dark)] py-4 animate-fade-in">
                모든 스토어를 불러왔습니다.
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 px-4 pt-8 pb-6 min-h-[200px]">
            <div className="text-center text-[var(--gray-dark)]">표시할 스토어가 없습니다.</div>
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};
