import React, { useEffect, useRef } from 'react';

import Image from 'next/image';

import { useScore } from '@/pages/rental/map/hooks/useScoreHooks';
import styles from '@/pages/rental/map/style/Score.module.css';
import { ICONS } from '@/shared/config/iconPath';

import type { ScoreProps } from '@/pages/rental/map/lib/types';

const ICON_SIZE = 51;

export const Score: React.FC<ScoreProps> = ({ value, onChange, readOnly = false }) => {
  // Controlled/Uncontrolled 지원
  const isControlled = value !== undefined;
  const { score: internalScore, setScore, calcScore } = useScore(value ?? 0);
  const score = isControlled ? value! : internalScore;
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 value가 바뀌면 내부 상태도 동기화 (uncontrolled → controlled 전환 대응)
  useEffect(() => {
    if (isControlled && value !== internalScore) {
      setScore(value!);
    }
  }, [isControlled, value, internalScore, setScore]);

  const handleSetScore = (e: React.MouseEvent) => {
    if (readOnly || !containerRef.current) return;
    const boundingRect = containerRef.current.getBoundingClientRect();
    const newScore = calcScore(e.clientX, boundingRect);
    if (!isControlled) setScore(newScore);
    onChange?.(newScore);
  };

  const icons = {
    active: ICONS.ETC.LIKE_ACTIVE,
    half: ICONS.ETC.LIKE_ACTIVE_HALF,
    nonactive: ICONS.ETC.LIKE_NONACTIVE,
  };

  return (
    <div
      ref={containerRef}
      className={styles.container + (readOnly ? '' : ' ' + styles.interactive)}
      role="slider"
      aria-label="평점"
      aria-valuemin={0}
      aria-valuemax={5}
      aria-valuenow={score}
      aria-valuetext={`5점 만점에 ${score}점`}
      tabIndex={readOnly ? -1 : 0}
      onClick={handleSetScore}
      onMouseMove={(e) => {
        if (e.buttons === 1 && !readOnly) handleSetScore(e);
      }}
      onKeyDown={(e) => {
        if (readOnly) return;
        if (e.key === 'ArrowLeft' && score > 0) {
          const newScore = Math.max(0, score - 0.5);
          if (!isControlled) setScore(newScore);
          onChange?.(newScore);
        } else if (e.key === 'ArrowRight' && score < 5) {
          const newScore = Math.min(5, score + 0.5);
          if (!isControlled) setScore(newScore);
          onChange?.(newScore);
        }
      }}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        let iconType: 'active' | 'half' | 'nonactive' = 'nonactive';
        if (score >= i) iconType = 'active';
        else if (score >= i - 0.5) iconType = 'half';
        return (
          <div key={i} className={styles.iconWrapper}>
            <Image
              src={icons[iconType]}
              width={ICON_SIZE}
              height={ICON_SIZE}
              className={styles.iconImg}
              alt={iconType === 'active' ? '활성' : iconType === 'half' ? '반활성' : '비활성'}
              draggable={false}
              priority
            />
          </div>
        );
      })}
    </div>
  );
};
