import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCenterScrollIndexOptions<T> {
  items: T[];
  initial?: number;
}

export function useCenterScrollIndex<T>({ items, initial = 0 }: UseCenterScrollIndexOptions<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centerIndex, setCenterIndex] = useState(initial);
  const [cardScales, setCardScales] = useState<number[]>(Array(items.length).fill(0.9));
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 중심 카드 계산 및 scale 적용
  const updateCardScales = useCallback(() => {
    if (!scrollRef.current || items.length === 0) return;
    const container = scrollRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let minDistance = Infinity;
    let newCenterIndex = 0;
    const newScales = items.map((_, idx) => {
      const card = cardRefs.current[idx];
      if (!card) return 0.9;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        newCenterIndex = idx;
      }
      // 가까울수록 1, 멀수록 0.85
      const maxDistance = containerRect.width / 2 + cardRect.width;
      const scale = 1 - Math.min(distance / maxDistance, 1) * 0.15;
      return scale;
    });
    setCenterIndex(newCenterIndex);
    setCardScales(newScales);
  }, [items]);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    updateCardScales();
  }, [updateCardScales]);

  // 마우스 드래그 핸들러
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  }, []);
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
      const walk = x - startX;
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [isDragging, startX, scrollLeft],
  );
  const onMouseUp = useCallback(() => setIsDragging(false), []);
  const onMouseLeave = useCallback(() => setIsDragging(false), []);

  // 최초 렌더/아이템 변경 시 scale 업데이트
  useEffect(() => {
    setTimeout(updateCardScales, 0);
  }, [items, updateCardScales]);

  // 스크롤/드래그 시 scale 업데이트
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    container.addEventListener('scroll', updateCardScales);
    return () => {
      container.removeEventListener('scroll', updateCardScales);
    };
  }, [updateCardScales]);

  return {
    scrollRef,
    cardRefs,
    cardScales,
    centerIndex,
    setCenterIndex,
    handleScroll,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    isDragging,
  };
}
