import type { MobileCarrier } from '@/pages/trade/register/data/lib/types';

interface MobileCarrierSelectProps {
  value: MobileCarrier;
  onChange: (value: MobileCarrier) => void;
  required?: boolean;
}

export function MobileCarrierSelect({ value, onChange, required }: MobileCarrierSelectProps) {
  return (
    <div className="w-full">
      <label className="text-[14px] text-[var(--gray-dark)] font-medium mb-1 inline-block">
        통신사
      </label>
      <select
        className="w-full h-[45px] border border-[var(--gray-light)] rounded-[12px] px-4 text-[16px] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value as MobileCarrier)}
        required={required}
      >
        <option value="UPLUS">UPLUS</option>
        <option value="SKT">SKT</option>
        <option value="KT">KT</option>
      </select>
    </div>
  );
}
