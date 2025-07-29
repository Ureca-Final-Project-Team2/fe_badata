'use client';

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface ListViewButtonProps {
  onClick: () => void;
  className?: string;
}

export const ListViewButton = ({ onClick, className = '' }: ListViewButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 bg-[var(--white)] text-[var(--black)] rounded-full shadow-lg font-label-semibold flex items-center gap-2 ${className}`}
      aria-label="목록 보기"
    >
      <Menu size={16} className="text-[var(--main-5)] " />
      목록보기
    </motion.button>
  );
};
