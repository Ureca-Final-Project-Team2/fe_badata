import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { motion, useAnimation, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';

import { useRafThrottle } from '@/features/rental/map/hooks/useRafThrottleHooks';
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
  onLoadMore?: () => void;
  onSortClick?: () => void;
  currentSort?: string;
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
  const lastOpenRef = useRef(false);
  const controls = useAnimation();

  // 1) 위치를 state가 아니라 motionValue로 (드래그 중 React 렌더 0회)
  const y = useMotionValue(0);
  const heightMV = useTransform(y, (v) => `calc(${windowHeight}px - ${v}px)`);

  // 포지션 프리셋
  const calculatedValues = useMemo(() => {
    const expandedY = windowHeight > 0 ? 60 : 0;
    const middleY = windowHeight > 0 ? windowHeight * 0.3 : 0;
    const collapsedY = windowHeight > 0 ? windowHeight * 0.8 : 0;
    return { expandedY, middleY, collapsedY };
  }, [windowHeight]);

  // 최초 높이 측정 & 초기 위치(접힘)
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const h = window.innerHeight;
      setWindowHeight(h);
      y.set(h * 0.8);
    }
  }, [y]);

  // 열림/닫힘에 따라 위치 애니메이션
  useEffect(() => {
    if (windowHeight === 0) return;

    if (open !== lastOpenRef.current) {
      lastOpenRef.current = !!open;

      if (open) {
        controls.start({
          y: calculatedValues.expandedY,
          transition: { type: 'spring', damping: 25, stiffness: 200 },
        });
        y.set(calculatedValues.expandedY);
      } else {
        controls.start({
          y: calculatedValues.collapsedY,
          transition: { type: 'spring', damping: 25, stiffness: 200 },
        });
        y.set(calculatedValues.collapsedY);
      }
    }
  }, [open, windowHeight, calculatedValues, controls, y]);

  // Virtuoso의 endReached → 패칭 트리거
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) onLoadMore?.();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  // 2) 드래그 중 위치 업데이트: rAF로 프레임당 1회 반영
  const onDragRaf = useRafThrottle<[MouseEvent | TouchEvent | PointerEvent, PanInfo]>(
    (_evt, info) => {
      const next = Math.max(0, Math.min(info.point.y, windowHeight));
      y.set(next);
    },
  );

  const handleDragEnd = (_: unknown, info: { point: { y: number } }) => {
    const { y: py } = info.point;
    const threshold = 50;

    if (py < calculatedValues.middleY - threshold) {
      controls.start({
        y: calculatedValues.expandedY,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
      y.set(calculatedValues.expandedY);
    } else if (py > calculatedValues.middleY + threshold) {
      controls.start({
        y: calculatedValues.collapsedY,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
      y.set(calculatedValues.collapsedY);
      onClose?.();
    } else {
      controls.start({
        y: calculatedValues.middleY,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
      y.set(calculatedValues.middleY);
    }
  };

  const handleSortClick = () => onSortClick?.();

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

  if (!open) return null;

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: windowHeight }}
      dragElastic={0.1}
      onDrag={onDragRaf} // ← rAF로 배치
      onDragEnd={handleDragEnd}
      initial={false}
      animate={controls}
      style={{
        y, // transform: translateY(...) (GPU 경로)
        height: heightMV, // 파생 height만 업데이트 (계산은 내부에서)
        willChange: 'transform,height',
        minHeight: '200px',
        zIndex: 40,
      }}
      className="fixed left-0 right-0 bottom-0 pointer-events-auto w-full max-w-[428px] mx-auto rounded-t-2xl border border-light-gray flex flex-col bg-[var(--main-2)]"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        <div className="flex items-center justify-start">
          <button className="flex items-center gap-2 cursor-pointer" onClick={handleSortClick}>
            <ArrowUpDown size={20} className="text-[var(--black)] font-body-semibold" />
            <div className="font-body-semibold text-[var(--black)]">
              {getSortLabel(currentSort)}
            </div>
          </button>
        </div>
      </div>

      {/* List (가상 스크롤) */}
      <div className="flex-1 pb-36 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 px-4 pt-8 pb-6 min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            <div className="text-center text-[var(--gray-dark)]">스토어 목록을 불러오는 중...</div>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 px-4 pt-8 pb-6 min-h-[200px]">
            <div className="text-center text-[var(--red-main)]">
              에러가 발생했습니다: {error?.message || '알 수 없는 오류'}
            </div>
          </div>
        ) : storeList && storeList.length > 0 ? (
          <Virtuoso
            data={storeList}
            computeItemKey={(_, card) => card.id}
            increaseViewportBy={{ top: 400, bottom: 800 }}
            itemContent={(_, card) => (
              <div className="flex items-center justify-center px-4 pt-3 pb-3">
                <div className="w-full">
                  <StoreCard {...card} />
                </div>
              </div>
            )}
            endReached={handleEndReached}
            components={{
              Footer: () =>
                isFetchingNextPage ? (
                  <div className="text-center text-[var(--gray-dark)] py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2" />
                    더 많은 스토어를 불러오는 중...
                  </div>
                ) : hasNextPage ? (
                  <div className="h-6" />
                ) : (
                  <div className="text-center text-[var(--gray-dark)] py-4">
                    모든 스토어를 불러왔습니다.
                  </div>
                ),
            }}
            // defaultItemHeight={136}
          />
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
