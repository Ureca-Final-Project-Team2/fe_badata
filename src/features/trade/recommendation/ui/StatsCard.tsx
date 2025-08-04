'use client';

import { motion } from 'framer-motion';

interface StatsCardProps {
  liked: number;
  total: number;
}

export default function StatsCard({ liked, total }: StatsCardProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-8 shadow-xl max-w-sm mx-auto border border-[var(--main-1)]"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="text-center space-y-4">
        <motion.div
          className="font-head-bold"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🎉
        </motion.div>
        <h3 className="font-title-semibold text-[var(--gray-dark)]">추천 완료!</h3>
        <div className="flex justify-around items-center py-6">
          <div className="text-center">
            <motion.div
              className="font-body-semibold text-[var(--main-5)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {liked}
            </motion.div>
            <div className="font-label-medium text-[var(--gray)] mt-1">저장됨</div>
          </div>

          <div className="text-center">
            <motion.div
              className="font-body-semibold text-[var(--gray-mid)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {total - liked}
            </motion.div>
            <div className="font-label-medium text-[var(--gray)] mt-1">건너뜀</div>
          </div>
        </div>
        <div className="font-label-medium text-[var(--gray-dark)]">
          총 {total}개의 추천을 확인했어요
        </div>
      </div>
    </motion.div>
  );
}
