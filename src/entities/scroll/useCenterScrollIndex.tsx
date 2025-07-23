import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseCenterScrollIndexOptions {
  itemCount: number;
  cardWidth?: number;
  gap?: number;
  initial?: number;
}

export function useCenterScrollIndex({
  itemCount,
  cardWidth = 270,
  gap = 16,
  initial = 0,
}: UseCenterScrollIndexOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [centerIndex, setCenterIndex] = useState(initial);
  const [cardScales, setCardScales] = useState<number[]>(Array(itemCount).fill(0.9));
  // 드래그 상태
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) return;
    setContainerWidth(scrollRef.current.offsetWidth);
  }, []);

  // 패딩 계산
  const sidePadding = useMemo(
    () => ((containerWidth - cardWidth) / 2 > 0 ? (containerWidth - cardWidth) / 2 : 0),
    [containerWidth, cardWidth],
  );

  // scale 계산
  const updateCardScales = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    const newScales = Array(itemCount)
      .fill(0)
      .map((_, idx) => {
        const cardCenter = idx * (cardWidth + gap) + cardWidth / 2 + sidePadding;
        const distance = Math.abs(containerCenter - cardCenter);
        const maxDistance = container.offsetWidth / 2 + cardWidth;
        // 가까울수록 1, 멀수록 0.85로 선형 보간
        const scale = 1 - Math.min(distance / maxDistance, 1) * 0.15;
        return scale;
      });
    setCardScales(newScales);
  }, [itemCount, cardWidth, gap, sidePadding]);

  // 중심 인덱스 계산
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const containerCenter = scrollLeft + container.offsetWidth / 2;
    const idx = Math.round((containerCenter - cardWidth / 2 - sidePadding) / (cardWidth + gap));
    setCenterIndex(Math.max(0, Math.min(itemCount - 1, idx)));
    updateCardScales();
  }, [itemCount, cardWidth, gap, sidePadding, updateCardScales]);

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

  // 중심 카드가 바뀔 때마다 중앙에 오도록 스크롤
  const scrollToCenter = useCallback(
    (idx: number) => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const cardCenter = idx * (cardWidth + gap) + cardWidth / 2 + sidePadding;
      const scrollTo = cardCenter - container.offsetWidth / 2;
      container.scrollTo({ left: scrollTo, behavior: 'smooth' });
    },
    [cardWidth, gap, sidePadding],
  );

  useEffect(() => {
    updateCardScales();
  }, [itemCount, updateCardScales]);

  useEffect(() => {
    scrollToCenter(centerIndex);
  }, [centerIndex, scrollToCenter]);

  return {
    scrollRef,
    cardScales,
    centerIndex,
    setCenterIndex,
    handleScroll,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    sidePadding,
    isDragging,
  };
}
