import React from 'react';

import Image from 'next/image';

import DeviceReceiptItem from '@/features/rental/store/reservation/ui/DeviceReceiptItem';
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
  isSubmitting?: boolean;
}

const getNumber = (str: string) => {
  const cleanStr = str.replace(/[^0-9]/g, '');
  const parsed = Number(cleanStr);
  if (isNaN(parsed)) {
    console.warn(`Failed to parse price: ${str}`);
    return 0;
  }
  return parsed;
};

const ReceiptSection: React.FC<ReceiptSectionProps> = ({
  periodDate,
  periodDays,
  devices,
  onPay,
  onClose,
  isSubmitting = false,
}) => {
  const total =
    devices
      .reduce((sum, d) => {
        const price = getNumber(d.price);
        return sum + price * d.count;
      }, 0)
      .toLocaleString() + '원';

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-t-2xl shadow-lg w-[320px] mx-auto p-6 relative flex flex-col items-center">
        {/* X 버튼: 카드 상단 우측 */}
        {onClose && !isSubmitting && (
          <button
            className="absolute top-3 right-5 text-[var(--gray-dark)] hover:text-[var(--black)] font-title-semibold"
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
          <span className="font-body-semibold text-[var(--black)] leading-tight">{periodDate}</span>
          <span className="font-label-regular text-[var(--gray-dark)] leading-tight">
            {periodDays}
          </span>
        </div>
        <div className="border-t border-dashed border-gray-200 my-3 w-full" />
        {/* 디바이스 리스트 */}
        <div className="w-full flex flex-col gap-2 mb-2">
          {devices.map((d, i) => (
            <DeviceReceiptItem key={i} name={d.name} price={d.price} count={d.count} />
          ))}
        </div>
        <div className="border-t border-dashed border-gray-200 my-3 w-full" />
        {/* Total */}
        <div className="w-full flex justify-between items-center mb-1">
          <span className="font-title-semibold text-[var(--black)]">Total</span>
          <span className="font-title-semibold text-[var(--black)]">{total}</span>
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
        className={`mt-8 w-[180px] h-[54px] rounded-xl font-title-semibold shadow-md transition ${
          isSubmitting
            ? 'bg-[var(--gray)] text-white cursor-not-allowed'
            : 'bg-[var(--main-5)] text-white hover:bg-[var(--main-4)]'
        }`}
        size="lg"
        isFormValid={!isSubmitting}
        onClick={isSubmitting ? undefined : onPay}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            처리 중...
          </div>
        ) : (
          '결제'
        )}
      </RegisterButton>
    </div>
  );
};

export default ReceiptSection;
