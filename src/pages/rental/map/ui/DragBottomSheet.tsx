import { useCallback, useEffect, useRef, useState } from 'react';

import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface DragBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
}

export const DragBottomSheet = ({ open, onClose, children, title }: DragBottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  // 3단계 높이 설정
  const expandedY = 60;
  const middleY = windowHeight * 0.5;
  const collapsedY = windowHeight - 70;
  const middleThreshold = windowHeight * 0.22;

  const [{ y }, api] = useSpring(() => ({ y: windowHeight }));

  // windowHeight 세팅 (Next.js SSR 대응)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  // open prop에 따라 위치 제어
  useEffect(() => {
    if (windowHeight === 0) return;
    if (open) {
      api.start({ y: middleY });
    } else {
      api.start({ y: collapsedY });
    }
  }, [open, api, windowHeight, middleY, collapsedY]);

  // 드래그 제어
  const openSheet = useCallback(() => api.start({ y: expandedY }), [api, expandedY]);
  const openMiddle = useCallback(() => api.start({ y: middleY }), [api, middleY]);
  const closeSheet = useCallback(() => {
    api.start({ y: collapsedY });
    onClose?.();
  }, [api, collapsedY, onClose]);

  const bind = useDrag(
    ({ last, target, movement: [, my], cancel, memo }) => {
      const targetScroll = target as HTMLElement;
      if (!memo) memo = y.get();
      const newY = memo + my;

      if (sheetRef.current?.contains(targetScroll) && targetScroll.closest('[data-scrollable]')) {
        return;
      }

      if (last) {
        const finalY = y.get();
        if (finalY < middleY - middleThreshold) openSheet();
        else if (finalY > middleY + middleThreshold) closeSheet();
        else openMiddle();
      } else {
        if (newY < expandedY - 30) return cancel?.();
        if (newY > collapsedY + 30) return cancel?.();
        api.start({ y: newY, immediate: true });
      }
      return memo;
    },
    { from: () => [0, y.get()], pointer: { touch: true } },
  );

  if (windowHeight === 0) return null;

  return (
    <div className="flex-1 fixed left-0 right-0 bottom-0 z-30 flex flex-col items-center pointer-events-none">
      {open && <div className="fixed inset-0 z-30" onClick={closeSheet}></div>}
      <animated.div
        ref={sheetRef}
        {...bind()}
        style={{
          transform: y.to((val) => `translateY(${val}px)`),
          height: y.to((val) => `${windowHeight - val}px`),
        }}
        className="pointer-events-auto w-full max-w-[428px] mx-auto bg-white rounded-t-2xl border border-light-gray touch-none flex flex-col"
      >
        <div className="flex-shrink-0 py-4 px-4">
          <div className="w-12 h-1.5 bg-gray rounded-full mx-auto" />
        </div>
        {title && (
          <div className="flex-shrink-0 cursor-pointer" onClick={openMiddle}>
            {title}
          </div>
        )}
        <div data-scrollable className="flex-1 overflow-y-auto scrollbar-hidden pb-[50px]">
          {children}
        </div>
      </animated.div>
    </div>
  );
};
