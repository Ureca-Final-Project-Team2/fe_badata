import { useCallback, useState } from 'react';

export const useGifticonFilterHooks = () => {
  const [gifticonPrice, setGifticonPrice] = useState<number>(50000);
  const [gifticonDrawerOpen, setGifticonDrawerOpen] = useState(false);

  const openGifticonDrawer = useCallback(() => setGifticonDrawerOpen(true), []);
  const closeGifticonDrawer = useCallback(() => setGifticonDrawerOpen(false), []);

  const submitGifticonFilter = useCallback((price: number) => {
    setGifticonPrice(price);
    setGifticonDrawerOpen(false);
  }, []);

  return {
    gifticonPrice,
    setGifticonPrice,
    gifticonDrawerOpen,
    openGifticonDrawer,
    closeGifticonDrawer,
    submitGifticonFilter,
  };
};
