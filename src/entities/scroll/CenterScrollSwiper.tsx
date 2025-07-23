import React from 'react';

import { useCenterScrollIndex } from './useCenterScrollIndex';

interface CenterScrollSwiperProps<T> {
  items: T[];
  cardWidth?: number;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  children: (item: T, idx: number, scale: number) => React.ReactNode;
}

export function CenterScrollSwiper<T>({
  items,
  cardWidth = 270,
  gap = 16,
  className = '',
  style = {},
  children,
}: CenterScrollSwiperProps<T>) {
  const {
    scrollRef,
    cardScales,
    handleScroll,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    sidePadding,
    isDragging,
  } = useCenterScrollIndex({ itemCount: items.length, cardWidth, gap });

  return (
    <div
      ref={scrollRef}
      className={`flex overflow-x-auto no-scrollbar snap-x snap-proximity py-8 w-full max-w-screen-md mx-auto cursor-grab ${className}`}
      style={{ scrollSnapType: 'x proximity', userSelect: isDragging ? 'none' : 'auto', ...style }}
      onScroll={handleScroll}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* 왼쪽 패딩 */}
      <div style={{ width: sidePadding, flexShrink: 0 }} />
      {items.map((item, idx) => (
        <div
          key={idx}
          className="snap-center flex-shrink-0 mx-2 transition-transform duration-300"
          style={{
            width: cardWidth,
            transform: `scale(${cardScales[idx]})`,
            zIndex: cardScales[idx] > 0.95 ? 10 : 1,
          }}
        >
          {children(item, idx, cardScales[idx])}
        </div>
      ))}
      {/* 오른쪽 패딩 */}
      <div style={{ width: sidePadding, flexShrink: 0 }} />
    </div>
  );
}
