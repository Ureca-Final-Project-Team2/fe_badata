import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/shared/config/iconPath';

export const TradeSection = () => (
  <>
    <h2 className="mb-2 font-body-semibold">나의 거래</h2>
    <section className="bg-[var(--main-1)] rounded-xl px-4 py-5">
      <ul className="flex justify-between items-center text-center">
        <li className="flex flex-col items-center flex-1 gap-2">
          <Link href="/mypage/sales-history" className="flex flex-col items-center group">
            <div className="h-[28px] flex items-center justify-center">
              <Image src={ICONS.MYPAGE.TRADE_CELL} alt="판매 내역" width={20} height={20} />
            </div>
            <span className="font-label-regular group-hover:text-[var(--main-5)]">판매 내역</span>
          </Link>
        </li>

        <li className="flex flex-col items-center flex-1 gap-2">
          <Link href="/mypage/purchase-history" className="flex flex-col items-center group">
            <div className="h-[28px] flex items-center justify-center">
              <Image src={ICONS.MYPAGE.TRADE_BUY} alt="구매 내역" width={24} height={24} />
            </div>
            <span className="font-label-regular group-hover:text-[var(--main-5)]">구매 내역</span>
          </Link>
        </li>

        <li className="flex flex-col items-center flex-1 gap-2">
          <Link href="/mypage/like-trade-post" className="flex flex-col items-center group">
            <div className="h-[28px] flex items-center justify-center">
              <Image src={ICONS.MYPAGE.TRADE_LIKE} alt="찜 목록" width={18} height={18} />
            </div>
            <span className="font-label-regular group-hover:text-[var(--main-5)]">찜 목록</span>
          </Link>
        </li>
      </ul>
    </section>
  </>
);
