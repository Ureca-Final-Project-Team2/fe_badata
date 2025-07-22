import { useState } from 'react';

export function useScore(initialScore = 0) {
  const [score, setScore] = useState(initialScore);

  // 점수 계산 (마우스 위치 → 0.5 단위 점수)
  const calcScore = (clientX: number, boundingRect: DOMRect) => {
    const x = clientX - boundingRect.left;
    const totalWidth = boundingRect.width;
    const raw = (x / totalWidth) * 5;
    // 0.5 단위로 반올림, 0~5 사이로 clamp
    return Math.max(0, Math.min(5, Math.round(raw * 2) / 2));
  };

  return { score, setScore, calcScore };
}
