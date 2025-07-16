import { DataUsageCard } from '@ui/DataUsageCard';
import { Drawer } from '@ui/Drawer';

interface SosDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SosDrawer({ isOpen, onClose }: SosDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} variant="sos">
      <div className="w-full flex flex-col items-center px-4 pt-6 pb-28">
        <button className="w-full max-w-md rounded-xl bg-pink-100 text-pink-500 text-lg py-3 flex items-center justify-center gap-2 cursor-pointer">
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
    </Drawer>
  );
}
