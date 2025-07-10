import { FilterDrawer } from '@/shared/components/ui/FilterDrawer';
import { DataUsageCard } from '@ui/DataUsageCard';
import { X } from 'lucide-react';

interface SosDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SosDrawer({ isOpen, onClose }: SosDrawerProps) {
  return (
    <FilterDrawer open={isOpen} onClose={onClose} variant="light">
      <div className="w-full flex flex-col items-center px-4 pt-6 pb-28">
        <button className="w-full max-w-md rounded-xl bg-pink-100 text-pink-500 text-lg py-3 flex items-center justify-center gap-2">
          <span className="text-xl">🚨</span>
          SOS 요청하기
        </button>

        <div className="w-full max-w-md mt-6">
          <h2 className="text-base font-semibold text-black mb-2">나의 데이터 서랍</h2>

          <DataUsageCard
            phoneMasked="010-1**4-5**8"
            planName="5G 청춘 요금제"
            billMonth="5월 청구요금"
            billStatus="납부 완료"
            billAmount="150,340원"
            remainingLabel="남은 데이터"
            totalAmount="5GB"
            totalValue={5}
            remainingValue={2.5}
          />
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-6
    w-[67px] h-[67px] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]
    flex flex-col items-center justify-center transition-colors duration-150 bg-black"
      >
        <span className="text-white text-[32px] leading-none">×</span>
        <span className="text-white text-[14px]">닫기</span>
      </button>
    </FilterDrawer>
  );
}
