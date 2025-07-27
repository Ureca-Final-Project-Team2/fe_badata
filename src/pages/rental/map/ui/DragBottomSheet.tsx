import { useEffect, useState } from 'react';

import { motion, useAnimation, useMotionValue } from 'framer-motion';

import { StoreCard } from '@/pages/rental/map/ui/StoreCard';

import type { DragBottomSheetProps } from '@/pages/rental/map/lib/types';

interface ExtendedDragBottomSheetProps extends DragBottomSheetProps {
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isError?: boolean;
  error?: Error | null;
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
}: ExtendedDragBottomSheetProps) => {
  const [windowHeight, setWindowHeight] = useState(0);

  // windowHeight가 설정된 후에 계산하도록 수정
  const expandedY = windowHeight > 0 ? 60 : 0;
  const middleY = windowHeight > 0 ? windowHeight * 0.5 : 0;
  const collapsedY = windowHeight > 0 ? windowHeight * 0.8 : 0; // 70% 아래로

  const y = useMotionValue(windowHeight > 0 ? collapsedY : 0);
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

    const targetY = open ? middleY : collapsedY;
    controls.start({ y: targetY });
  }, [open, controls, windowHeight, middleY, collapsedY]);

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
    console.log('WindowHeight is 0, not rendering');
    return null;
  }

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
      }}
      className="fixed left-0 right-0 bottom-0 z-40 pointer-events-auto w-full max-w-[428px] mx-auto rounded-t-2xl border border-light-gray flex flex-col bg-[var(--main-2)]"
    >
      {/* Header 부분 */}
      <div className="px-4 pt-4 pb-2">
        <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        <div className="font-small-bold text-[var(--gray-dark)]">
          정렬 기준 (총 {storeList?.length || 0}개 매장)
        </div>
      </div>

      {/* StoreCard 리스트 */}
      <div className="flex-1 mb-35 overflow-y-auto custom-scrollbar">
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
            {storeList.map((store, idx) => (
              <StoreCard key={store.id || idx} {...store} />
            ))}
            {/* 무한 스크롤 로딩 인디케이터 */}
            {isFetchingNextPage && (
              <div className="text-center text-gray-500 py-4">더 많은 스토어를 불러오는 중...</div>
            )}
            {/* 더 이상 데이터가 없을 때 */}
            {!hasNextPage && storeList.length > 0 && (
              <div className="text-center text-gray-400 py-4">모든 스토어를 불러왔습니다.</div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-4 pt-3 pb-6">
            <div className="text-center text-gray-500">표시할 스토어가 없습니다.</div>
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};
