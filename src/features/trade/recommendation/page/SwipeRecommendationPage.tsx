'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import { useAuthStore } from '@/entities/auth/model/authStore';
import OceanBackground from '@/features/trade/recommendation/ui/OceanBackground';
import { ProgressBar } from '@/features/trade/recommendation/ui/ProgressBar';
import StatsCard from '@/features/trade/recommendation/ui/StatsCard';
import SwiperCard from '@/features/trade/recommendation/ui/SwiperCard';
import { PATH } from '@/shared/config/path';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';

import { useSwipeRecommendationState } from '../model/useSwipeRecommendationState';

export default function SwipeRecommendationPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const {
    cards,
    totalCards,
    likedCount,
    isFinished,
    animatingCardId,
    remainingCards,
    handleSwipe,
    handleNewRecommendation,
    handleContinueRecommendation,
  } = useSwipeRecommendationState();

  const handleGoHome = () => router.push(PATH.TRADE.MAIN);
  const handleGoToLikedPosts = () => router.push(PATH.MYPAGE.LIKE_POST);

  return (
    <BaseLayout header={<Header />} showHeader={true} paddingX={false}>
      <OceanBackground />

      <div className="relative z-10 flex flex-col h-full gap-2">
        <div className="px-6 pt-8 pb-4">
          <h3 className="font-title-semibold text-center text-white drop-shadow-md">
            🌊 {user?.name}님을 위한 추천
          </h3>

          {totalCards > 0 && !isFinished && (
            <div className="pt-4">
              <ProgressBar current={remainingCards} total={totalCards} />
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center items-center px-6 pb-12">
          {isFinished ? (
            <div className="flex flex-col items-center gap-8 w-full">
              <StatsCard liked={likedCount} total={totalCards} />
              <div className="flex flex-col gap-3 w-full max-w-[280px]">
                <motion.button
                  onClick={handleContinueRecommendation}
                  className="px-6 py-3 rounded-full bg-white text-[var(--main-5)] font-label-medium shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  이어서 추천받기
                </motion.button>
                <motion.button
                  onClick={handleGoToLikedPosts}
                  className="px-6 py-3 rounded-full bg-white/20 text-white font-label-medium shadow-lg border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  저장한 상품 보러가기
                </motion.button>
                <motion.button
                  onClick={handleGoHome}
                  className="px-6 py-2 rounded-full bg-transparent text-white/70 font-label-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  그만 추천받기
                </motion.button>
              </div>
            </div>
          ) : cards.length === 0 ? (
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="text-6xl mb-4">😴</div>
              <p className="text-white/90 font-label-medium text-center">추천할 상품이 없어요</p>
              <motion.button
                onClick={handleNewRecommendation}
                className="px-6 py-2 rounded-full bg-white text-[var(--main-5)] font-label-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다시 시도하기
              </motion.button>
            </div>
          ) : (
            <div className="relative w-full max-w-[360px] aspect-[3/4] mx-auto flex justify-center items-center rounded-2xl overflow-hidden no-scrollbar">
              {cards.map((post, index) => {
                const isTopCard = index === 0;
                const isAnimating = animatingCardId === post.id;
                return (
                  <motion.div
                    key={post.id}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ zIndex: cards.length - index }}
                    animate={{
                      y: index * 6,
                      scale: 1 - index * 0.015,
                      opacity: 1 - index * 0.04,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <SwiperCard
                      post={post}
                      onSwipe={handleSwipe}
                      isTop={isTopCard}
                      isAnimating={isAnimating}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
