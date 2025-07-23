import React from 'react';

import Image from 'next/image';

import DeviceReceiptItem from '@/pages/rental/store/reservation/ui/DeviceReciptItem';
import { ICONS } from '@/shared/config/iconPath';
import { RegisterButton } from '@/shared/ui/RegisterButton/RegisterButton';

interface ReceiptSectionProps {
  periodDate: string;
  periodDays: string;
  devices: { name: string; price: string; count: number }[];
  onPay?: () => void;
  onClose?: () => void;
}

const ReceiptSection: React.FC<ReceiptSectionProps> = ({
  periodDate,
  periodDays,
  devices,
  onPay,
  onClose,
}) => {
  const getNumber = (str: string) => Number(str.replace(/[^0-9]/g, ''));
  const total =
    devices.reduce((sum, d) => sum + getNumber(d.price) * d.count, 0).toLocaleString() + '원';

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-t-2xl shadow-lg w-[320px] mx-auto p-6 relative flex flex-col items-center">
        {/* 상단: 로고, 날짜, 닫기 */}
        <div className="flex w-full items-center justify-between mb-4 relative">
          <Image
            src={ICONS.LOGO.BADATA}
            alt="badata logo"
            width={80}
            height={24}
            className="object-contain"
          />
          <div className="text-xs text-gray-400 text-right">
            <div>{periodDate}</div>
            <div>{periodDays}</div>
          </div>
          {onClose && (
            <button
              className="absolute top-0 right-0 text-gray-400 hover:text-black text-2xl"
              onClick={onClose}
              aria-label="Close"
              style={{ transform: 'translate(120%, -20%)' }}
            >
              ×
            </button>
          )}
        </div>
        {/* 디바이스 리스트 */}
        <div className="w-full flex flex-col gap-2 mb-2">
          {devices.map((d, i) => (
            <DeviceReceiptItem key={i} name={d.name} price={d.price} count={d.count} />
          ))}
        </div>
        <div className="border-t border-dashed border-gray-200 my-3 w-full" />
        {/* Total */}
        <div className="w-full flex justify-between items-center mb-1">
          <span className="font-bold text-base text-black">Total</span>
          <span className="font-bold text-2xl text-black">{total}</span>
        </div>
      </div>
      {/* 구불구불한 하단 SVG */}
      <svg
        width="320"
        height="20"
        viewBox="0 0 320 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        style={{ marginTop: '-1px' }}
      >
        <rect width="320" height="10" fill="white" />
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={10 + i * 20} cy={10} r={10} fill="white" stroke="none" />
        ))}
      </svg>
      <RegisterButton
        className="mt-8 w-[180px] h-[54px] rounded-xl bg-[var(--main-5)] text-white font-bold text-xl shadow-md hover:bg-[var(--main-4)] transition"
        size="lg"
        isFormValid={true}
        onClick={onPay}
      >
        결제
      </RegisterButton>
    </div>
  );
};

export default ReceiptSection;
