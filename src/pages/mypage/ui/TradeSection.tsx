import { ICONS } from '@/shared/config/iconPath';
import Image from 'next/image';

export const TradeSection = () => (
  <>
    <h2 className="mb-2 text-[20px] font-sans font-semibold">나의 거래</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center justify-end gap-1 min-h-[60px]">
          <Image
            src={ICONS.MYPAGE.TRADE_CELL}
            alt="판매 내역"
            width={18}
            height={18}
            className="object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">판매 내역</span>
        </div>
        <div className="flex flex-col items-center justify-end gap-1 min-h-[60px]">
          <Image
            src={ICONS.MYPAGE.TRADE_BUY}
            alt="구매 내역"
            width={22}
            height={22}
            className="object-contain"
          />

          <span className="text-[--font-body-regular] font-sans font-normal">구매 내역</span>
        </div>
        <div className="flex flex-col items-center justify-end gap-1 min-h-[60px]">
          <Image
            src={ICONS.MYPAGE.TRADE_LIKE}
            alt="찜 목록"
            width={15}
            height={15}
            className="object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">찜 목록</span>
        </div>
      </div>
    </section>
  </>
);
