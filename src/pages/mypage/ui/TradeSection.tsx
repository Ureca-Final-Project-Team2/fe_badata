import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const TradeSection = () => (
  <>
    <h2 className="mb-2 text-[20px] font-sans font-semibold">나의 거래</h2>
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-4 text-center">
        <Link href="#" className="flex flex-col items-center justify-end gap-1 min-h-[60px] hover:bg-[--main-3] rounded-xl transition cursor-pointer">
          <Image
            src={ICONS.MYPAGE.TRADE_CELL}
            alt="판매 내역"
            width={18}
            height={18}
            className="object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">판매 내역</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-end gap-1 min-h-[60px] hover:bg-[--main-3] rounded-xl transition cursor-pointer">
          <Image
            src={ICONS.MYPAGE.TRADE_BUY}
            alt="구매 내역"
            width={22}
            height={22}
            className="object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">구매 내역</span>
        </Link>
        <Link href="/mypage/like-trade-post" className="flex flex-col items-center justify-end gap-1 min-h-[60px] hover:bg-[--main-3] rounded-xl transition cursor-pointer">
          <Image
            src={ICONS.MYPAGE.TRADE_LIKE}
            alt="찜 목록"
            width={15}
            height={15}
            className="object-contain"
          />
          <span className="text-[--font-body-regular] font-sans font-normal">찜 목록</span>
        </Link>
      </div>
    </section>
  </>
);
