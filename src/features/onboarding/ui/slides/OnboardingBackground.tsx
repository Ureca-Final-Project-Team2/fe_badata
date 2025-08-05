'use client';

interface OnboardingBackgroundProps {
  children: React.ReactNode;
}

export function OnboardingBackground({ children }: OnboardingBackgroundProps) {
  return (
    <div className="min-h-screen bg-[var(--white)] relative overflow-hidden">
      {/* 배경 원형 요소들 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 상단 왼쪽 원형들 */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-60" />
        <div className="absolute top-10 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-60" />

        {/* 하단 오른쪽 원형 */}
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-100 rounded-full opacity-60" />

        {/* 분리된 원형 애니메이션 */}
        {/* 큰 원 (334x334) - main-1 색상 */}
        <div className="absolute inset-0 flex justify-center items-center -mt-56 sm:-mt-56 md:-mt-64 lg:-mt-72">
          <div className="w-[334px] h-[334px] rounded-full concentric-circle-large bg-[var(--main-2)]" />
        </div>

        {/* 작은 원 (234x234) - main-2 색상 */}
        <div className="absolute inset-0 flex justify-center items-center -mt-52 sm:-mt-52 md:-mt-60 lg:-mt-68">
          <div className="w-[234px] h-[234px] rounded-full concentric-circle-small bg-[var(--main-4)]" />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
