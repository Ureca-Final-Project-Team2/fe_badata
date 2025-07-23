import React from 'react';

interface ReservationDeviceCardProps {
  name: string;
  price: string;
  image?: string;
  selected?: boolean;
  onClick?: () => void;
}

const ReservationDeviceCard: React.FC<ReservationDeviceCardProps> = ({
  name,
  price,
  image,
  selected,
  onClick,
}) => (
  <div
    className={`min-w-[180px] max-w-[180px] h-[180px] flex flex-col items-start cursor-pointer
      ${selected ? 'border-2 border-[var(--main-5)]' : 'border border-transparent'}`}
    onClick={onClick}
  >
    <div
      className="w-full h-[140px] rounded-[28px] mb-2 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%),\nlinear-gradient(45deg, #f3f3f3 25%, transparent 25%, transparent 75%, #f3f3f3 75%)',
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0, 16px 16px',
      }}
    >
      {image ? <img src={image} alt={name} className="object-contain w-full h-full" /> : null}
    </div>
    <div className="w-full text-left">
      <div className="font-title-semibold text-black">{name}</div>
      <div className="font-label-regular text-black">{price}</div>
    </div>
  </div>
);

export default ReservationDeviceCard;
