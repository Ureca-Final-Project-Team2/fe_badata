'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

interface BubbbleProps {
  delay?: number;
}
export default function Bubble({ delay = 0 }: BubbbleProps) {
  const [size, setSize] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setSize(2 + Math.random() * 2);
    setLeft(Math.random() * 100);
  }, []);

  return (
    <motion.div
      className={`left-[${left}%] w-[${size}px] h-[${size}px] absolute bg-white/40 rounded-full pointer-events-none`}
      animate={{
        y: [-10, -600],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}
