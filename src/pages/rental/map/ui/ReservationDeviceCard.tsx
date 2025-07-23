import React from 'react';

interface DeviceCardProps {
  name: string;
  price: string;
  image?: string;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ name, price, image }) => {
  return (
    <div className="min-w-[180px] max-w-[180px] h-[180px] flex flex-col items-start">
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
        <div className="font-bold text-lg leading-tight">{name}</div>
        <div className="text-base mt-1">{price}</div>
      </div>
    </div>
  );
};

export default DeviceCard;
