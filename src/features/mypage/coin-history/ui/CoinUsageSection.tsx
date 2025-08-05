interface CoinUsageSectionProps {
  onInfoClick: () => void;
}

export function CoinUsageSection({ onInfoClick }: CoinUsageSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="font-body-semibold mt-4">코인 사용 가능 항목</h2>
        <button
          onClick={onInfoClick}
          className="flex items-center justify-center"
        >
          <span className="font-small-semibold mt-4 text-[var(--main-5)]">ⓘ</span>
        </button>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-xl bg-[var(--main-1)] flex flex-col items-center gap-1">
          🎁<span className="font-small-medium">기프티콘 구매하기</span>
        </button>
        <button className="flex-1 py-3 rounded-xl bg-[var(--main-1)] flex flex-col items-center gap-1">
          📱<span className="font-small-medium">데이터 구매하기</span>
        </button>
      </div>
    </div>
  );
} 