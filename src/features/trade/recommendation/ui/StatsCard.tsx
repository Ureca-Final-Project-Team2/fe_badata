'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  liked: number;
  total: number;
}

export default function StatsCard({ liked, total }: StatsCardProps) {
  const skipped = total - liked;

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-md rounded-3xl px-6 py-8 shadow-2xl max-w-sm mx-auto border border-[var(--main-3)]"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="text-center space-y-6">
        <motion.div
          className="text-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.2, repeat: 3 }}
        >
          🎉
        </motion.div>

        <h3 className="font-title-semibold text-[var(--black)]">추천 완료!</h3>

        <div className="flex justify-center items-center gap-10 pt-2">
          <div className="text-center">
            <motion.div
              className="font-head-semibold text-[var(--main-5)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {liked}
            </motion.div>
            <div className="text-label-regular text-[var(--gray-dark)] mt-1 tracking-tight">
              저장됨
            </div>
          </div>

          <div className="text-center">
            <motion.div
              className="font-head-semibold text-[var(--gray-dark)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {skipped}
            </motion.div>
            <div className="text-caption-regular text-[var(--gray-dark)] mt-1 tracking-tight">
              건너뜀
            </div>
          </div>
        </div>

        <div className="text-caption-medium text-[var(--gray-dark)] mt-2">
          총 <span className="font-caption-semibold text-[var(--main-5)]">{total}</span>개의 추천을
          확인했어요
        </div>
      </div>
    </motion.div>
  );
}
