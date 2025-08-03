import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

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

  // 무한 스크롤 핸들러
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !onLoadMore || isFetchingNextPage || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 하단 100px 전에 로드

    if (isNearBottom) {
      onLoadMore();
    }
  }, [onLoadMore, isFetchingNextPage, hasNextPage]);

  // 새로 로드된 아이템들을 추적하여 애니메이션 적용
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

  // windowHeight가 설정된 후에 계산하도록 수정
  const expandedY = windowHeight > 0 ? 60 : 0; // header 높이
  const middleY = windowHeight > 0 ? windowHeight * 0.5 : 0; // 중간 높이
  const collapsedY = windowHeight > 0 ? windowHeight * 0.8 : 0; // 접힌 높이 (80% 아래)

  const controls = useAnimation();

  console.log('🔍 DragBottomSheet 렌더링:', {
    windowHeight,
    expandedY,
    middleY,
    collapsedY,
    open,
    currentY,
    lastOpenRef: lastOpenRef.current,
  });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const height = window.innerHeight;
      console.log('🔍 useLayoutEffect windowHeight 설정:', height);
      setWindowHeight(height);
      setCurrentY(height); // 초기값을 windowHeight로 설정
    }
  }, []);

  useEffect(() => {
    console.log('🔍 useEffect 실행:', {
      windowHeight,
      open,
      expandedY,
      middleY,
      collapsedY,
      currentY,
      lastOpenRef: lastOpenRef.current,
    });

    if (windowHeight === 0) {
      console.log('🔍 windowHeight가 0이므로 return');
      return;
    }

    // open 상태가 변경되었을 때만 애니메이션 실행
    if (open !== lastOpenRef.current) {
      console.log('🔍 open 상태 변경 감지:', { open, lastOpen: lastOpenRef.current });
      lastOpenRef.current = open || false;

      if (open) {
        // 목록보기 버튼을 클릭했을 때 expanded 상태로 열림
        const targetY = expandedY;
        console.log('🔍 DragBottomSheet 열기:', targetY);

        setCurrentY(targetY);
        controls.start({
          y: targetY,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          },
        });
      } else {
        // 목록보기 버튼을 클릭하지 않았을 때는 완전히 숨김
        const targetY = windowHeight;
        console.log('🔍 DragBottomSheet 닫기:', targetY);

        setCurrentY(targetY);
        controls.start({
          y: targetY,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
          },
        });
      }
    }
  }, [open, controls, windowHeight, expandedY]);

  const handleDragEnd = (_: unknown, info: { point: { y: number } }) => {
    console.log('🔍 handleDragEnd 실행:', info.point.y, 'middleY:', middleY);

    if (info.point.y < middleY) {
      // 위쪽으로 드래그하면 expanded 상태
      console.log('🔍 expanded 상태로 이동');
      const targetY = expandedY;
      setCurrentY(targetY);
      controls.start({ y: targetY });
    } else if (info.point.y > middleY + 80) {
      // 아래쪽으로 드래그하면 완전히 닫힘
      console.log('🔍 완전히 닫힘');
      const targetY = windowHeight;
      setCurrentY(targetY);
      controls.start({ y: targetY });
      onClose?.();
    } else {
      // 중간 영역이면 middle 상태
      console.log('🔍 middle 상태로 이동');
      const targetY = middleY;
      setCurrentY(targetY);
      controls.start({ y: targetY });
    }
  };

  // 데이터가 로딩 중이거나 빈 배열이어도 항상 렌더링
  if (windowHeight === 0) {
    // windowHeight가 0일 때도 렌더링하되, 높이는 0으로 설정
    return (
      <motion.div
        className="fixed left-0 right-0 bottom-0 z-40 pointer-events-auto w-full max-w-[428px] mx-auto rounded-t-2xl border border-light-gray flex flex-col bg-[var(--main-2)]"
        style={{ height: 0 }}
      />
    );
  }

  // 데이터가 로딩 중이거나 빈 배열이어도 항상 렌더링

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

  // overlay div 제거!
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
      }}
      className="fixed left-0 right-0 bottom-0 z-40 pointer-events-auto w-full max-w-[428px] mx-auto rounded-t-2xl border border-light-gray flex flex-col bg-[var(--main-2)]"
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
        className="flex-1 mb-35 overflow-y-auto custom-scrollbar"
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
