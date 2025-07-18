'use client';

import { ICONS } from '@/shared/config/iconPath';
import { HEADER_WIDTH } from '@/shared/config/ui';
import { LoginButton } from '@/shared/ui/LoginButton/LoginButton';

interface HeaderProps {
  isLoggedIn?: boolean;
}

export const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <header
      className={`w-full max-w-[${HEADER_WIDTH.MAX}px] min-w-[${HEADER_WIDTH.MIN}px] h-[90px] px-0 flex items-center justify-between bg-white`}
    >
      <div className="flex items-center justify-center w-[90px] h-[90px] ml-[24px]">
        <img
          src={ICONS.LOGO.BADATA}
          alt="BADATA 로고"
          className="object-contain w-[90px] h-[90px]"
        />
      </div>
      <LoginButton isLoggedIn={isLoggedIn} className="mr-[24px]" />
    </header>
  );
};
