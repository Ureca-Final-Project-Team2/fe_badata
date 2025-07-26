import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const TradeSection = () => (
  <>
    <h2 className="mb-2 font-body-semibold">나의 거래</h2>
    <section className="bg-[var(--main-1)] rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-4 text-center">
        <Link
          href="/mypage/sales-history"
          className="flex flex-col items-center justify-end gap-1 min-h-[60px] rounded-xl transition cursor-pointer group"
        >
          <Image
            src={ICONS.MYPAGE.TRADE_CELL}
            alt="판매 내역"
            width={18}
            height={18}
            className="object-contain"
          />
          <span className="font-label-regular group-hover:text-[var(--main-3)]">판매 내역</span>
        </Link>
        <Link
          href="/mypage/purchase-history"
          className="flex flex-col items-center justify-end gap-1 min-h-[60px] rounded-xl transition cursor-pointer group"
        >
          <Image
            src={ICONS.MYPAGE.TRADE_BUY}
            alt="구매 내역"
            width={22}
            height={22}
            className="object-contain"
          />
          <span className="font-label-regular group-hover:text-[var(--main-3)]">구매 내역</span>
        </Link>
        <Link
          href="/mypage/like-trade-post"
          className="flex flex-col items-center justify-end gap-1 min-h-[60px] rounded-xl transition cursor-pointer group"
        >
          <Image
            src={ICONS.MYPAGE.TRADE_LIKE}
            alt="찜 목록"
            width={15}
            height={15}
            className="object-contain"
          />
          <span className="font-label-regular group-hover:text-[var(--main-3)]">찜 목록</span>
        </Link>
      </div>
    </section>
  </>
);
