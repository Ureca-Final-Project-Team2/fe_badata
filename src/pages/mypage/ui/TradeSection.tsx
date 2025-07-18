import { ICONS } from '@/shared/config/iconPath';

export const TradeSection = () => (
  <>
    <h2 className="mb-2 text-[20px] font-sans font-semibold">나의 거래</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center justify-end gap-1 min-h-[60px]">
          <img
            src={ICONS.MYPAGE.TRADE_CEll}
            alt="판매 내역"
            className="w-[18px] h-[18px] object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">판매 내역</span>
        </div>
        <div className="flex flex-col items-center justify-end gap-1 min-h-[60px]">
          <img
            src={ICONS.MYPAGE.TRADE_BUY}
            alt="구매 내역"
            className="w-[22px] h-[22px] object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">구매 내역</span>
        </div>
        <div className="flex flex-col items-center justify-end gap-1 min-h-[60px]">
          <img
            src={ICONS.MYPAGE.TRADE_LIKE}
            alt="찜 목록"
            className="w-[15px] h-[15px] object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">찜 목록</span>
        </div>
      </div>
    </section>
  </>
);
