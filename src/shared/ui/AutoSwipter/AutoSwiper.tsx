'use client';

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface AutoSwiperProps<T> {
  items: T[];
  autoPlayDelay?: number;
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
  children: (item: T, index: number) => React.ReactNode;
}

export function AutoSwiper<T>({
  items,
  autoPlayDelay = 2000,
  slidesPerView = 1,
  spaceBetween = 16,
  className = '',
  children,
}: AutoSwiperProps<T>) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: autoPlayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        grabCursor={true}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{children(item, index)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
