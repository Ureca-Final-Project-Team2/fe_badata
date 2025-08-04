'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((total - current) / total) * 100;

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between font-caption-medium text-white/90 mb-2">
        <span className="font-label-medium">{total - current}개 완료</span>
        <span className="font-label-medium">{current}개 남음</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--main-2)] to-[var(--main-4)] rounded-full relative"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
      <div className="text-center font-label-medium text-white/90 mt-2">
        {Math.round(progress)}% 완료
      </div>
    </div>
  );
}
