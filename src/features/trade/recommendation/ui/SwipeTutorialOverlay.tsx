'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import swiperLeft from '@/shared/assets/SwiperLeft.json';
import swiperRight from '@/shared/assets/SwiperRight.json';

interface Props {
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: '게시물이 관심없다면',
    highlight: '왼쪽으로 스와이프!',
    sub: '왼쪽으로 넘기면 다음 게시물로 넘어가요',
    animation: swiperLeft,
  },
  {
    title: '관심있는 게시물이면',
    highlight: '오른쪽으로 스와이프!',
    sub: '오른쪽으로 넘기면 게시물을 저장할 수 있어요!',
    animation: swiperRight,
  },
  {
    title: '추천 게시물을 전부 본 후에는',
    highlight: '이어서 추천받거나<br />저장한 상품을 확인할 수 있어요!',
    sub: '지금 바로 시작해볼까요?',
    animation: null,
  },
];

export default function SwipeTutorialOverlay({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const { title, highlight, sub, animation } = tutorialSteps[step];

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 flex flex-col px-4 justify-end pb-18">
      <div className="w-full max-w-[428px] mx-auto flex flex-col items-center text-white text-center px-6">
        {animation && (
          <motion.div
            className="w-[160px] h-[160px]"
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Lottie animationData={animation} loop autoPlay />
          </motion.div>
        )}

        {/* 텍스트 */}
        <div className="space-y-2">
          <p className="text-lg font-body-medium">{title}</p>
          <p
            className="text-2xl font-title-semibold text-[var(--main-5)]"
            dangerouslySetInnerHTML={{ __html: highlight }}
          />
          <p className="text-sm text-white/80">{sub}</p>
        </div>

        {/* 버튼 */}
        <div className="mt-32 flex flex-col gap-3 w-full max-w-xs">
          <motion.button
            onClick={handleNext}
            className="w-full py-3 rounded-full bg-white text-black font-label-medium shadow-md cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            {step < tutorialSteps.length - 1 ? '다음' : '시작하기'}
          </motion.button>

          <motion.button
            onClick={onClose}
            className="text-sm text-white/60 underline cursor-pointer"
            whileTap={{ scale: 0.96 }}
          >
            튜토리얼 건너뛰기
          </motion.button>
        </div>
      </div>
    </div>
  );
}
