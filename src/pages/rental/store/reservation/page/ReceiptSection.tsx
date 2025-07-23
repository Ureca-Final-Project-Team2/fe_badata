import React from 'react';

import Image from 'next/image';

import DeviceReceiptItem from '@/pages/rental/store/reservation/ui/DeviceReciptItem';
import { ICONS } from '@/shared/config/iconPath';
import { RegisterButton } from '@/shared/ui/RegisterButton/RegisterButton';

interface DeviceItem {
  name: string;
  price: string;
  count: number;
}

interface ReceiptSectionProps {
  periodDate: string;
  periodDays: string;
  devices: DeviceItem[];
  onPay?: () => void;
  onClose?: () => void;
}

const getNumber = (str: string) => Number(str.replace(/[^0-9]/g, ''));

const ReceiptSection: React.FC<ReceiptSectionProps> = ({
  periodDate,
  periodDays,
  devices,
  onPay,
  onClose,
}) => {
  const total =
    devices.reduce((sum, d) => sum + getNumber(d.price) * d.count, 0).toLocaleString() + '원';

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-t-2xl shadow-lg w-[320px] mx-auto p-6 relative flex flex-col items-center">
        {/* X 버튼: 카드 상단 우측 */}
        {onClose && (
          <button
            className="absolute top-3 right-5 text-[var(--gray-dark)] hover:text-black font-title-semibold"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
        {/* 바다 로고: 카드 상단 좌측 absolute */}
        <Image
          src={ICONS.LOGO.BADATA}
          alt="badata logo"
          width={60}
          height={18}
          className="object-contain absolute top-3 left-5"
        />
        {/* period(날짜) row, X와의 간격 mt-8 */}
        <div className="w-full flex flex-col items-start mt-18">
          <span className="font-body-semibold text-black leading-tight">{periodDate}</span>
          <span className="font-label-regular text-[var(--gray-dark)] leading-tight">
            {periodDays}
          </span>
        </div>
        <div className="border-t border-dashed border- my-3 w-full" />
        {/* 디바이스 리스트 */}
        <div className="w-full flex flex-col gap-2 mb-2">
          {devices.map((d, i) => (
            <DeviceReceiptItem key={i} name={d.name} price={d.price} count={d.count} />
          ))}
        </div>
        <div className="border-t border-dashed border-gray-200 my-3 w-full" />
        {/* Total */}
        <div className="w-full flex justify-between items-center mb-1">
          <span className="font-title-semibold text-black">Total</span>
          <span className="font-title-semibold text-black">{total}</span>
        </div>
      </div>
      {/* 구불구불 SVG */}
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
        className="mt-8 w-[180px] h-[54px] rounded-xl bg-[var(--main-5)] text-white font-title-semibold shadow-md hover:bg-[var(--main-4)] transition"
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
