import React from 'react';

import { Target } from 'lucide-react';

// 현재 위치 버튼 컴포넌트
const CurrentLocationButton = React.memo(({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-[var(--white)] border border-[var(--gray)] rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-[var(--gray-light)] transition-colors mb-8"
  >
    <Target className="w-5 h-5 text-[var(--gray-dark)]" />
    <span className="text-[var(--gray-dark)] font-label-semibold">현재 위치로 찾기</span>
  </button>
));

CurrentLocationButton.displayName = 'CurrentLocationButton';

export default CurrentLocationButton;
