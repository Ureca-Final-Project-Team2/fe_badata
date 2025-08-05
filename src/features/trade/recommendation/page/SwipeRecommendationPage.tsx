'use client';

import { useRouter } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useSwipeRecommendationState } from '@/features/trade/recommendation/model/useSwipeRecommendationState';
import { ProgressBar } from '@/features/trade/recommendation/ui/ProgressBar';
import StatsCard from '@/features/trade/recommendation/ui/StatsCard';
import SwiperCard from '@/features/trade/recommendation/ui/SwiperCard';
import { PATH } from '@/shared/config/path';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';

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

  const handleGoToTrade = () => router.push(PATH.TRADE.MAIN);
  const handleGoToLikedPosts = () => router.push(PATH.MYPAGE.LIKE_POST);

  return (
    <BaseLayout header={<Header />} showHeader={true} paddingX={false}>
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/40 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{
          backgroundImage: "url('/images/background-ocean.png')",
        }}
      />

      <div className="relative z-20 flex flex-col h-full">
        {/* 헤더 */}
        <motion.div
          className="px-6 pt-10 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-title-semibold text-center drop-shadow-lg">
            <motion.span
              className="text-[var(--black)]/90 bg-clip-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {user?.name}님을 위한 추천
            </motion.span>
          </h3>

          {totalCards > 0 && !isFinished && (
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <ProgressBar current={remainingCards} total={totalCards} />
            </motion.div>
          )}
        </motion.div>

        <div className="flex-1 flex justify-center items-center px-6 pb-20">
          <AnimatePresence mode="wait">
            {isFinished ? (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-8 w-full"
              >
                <StatsCard liked={likedCount} total={totalCards} />
                <div className="flex flex-col gap-4 w-full max-w-[300px]">
                  <motion.button
                    onClick={handleContinueRecommendation}
                    className="px-8 py-4 rounded-2xl bg-white/80 text-[var(--black)] font-label-medium shadow-xl border border-white/20 relative overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 20px 40px var(--white)/40',
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="relative z-10">이어서 추천받기</span>
                  </motion.button>

                  <motion.button
                    onClick={handleGoToLikedPosts}
                    className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white font-label-medium shadow-lg border border-white/30"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 20px 40px var(--white)/40',
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    저장한 상품 보러가기
                  </motion.button>

                  <motion.button
                    onClick={handleGoToTrade}
                    className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white font-label-medium shadow-lg border border-white/30"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 20px 40px var(--white)/40',
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    거래 페이지로 돌아가기
                  </motion.button>
                </div>
              </motion.div>
            ) : cards.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-8 w-full"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-8xl mb-4 drop-shadow-lg"
                >
                  😴
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white/90 font-body-semibold mb-2">추천할 상품이 없어요</p>
                  <p className="text-white/70 font-label-semibold">새로운 추천을 받아보세요</p>
                </motion.div>
                <motion.button
                  onClick={handleNewRecommendation}
                  className="px-8 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white font-label-medium shadow-lg border border-white/30"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255,255,255,0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  다시 시도하기
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="cards"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-[360px] aspect-[4/5] mx-auto flex justify-center items-center rounded-2xl overflow-visible"
              >
                {cards.map((post, index) => {
                  const isTopCard = index === 0;
                  const isAnimating = animatingCardId === post.id;
                  return (
                    <motion.div
                      key={post.id}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ zIndex: cards.length - index }}
                      animate={{
                        y: index * 8,
                        scale: 1 - index * 0.02,
                        opacity: 1 - index * 0.1,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: 'easeOut',
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <motion.div
                        whileHover={isTopCard ? { y: -6, scale: 1.02 } : {}}
                        className="w-full h-full"
                      >
                        <SwiperCard
                          post={post}
                          onSwipe={handleSwipe}
                          isTop={isTopCard}
                          isAnimating={isAnimating}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* 스와이프 방향 가이드 */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <motion.p
                    className="text-white/60 font-caption-medium text-center flex items-center gap-2"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-[var(--red)]">←</span>
                    삭제
                    <span className="mx-3 text-white/40">|</span>
                    저장
                    <span className="text-[var(--green)]">→</span>
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BaseLayout>
  );
}
