import React, { useEffect, useRef } from 'react';

import Image from 'next/image';

import { useScore } from '@/pages/rental/map/model/useScoreHooks';
import { ICONS } from '@/shared/config/iconPath';

import type { ScoreProps } from '@/pages/rental/map/lib/types';

const ICON_SIZE = 51;
const ICON_GAP = 6;

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
    <>
      <style>{`
        .score-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          user-select: none;
          cursor: ${readOnly ? 'default' : 'pointer'};
          width: ${ICON_SIZE * 5 + ICON_GAP * 4}px;
        }
        .score-icon-wrapper {
          width: ${ICON_SIZE}px;
          height: ${ICON_SIZE}px;
          margin-right: ${ICON_GAP}px;
          position: relative;
          display: inline-block;
        }
        .score-icon-wrapper:last-child {
          margin-right: 0;
        }
        .score-icon-img {
          position: absolute;
          left: 0;
          top: 0;
          width: ${ICON_SIZE}px;
          height: ${ICON_SIZE}px;
          object-fit: contain;
        }
      `}</style>
      <div
        ref={containerRef}
        className="score-container"
        onClick={handleSetScore}
        onMouseMove={(e) => {
          if (e.buttons === 1 && !readOnly) handleSetScore(e);
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => {
          let iconType: 'active' | 'half' | 'nonactive' = 'nonactive';
          if (score >= i) iconType = 'active';
          else if (score >= i - 0.5) iconType = 'half';
          return (
            <div key={i} className="score-icon-wrapper">
              <Image
                src={icons[iconType]}
                width={ICON_SIZE}
                height={ICON_SIZE}
                className="score-icon-img"
                alt={iconType === 'active' ? '활성' : iconType === 'half' ? '반활성' : '비활성'}
                draggable={false}
                priority
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
