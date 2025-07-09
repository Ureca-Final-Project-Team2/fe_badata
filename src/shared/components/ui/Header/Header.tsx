'use client';

import { LoginButton } from '@ui/LoginButton/LoginButton';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="w-full h-[70px] px-4 flex items-center justify-between bg-white shadow-sm">
      <div className="relative w-[100px] h-[30px]">
        <Image src="/BADATA.svg" alt="BADATA 로고" fill className="object-contain" priority />
      </div>
      <LoginButton />
    </header>
  );
};
