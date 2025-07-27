import { useCallback, useEffect, useRef, useState } from 'react';

import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';

import { StoreCard } from '@/pages/rental/map/ui/StoreCard';

import type { DragBottomSheetProps } from '@/pages/rental/map/lib/types';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 무한 스크롤 핸들러
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !onLoadMore || isFetchingNextPage || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 하단 100px 전에 로드

    if (isNearBottom) {
      onLoadMore();
    }
  }, [onLoadMore, isFetchingNextPage, hasNextPage]);

  // windowHeight가 설정된 후에 계산하도록 수정
  const expandedY = windowHeight > 0 ? 60 : 0; // header 높이
  const middleY = windowHeight > 0 ? windowHeight * 0.5 : 0; // 중간 높이
  const collapsedY = windowHeight > 0 ? windowHeight * 0.8 : 0; // 접힌 높이 (80% 아래)

  // 초기 상태는 collapsed로 설정
  const y = useMotionValue(collapsedY);
  const controls = useAnimation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const height = window.innerHeight;
      setWindowHeight(height);
      console.log('Window height set to:', height);
    }
  }, []);

  useEffect(() => {
    if (windowHeight === 0) return;

    const targetY = open ? expandedY : collapsedY; // 목록보기 버튼 클릭 시 header까지 올라가도록
    console.log('🎯 DragDrawer 상태 변경:', { open, targetY, expandedY, collapsedY, windowHeight });

    // 애니메이션으로 부드럽게 이동
    controls.start({
      y: targetY,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    });
  }, [open, controls, windowHeight, expandedY, collapsedY]);

  const handleDragEnd = (_: unknown, info: { point: { y: number } }) => {
    console.log('Drag ended at:', info.point.y, 'middleY:', middleY);

    if (info.point.y < middleY) {
      controls.start({ y: expandedY });
    } else if (info.point.y > middleY + 80) {
      controls.start({ y: collapsedY });
      onClose?.();
    } else {
      controls.start({ y: middleY });
    }
  };

  if (windowHeight === 0) {
    console.log('WindowHeight is 0, waiting for height...');
    // windowHeight가 0일 때도 렌더링하되, 높이는 0으로 설정
    return (
      <motion.div
        className="fixed left-0 right-0 bottom-0 z-40 pointer-events-auto w-full max-w-[428px] mx-auto rounded-t-2xl border border-light-gray flex flex-col bg-[var(--main-2)]"
        style={{ height: 0 }}
      />
    );
  }

  const handleSortClick = () => {
    console.log('정렬 기준 클릭');
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
      dragConstraints={{ top: expandedY, bottom: collapsedY }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={controls}
      style={{
        y,
        height: `calc(${windowHeight}px - ${y.get()}px)`,
        minHeight: '200px', // 최소 높이 설정
      }}
      className="fixed left-0 right-0 bottom-0 z-40 pointer-events-auto w-full max-w-[428px] mx-auto rounded-t-2xl border border-light-gray flex flex-col bg-[var(--main-2)]"
    >
      {/* Header 부분 */}
      <div className="px-4 pt-4 pb-2">
        <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleSortClick}>
          <ArrowUpDown size={20} className="text-[var(--black)] font-body-semibold" />
          <div className="font-body-semibold text-[var(--black)]">{getSortLabel(currentSort)}</div>
        </div>
      </div>

      {/* StoreCard 리스트 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 mb-35 overflow-y-auto custom-scrollbar"
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 px-4 pt-3 pb-6">
            <div className="text-center text-gray-500">스토어 목록을 불러오는 중...</div>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3 px-4 pt-3 pb-6">
            <div className="text-center text-red-500">
              에러가 발생했습니다: {error?.message || '알 수 없는 오류'}
            </div>
          </div>
        ) : storeList && storeList.length > 0 ? (
          <div className="flex flex-col items-center gap-3 px-4 pt-3 pb-6">
            {(() => {
              console.log('🎴 StoreCard 렌더링:', { storeListLength: storeList.length, storeList });
              return null;
            })()}
            {storeList.map((store, idx) => (
              <StoreCard key={store.id || idx} {...store} />
            ))}
            {/* 무한 스크롤 로딩 인디케이터 */}
            {isFetchingNextPage && (
              <div className="text-center text-[var(--gray-dark)] py-4">
                더 많은 스토어를 불러오는 중...
              </div>
            )}
            {/* 더 이상 데이터가 없을 때 */}
            {!hasNextPage && storeList.length > 0 && (
              <div className="text-center text-[var(--gray-dark)] py-4">
                모든 스토어를 불러왔습니다.
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-4 pt-3 pb-6">
            <div className="text-center text-[var(--gray-dark)]">표시할 스토어가 없습니다.</div>
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};
