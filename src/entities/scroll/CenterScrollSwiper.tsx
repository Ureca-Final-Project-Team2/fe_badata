import React from 'react';

import { useCenterScrollIndex } from '@/entities/scroll/useCenterScrollIndex';

interface CenterScrollSwiperProps<T> {
  items: T[];
  className?: string;
  style?: React.CSSProperties;
  children: (item: T, idx: number, scale: number, isCenter: boolean) => React.ReactNode;
}

export function CenterScrollSwiper<T>({
  items,
  className = '',
  style = {},
  children,
}: CenterScrollSwiperProps<T>) {
  const {
    scrollRef,
    cardRefs,
    cardScales,
    centerIndex,
    handleScroll,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    isDragging,
  } = useCenterScrollIndex({ items });

  return (
    <div
      ref={scrollRef}
      className={`flex overflow-x-auto no-scrollbar snap-x snap-proximity py-8 w-full max-w-screen-md mx-auto cursor-grab ${className}`}
      style={{
        scrollSnapType: 'x proximity',
        userSelect: isDragging ? 'none' : 'auto',
        zIndex: 1,
        ...style,
      }}
      onScroll={handleScroll}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {items.map((item, idx) => {
        const zIndexValue = cardScales[idx] > 0.95 ? 5 : 3;

        return (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="snap-center flex-shrink-0 mx-2 transition-transform duration-300"
            style={{
              transform: `scale(${cardScales[idx]})`,
              zIndex: zIndexValue,
            }}
          >
            {children(item, idx, cardScales[idx], centerIndex === idx)}
          </div>
        );
      })}
    </div>
  );
}
