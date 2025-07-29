import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollDragReturn {
  scrollRef: React.RefObject<HTMLDivElement>;
  dragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
}

export const useScrollDrag = (): UseScrollDragReturn => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  // document 이벤트 등록/해제
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX.current;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      setDragging(false);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  return {
    scrollRef: scrollRef as React.RefObject<HTMLDivElement>,
    dragging,
    handleMouseDown,
  };
};
