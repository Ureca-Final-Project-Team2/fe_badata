export const MyDataUsageCard = () => (
  <div className="w-full rounded-xl bg-white p-4 shadow-sm">
    <div className="flex flex-col items-center">
      <div className="relative w-[160px] h-[160px]">
        {/* 원형 차트 구현은 Chart.js나 SVG로 추가 */}
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          5GB / 10GB
        </div>
      </div>
      <div className="flex justify-between w-full mt-4 text-sm">
        <span>고래밥 모으기</span>
        <span className="text-main-1 font-medium">현재 🌸 77 코인</span>
      </div>
    </div>
  </div>
);
