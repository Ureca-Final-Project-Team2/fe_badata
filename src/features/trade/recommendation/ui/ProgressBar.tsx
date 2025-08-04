'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((total - current) / total) * 100;
  const completed = total - current;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 상태 텍스트 */}
      <div className="flex items-center justify-between  text-[var(--black])]/90 mb-2">
        <motion.span
          className="font-label-regular flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-2 h-2 bg-gradient-to-r from-[var(--main-4)] to-[var(--main-5)] rounded-full animate-pulse"></span>
          {completed}개 완료
        </motion.span>
        <motion.span
          className="font-label-regular flex items-center gap-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {current}개 남음
          <span className="w-2 h-2 bg-[var(--gray)]/80 rounded-full"></span>
        </motion.span>
      </div>

      {/* 프로그레스 바 */}
      <div className="relative w-full bg-[var(--gray-light)]/80 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/10">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

        {/* 현 진행률 */}
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--main-3)] via-[var(--main-4)] to-[var(--main-5)] rounded-full relative overflow-hidden"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
            animate={{
              opacity: [0, 0.8, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
