export const MyDataUsageCard = () => (
  <div className="w-full rounded-xl bg-white p-4 shadow-sm">
    <div className="flex flex-col items-center">
      <div className="relative w-[160px] h-[160px]">
        {/* 원형 차트 구현은 Chart.js나 SVG로 추가 */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: 'var(--font-title-semibold)',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
          }}
        >
          5GB / 10GB
        </div>
      </div>
      <div className="flex justify-between w-full mt-4">
        <span
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          고래밥 모으기
        </span>
        <span
          style={{
            fontSize: 'var(--font-body-semibold)',
            fontWeight: 500,
            fontFamily: 'var(--font-sans)',
          }}
        >
          현재 🌸 77 코인
        </span>
      </div>
    </div>
  </div>
);
