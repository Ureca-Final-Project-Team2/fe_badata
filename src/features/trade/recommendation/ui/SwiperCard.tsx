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

function SwipeLabel({
  visible,
  position,
  color,
  text,
  rotate,
}: {
  visible: boolean;
  position: string;
  color: string;
  text: string;
  rotate: number;
}) {
  return (
    <motion.div
      className={`absolute ${position} px-4 py-2 rounded-xl border-4 border-[var(--${color})] bg-transparent backdrop-blur-sm`}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, rotate: visible ? rotate : 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className={`text-[var(--${color})] font-head-bold`}>{text}</span>
    </motion.div>
  );
}

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
      className="relative w-full max-w-[380px] mx-auto h-full bg-white rounded-2xl border border-[var(--gray)] shadow-xl overflow-hidden"
      style={{ x, rotate }}
      drag={isTop && !isAnimating ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDrag={handleDrag}
      onDragEnd={handleCardSwipeEnd}
      animate={controls}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 1.02 }}
    >
      {/* 스와이프 배경 */}
      <motion.div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-300
          ${direction === 'left' ? 'bg-gradient-to-l from-[var(--red)/40] to-transparent opacity-100' : ''}
          ${direction === 'right' ? 'bg-gradient-to-r from-[var(--green)/40] to-transparent opacity-100' : ''}
          ${direction === null ? 'opacity-0' : ''}
        `}
      />

      {/* 스와이프 라벨 */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <SwipeLabel
          visible={direction === 'left'}
          position="top-12 right-8"
          color="red"
          text="삭제"
          rotate={-10}
        />
        <SwipeLabel
          visible={direction === 'right'}
          position="top-12 left-8"
          color="green"
          text="저장"
          rotate={10}
        />
      </div>

      {/* 이미지 */}
      <div className="relative w-full aspect-[1.2] pointer-events-none">
        <Image
          src={brandImageSrc}
          alt={post.title}
          fill
          unoptimized
          priority={isTop}
          className="object-cover"
        />
        <div className="absolute top-2 left-2 px-3 py-1 bg-[var(--main-2)] text-[var(--main-5)] font-small-medium rounded-full border border-[var(--main-4)]">
          {formatDeadline(post.deadLine)}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex flex-col justify-between flex-1 p-5 bg-white">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-body-semibold text-[var(--black)] line-clamp-2">{post.title}</h2>
            <span className="font-caption-medium text-[var(--gray)]">{post.postCategory}</span>
          </div>
          <div className="font-caption-medium text-[var(--gray-mid)]">{brand}</div>
          {post.postCategory === 'DATA' && (
            <div className="font-caption-medium text-[var(--gray-mid)]">{post.capacity}GB</div>
          )}
        </div>
        <div className="text-right mt-3">
          <span className="text-[var(--main-5)] font-body-semibold">
            {post.price.toLocaleString()}
          </span>
          <span className="text-caption-medium text-[var(--gray)] ml-1">원</span>
        </div>
      </div>
    </motion.div>
  );
}
