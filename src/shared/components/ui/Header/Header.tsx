'use client';

import Image from 'next/image';
import { LoginButton } from '@ui/LoginButton';
import { ICONS } from '@/constants/iconPath';

export const Header = () => {
  return (
    <header className="w-full h-[70px] px-4 flex items-center justify-between bg-white">
      <div className="relative w-[100px] h-[30px]">
        <Image src={ICONS.LOGO.BADATA} alt="BADATA 로고" fill className="object-contain" priority />
      </div>
      <LoginButton />
    </header>
  );
};
