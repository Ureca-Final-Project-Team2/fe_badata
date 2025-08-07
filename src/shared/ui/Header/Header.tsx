'use client';

import { useRouter } from 'next/navigation';

import { ICONS } from '@/shared/config/iconPath';
import { PATH } from '@/shared/config/path';
import { HEADER_WIDTH } from '@/shared/config/ui';

export const Header = () => {
  const router = useRouter();
  return (
    <header
      className={`w-full max-w-[${HEADER_WIDTH.MAX}px] min-w-[${HEADER_WIDTH.MIN}px] h-[70px] px-0 flex items-center justify-between bg-white`}
    >
      <div className="flex items-center justify-center w-[90px] h-[90px] ml-[24px]">
        <img
          src={ICONS.LOGO.BADATA}
          alt="BADATA 로고"
          className="object-contain w-[90px] h-[90px] cursor-pointer"
          onClick={() => router.push(PATH.TRADE.MAIN)}
        />
      </div>
    </header>
  );
};
