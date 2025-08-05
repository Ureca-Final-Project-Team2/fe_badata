import { motion } from 'framer-motion';

import Bubble from '@/features/trade/recommendation/ui/Bubble';

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden max-w-[428px] mx-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--main-3)] via-[var(--main-4)] to-[var(--main-5)]" />

      <motion.div
        className="absolute top-0 w-full h-24 bg-gradient-to-b from-white/20 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-yellow-200/40 to-transparent transform -skew-x-12"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scaleX: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-0 right-1/3 w-3 h-full bg-gradient-to-b from-yellow-100/30 to-transparent transform skew-x-12"
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scaleX: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-0 left-2/3 w-1.5 h-full bg-gradient-to-b from-white/25 to-transparent transform -skew-x-6"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {Array.from({ length: 6 }, (_, i) => (
        <Bubble key={i} delay={i * 0.4} />
      ))}

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--main-5)] to-transparent" />
    </div>
  );
}
