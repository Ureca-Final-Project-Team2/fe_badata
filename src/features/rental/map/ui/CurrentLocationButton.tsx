'use client';

import { motion } from 'framer-motion';

interface CurrentLocationButtonProps {
  onClick: () => void;
  className?: string;
}

export const CurrentLocationButton = ({ onClick, className = '' }: CurrentLocationButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`w-12 h-12 bg-[var(--white)] rounded-full shadow-lg border border-gray-200 flex items-center justify-center ${className}`}
      aria-label="현재 위치로 이동"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--main-5)]"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          fill="currentColor"
        />
      </svg>
    </motion.button>
  );
};
