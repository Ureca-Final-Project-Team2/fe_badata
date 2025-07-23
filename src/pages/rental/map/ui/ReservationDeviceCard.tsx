import DeviceImage from '@/pages/rental/map/ui/DeviceImage';

interface ReservationDeviceCardProps {
  device: {
    deviceName?: string;
    imageUrl?: string;
    dataCapacity?: number | string;
    price?: number;
    remainCount?: number;
    id?: number;
  };
  count?: number;
  onCountChange?: (newCount: number) => void;
  selected?: boolean;
  max?: number;
}

const CARD_SIZE = {
  w: 'w-[270px]',
  h: 'h-[230px]',
  img: 'h-[135px]',
  radius: 'rounded-[20px]', // 카드 전체 radius
  imgRadius: 'rounded-t-[20px]', // 이미지 상단 radius 동일하게
};

export default function ReservationDeviceCard({
  device,
  count = 0,
  onCountChange = () => {},
  selected,
  max = 99,
}: ReservationDeviceCardProps) {
  const sz = CARD_SIZE;
  const { deviceName, imageUrl, dataCapacity, price, remainCount } = device;
  const canIncrement = count < (max ?? 99);
  return (
    <div
      className={`${sz.radius} bg-white ${sz.w} ${sz.h} overflow-hidden flex flex-col border transition
        ${selected ? 'border-[var(--main-5)] border-2' : 'border border-[var(--gray-light)]'} flex-shrink-0 min-w-[270px]`}
      style={{ cursor: 'default' }}
    >
      <div className={`w-full ${sz.img} ${sz.imgRadius} rounded-b-none overflow-hidden`}>
        <DeviceImage
          url={imageUrl ?? ''}
          alt={deviceName ?? ''}
          className={`w-full h-full object-cover ${sz.imgRadius}`}
        />
      </div>
      {/* 정보 영역 */}
      <div className="flex flex-col px-4 py-3 flex-1">
        <div className="flex items-center justify-between w-full mb-1">
          <span className="text-black">
            <span className="font-label-regular">매일 </span>
            <span className="font-label-semibold">{dataCapacity}GB</span>
          </span>
          <span className="font-label-regular text-right text-[var(--main-5)]">
            남은 공유기 <span className="font-label-semibold">{remainCount}대</span>
          </span>
        </div>
        <div className="font-label-semibold text-black mb-1">{deviceName}</div>
        {/* 가격 + 수량조절 한 줄에 */}
        <div className="flex items-center justify-between mb-2">
          <div className="font-label-semibold text-[var(--main-5)]">
            {typeof price === 'number' ? `${price.toLocaleString()}원` : '-'}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onCountChange(Math.max(0, count - 1));
              }}
              type="button"
              disabled={count <= 0}
            >
              –
            </button>
            <span
              className={`font-label-semibold w-6 text-center ${count > 0 ? 'text-[var(--main-5)]' : 'text-black'}`}
            >
              {count}
            </span>
            <button
              className={`w-7 h-7 rounded bg-[var(--gray-light)] text-title-semibold flex items-center justify-center ${!canIncrement ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onCountChange(count + 1);
              }}
              type="button"
              disabled={!canIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
