'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useUserDataAmount } from '@/widgets/data-usage/model/queries';

// Bubble 컴포넌트
function Bubble({ delay = 0 }: { delay?: number }) {
  const [size, setSize] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setSize(2 + Math.random() * 4);
    setLeft(20 + Math.random() * 60); // 20%~80% 범위로 제한
  }, []);

  return (
    <motion.div
      className="absolute bg-white/80 rounded-full pointer-events-none shadow-sm"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: 0,
      }}
      animate={{
        y: [0, -120],
        opacity: [0, 1, 1, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

const DataUsageCardSection = () => {
  const { isLoggedIn } = useAuthStore();
  const { data } = useUserDataAmount();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const used = isLoggedIn ? (data?.content.dataAmount ?? 0) : 0;
  const total = isLoggedIn ? (data?.content.totalDataAmount ?? 1) : 1; // 0이면 나눗셈에서 NaN 될 수 있으니 기본값 1

  const percentage = Math.round((used / total) * 100);
  // 파도 높이 계산 (10% ~ 90% 범위)
  const waveHeight = 10 + (percentage / 100) * 80;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[160px] h-[160px]">
        {/* 외곽 원형 게이지 배경 */}
        <div className="absolute inset-0 rounded-full z-0">
          <svg className="w-full h-full" viewBox="0 0 160 160">
            {/* 배경 링 */}
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="url(#backgroundGradient)"
              strokeWidth="26"
            />
            {/* 진행률 링 - 12시 방향부터 시작 */}
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="26"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 408.4} 408.4`}
              className="transition-all duration-[2000ms] ease-out"
              style={{
                strokeDashoffset: animationStarted ? 0 : 408.4,
                transform: 'rotate(-90deg)',
                transformOrigin: '80px 80px',
              }}
            />
            {/* 그라데이션 정의 */}
            <defs>
              {/* 배경 그라데이션 */}
              <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="50%" stopColor="#e0e0e0" />
                <stop offset="100%" stopColor="#d0d0d0" />
              </linearGradient>
              {/* 진행률 그라데이션 */}
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#72c1f2" />
                <stop offset="30%" stopColor="#3e9fdc" />
                <stop offset="70%" stopColor="#c6eaf8" />
                <stop offset="100%" stopColor="#edf7fb" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 내부 원형 컨테이너 (파도 영역) */}
        <div className="absolute inset-[25px] rounded-full z-10">
          {/* 파도 영역만 overflow-hidden 적용 */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* 배경 구름들과 별들 */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-4 left-6 w-4 h-2 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-6 right-4 w-3 h-1.5 bg-white rounded-full opacity-60"></div>
              <div className="absolute top-8 left-8 w-2 h-1 bg-white rounded-full opacity-80"></div>
              {/* 별 효과 */}
              <div
                className="absolute top-5 left-10 w-1 h-1 bg-yellow-200 rounded-full opacity-60 animate-ping"
                style={{ animationDuration: '3s' }}
              ></div>
              <div
                className="absolute top-7 right-8 w-0.5 h-0.5 bg-yellow-100 rounded-full opacity-50 animate-ping"
                style={{ animationDuration: '4s', animationDelay: '1s' }}
              ></div>
            </div>

            {/* 파도 애니메이션 영역 */}
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-[2500ms] ease-out ${animationStarted ? '' : 'translate-y-full'}`}
              style={{ height: `${waveHeight}%` }}
            >
              {/* 파도 레이어 1 (가장 뒤 - main-2 색상) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#c6eaf8]/80 to-[#206e8d]/60">
                <svg
                  className="absolute bottom-0 w-full h-6"
                  viewBox="0 0 110 24"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,12 Q27.5,2 55,12 T110,12 L110,24 L0,24 Z"
                    fill="currentColor"
                    className="text-[var(--main-2)]/70"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; -55,0; 0,0"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>

              {/* 파도 레이어 2 (중간 - main-2 밝은 버전) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#c6eaf8]/90 to-[#c6eaf8]/70">
                <svg
                  className="absolute bottom-0 w-full h-5"
                  viewBox="0 0 110 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q36.7,0 73.3,10 T146.6,10 L146.6,20 L0,20 Z"
                    fill="currentColor"
                    className="text-[var(--main-2)]/80"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; -73.3,0; 0,0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>

              {/* 파도 레이어 3 (가장 앞 - main-2 진한 버전) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#c6eaf8] to-[#c6eaf8]/80">
                <svg
                  className="absolute bottom-0 w-full h-4"
                  viewBox="0 0 110 16"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q55,0 110,8 L110,16 L0,16 Z"
                    fill="currentColor"
                    className="text-[var(--main-2)]/90"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; -110,0; 0,0"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>

              {/* 파도 거품 효과 */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
          </div>

          {/* 중앙 데이터 표시 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="text-center">
              <div className="font-body-semibold text-[var(--black)]">{used}GB</div>
              <div className="font-small-regular text-[var(--gray-mid)] mt-0.5">/ {total}GB</div>
            </div>
          </div>
        </div>

        {/* Bubble 컴포넌트들 - 파도 높이에 따라 조건부 렌더링 */}
        {waveHeight > 15 && (
          <div className="absolute inset-[25px] z-20 overflow-hidden rounded-full">
            <Bubble delay={0} />
            <Bubble delay={2} />
            <Bubble delay={4} />
            <Bubble delay={6} />
            <Bubble delay={8} />
            <Bubble delay={1.5} />
            <Bubble delay={3.5} />
            <Bubble delay={5.5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUsageCardSection;
