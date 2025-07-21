import { useEffect, useState } from 'react';

import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface DragBottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
}

export const DragBottomSheet = ({ open, onClose, children }: DragBottomSheetProps) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const expandedY = 60;
  const middleY = windowHeight * 0.5;
  const collapsedY = windowHeight * 0.7; // 70% 아래로

  const y = useMotionValue(windowHeight);
  const controls = useAnimation();

  useEffect(() => {
    if (typeof window !== 'undefined') setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (windowHeight === 0) return;
    controls.start({ y: open ? middleY : collapsedY });
  }, [open, controls, windowHeight, middleY, collapsedY]);

  const handleDragEnd = (_: unknown, info: { point: { y: number } }) => {
    if (info.point.y < middleY) controls.start({ y: expandedY });
    else if (info.point.y > middleY + 80) {
      controls.start({ y: collapsedY });
      onClose?.();
    } else controls.start({ y: middleY });
  };

  if (windowHeight === 0) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {/* overlay는 항상 전체 window 덮음 */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 pointer-events-auto" onClick={onClose} />
      )}
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
          left: 0,
          right: 0,
          bottom: 0,
          position: 'fixed',
          zIndex: 40,
          pointerEvents: 'auto',
        }}
        className="w-full max-w-[428px] mx-auto bg-white rounded-t-2xl border border-light-gray flex flex-col"
      >
        {/* ...시트 내부 UI */}
        {children}
      </motion.div>
    </div>
  );
};
