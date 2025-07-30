'use client';

interface LocationDisplayProps {
  userAddress: string;
  isLoading?: boolean;
  error?: string | null;
}

export function LocationDisplay({ userAddress, isLoading = false, error }: LocationDisplayProps) {
  return (
    <div className="w-full h-[50px] flex flex-row items-center px-4 gap-4">
      <div className="font-label-semibold text-[var(--black)]">기준 위치</div>
      <div className="font-label-regular text-[var(--black)]">
        {isLoading ? '위치 확인 중...' : error ? '위치를 가져올 수 없습니다' : userAddress}
      </div>
    </div>
  );
}
