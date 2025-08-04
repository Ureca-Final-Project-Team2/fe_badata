'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';

import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

import { BRAND_MAPPING } from '@/shared/config/brandMapping';
import { ICONS } from '@/shared/config/iconPath';
import { isDataBrandName, isKoreanBrandName } from '@/shared/lib/typeGuards';

import type { RecommendPost } from '@/features/trade/recommendation/lib/types';
import type { PanInfo } from 'framer-motion';

type SwipeDirection = 'left' | 'right' | null;

interface SwiperCardProps {
  post: RecommendPost;
  onSwipe: (postId: number, liked: boolean) => void;
  isTop: boolean;
  isAnimating: boolean;
}

const SWIPE_THRESHOLD = 150;
const SWIPE_INDICATOR_THRESHOLD = 50;

export default function SwiperCard({ post, onSwipe, isTop, isAnimating }: SwiperCardProps) {
  const [direction, setDirection] = useState<SwipeDirection>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  const brand = post.postCategory === 'DATA' ? post.mobileCarrier : post.partner;
  const brandImageSrc =
    brand && isDataBrandName(brand)
      ? ICONS.TRADE.BRAND_LOGO[brand]
      : brand && isKoreanBrandName(brand)
        ? ICONS.GIFTICON.BRAND_LOGO[BRAND_MAPPING[brand]]
        : (post.postImage ?? ICONS.LOGO.SAMPLE);

  const formatDeadline = useCallback((deadline: string): string => {
    const date = new Date(deadline);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 0 ? '마감일' : diffDays === 1 ? '내일 마감' : `D-${diffDays}`;
  }, []);

  const handleDrag = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offsetX = info.offset.x;
    setDirection(
      offsetX > SWIPE_INDICATOR_THRESHOLD
        ? 'right'
        : offsetX < -SWIPE_INDICATOR_THRESHOLD
          ? 'left'
          : null,
    );
  }, []);

  const handleCardSwipeEnd = useCallback(
    async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!isTop) return;
      const offsetX = info.offset.x;
      if (offsetX > SWIPE_THRESHOLD) {
        setDirection('right');
        await controls.start({ x: 1000, opacity: 0 });
        onSwipe(post.id, true);
      } else if (offsetX < -SWIPE_THRESHOLD) {
        setDirection('left');
        await controls.start({ x: -1000, opacity: 0 });
        onSwipe(post.id, false);
      } else {
        setDirection(null);
        controls.start({ x: 0 });
      }
    },
    [isTop, controls, onSwipe, post.id],
  );

  return (
    <motion.div
      className="relative w-full max-w-[380px] mx-auto h-full bg-white rounded-3xl border border-[var(--gray)] overflow-hidden"
      style={{ x, rotate }}
      drag={isTop && !isAnimating ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDrag={handleDrag}
      onDragEnd={handleCardSwipeEnd}
      animate={controls}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: isTop ? 1.02 : 1 }}
    >
      {/* 스와이프 배경 */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-3xl"
        animate={{
          background:
            direction === 'left'
              ? 'linear-gradient(45deg, rgba(239, 68, 68, 0.4), rgba(231, 163, 163, 0.1), transparent)'
              : direction === 'right'
                ? 'linear-gradient(-45deg, rgba(34, 197, 94, 0.4), rgba(34, 197, 94, 0.1), transparent)'
                : 'transparent',
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="absolute inset-0 pointer-events-none z-50">
        {/* 삭제 라벨 - 왼쪽으로 스와이프 시 */}
        <motion.div
          className="absolute top-16 right-6 px-4 py-2 rounded-2xl bg-[var(--red)]/90 backdrop-blur-md shadow-lg"
          animate={{
            opacity: direction === 'left' ? 1 : 0,
            scale: direction === 'left' ? 1 : 0.8,
            rotate: direction === 'left' ? -12 : 0,
            y: direction === 'left' ? 0 : 10,
          }}
        >
          <span className="text-white font-head-bold text-lg flex items-center gap-1">삭제</span>
        </motion.div>

        {/* 저장 라벨 - 오른쪽으로 스와이프 시 */}
        <motion.div
          className="absolute top-16 left-6 px-4 py-2 rounded-2xl bg-[var(--green)]/90 backdrop-blur-md shadow-lg"
          animate={{
            opacity: direction === 'right' ? 1 : 0,
            scale: direction === 'right' ? 1 : 0.8,
            rotate: direction === 'right' ? 12 : 0,
            y: direction === 'right' ? 0 : 10,
          }}
        >
          <span className="text-white font-head-bold text-lg flex items-center gap-1">저장</span>
        </motion.div>
      </div>

      {/* 이미지 */}
      <div className="relative w-full aspect-[4/3] pointer-events-none overflow-hidden">
        <Image
          src={brandImageSrc}
          alt={post.title}
          fill
          unoptimized
          priority={isTop}
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* 마감일 배지 */}
        <div className="absolute top-3 left-3 px-3 py-1 text-white font-label-semibold rounded-full shadow-lg bg-[var(--main-5)]">
          {formatDeadline(post.deadLine)}
        </div>

        {/* 카테고리 배지 */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 text-white font-caption-medium rounded-lg backdrop-blur-sm">
          {post.postCategory}
        </div>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="font-body-semibold text-[var(--black)] line-clamp-2 flex-1 leading-tight">
              {post.title}
            </h2>
          </div>

          <div className="space-y-1">
            <div className="font-label-medium text-[var(--dark-gray)] flex items-center">
              {brand}
            </div>
            {post.postCategory === 'DATA' && (
              <div className="font-caption-medium text-[var(--dark-gray)] flex items-center gap-2">
                {post.capacity}GB
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-end gap-1">
          <span className="text-[var(--main-5)] font-title-semibold">
            {post.price.toLocaleString()}
          </span>
          <span className="text-body-medium text-[var(--black)] mb-1">원</span>
        </div>
      </div>
    </motion.div>
  );
}
