import { isMobileCarrier } from '@/shared/lib/typeGuards';

import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

interface MobileCarrierSelectProps {
  value: MobileCarrier;
  onChange: (value: MobileCarrier) => void;
  required?: boolean;
}

export function MobileCarrierSelect({ value, onChange, required }: MobileCarrierSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (isMobileCarrier(newValue)) {
      onChange(newValue);
    } else {
      console.error('Invalid mobile carrier value:', newValue);
      onChange('UPLUS');
    }
  };

  return (
    <div className="w-full">
      <label className="text-[14px] text-[var(--gray-dark)] font-medium mb-1 inline-block">
        통신사
      </label>
      <select
        className="w-full h-[45px] border border-[var(--gray-light)] rounded-[12px] px-4 text-[16px] focus:outline-none cursor-pointer"
        value={value}
        onChange={handleChange}
        required={required}
      >
        <option value="UPLUS" className="cursor-pointer">
          UPLUS
        </option>
        <option value="SKT" className="cursor-pointer">
          SKT
        </option>
        <option value="KT" className="cursor-pointer">
          KT
        </option>
      </select>
    </div>
  );
}
