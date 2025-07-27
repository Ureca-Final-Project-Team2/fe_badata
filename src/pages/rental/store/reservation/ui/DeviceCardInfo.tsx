import React from 'react';

interface DeviceCardInfoProps {
  deviceName?: string;
  dataCapacity?: number | string;
  price?: number;
  remainCount: number;
  count: number;
  isSoldOut: boolean;
  onDecrement: (e: React.MouseEvent) => void;
  onIncrement: (e: React.MouseEvent) => void;
  canIncrement: boolean;
}

const DeviceCardInfo: React.FC<DeviceCardInfoProps> = ({
  deviceName,
  dataCapacity,
  price,
  remainCount,
  count,
  isSoldOut,
  onDecrement,
  onIncrement,
  canIncrement,
}) => {
  return (
    <div className="flex flex-col px-4 py-3 flex-1">
      {/* 데이터 용량 및 재고 정보 */}
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-[var(--black)]">
          <span className="font-label-regular">매일 </span>
          {dataCapacity === 999 || dataCapacity === '999' ? (
            <span className="font-label-semibold"> 무제한</span>
          ) : (
            <span className="font-label-semibold">{dataCapacity}GB</span>
          )}
        </span>
        <span className="font-label-regular text-right text-[var(--main-5)]">
          {remainCount <= 0 ? (
            <span className="font-label-semibold text-[var(--orange)]">재입고알림</span>
          ) : (
            <>
              남은 공유기 <span className="font-label-semibold">{remainCount}대</span>
            </>
          )}
        </span>
      </div>

      {/* 기기명 */}
      <div className="font-label-semibold text-[var(--black)] mb-1">{deviceName}</div>

      {/* 가격 + 수량조절 */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-label-semibold text-[var(--main-5)]">
          {typeof price === 'number' ? `${price.toLocaleString()}원` : '-'}
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center ${
              count <= 0 || isSoldOut ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onDecrement}
            type="button"
            disabled={count <= 0 || isSoldOut}
          >
            –
          </button>
          <span
            className={`font-label-semibold w-6 text-center ${
              count > 0 ? 'text-[var(--main-5)]' : 'text-[var(--black)]'
            }`}
          >
            {count}
          </span>
          <button
            className={`w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center ${
              !canIncrement || isSoldOut ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onIncrement}
            type="button"
            disabled={!canIncrement || isSoldOut}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeviceCardInfo);
