import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export function SwipeScroll<T>({
  items,
  getKey,
  slidesPerView = 2.2,
  spaceBetween = 12,
  children,
}: {
  items: T[];
  getKey: (item: T) => string | number;
  slidesPerView?: number;
  spaceBetween?: number;
  children: (item: T, index: number) => React.ReactNode;
}) {
  if (!items || items.length === 0) return null;

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      grabCursor={true}
      loop={false}
    >
      {items.map((item, index) => (
        <SwiperSlide key={getKey(item)}>{children(item, index)}</SwiperSlide>
      ))}
    </Swiper>
  );
}
