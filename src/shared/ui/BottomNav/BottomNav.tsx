'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { Home, ShoppingCart, User, Wifi, X } from 'lucide-react';

import { useSosDrawer } from '@/widgets/sos/model/useSosDrawer';

import { WAVE_CLIP_PATH } from './constants';

const NAV_CONFIG = [
  { label: '홈', path: '/', icon: Home },
  { label: '거래', path: '/trade', icon: ShoppingCart },
  { label: '대여', path: '/rental', icon: Wifi },
  { label: '마이', path: '/mypage', icon: User },
];

const NavItem = ({
  item,
  isActive,
  onClick,
}: {
  item: (typeof NAV_CONFIG)[0];
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = item.icon;
  return (
    <li className="flex-1 flex flex-col items-center justify-end pb-3">
      <button onClick={onClick} className="flex flex-col items-center gap-1">
        <Icon
          size={24}
          stroke={isActive ? 'var(--main-3)' : 'var(--gray-light)'}
          strokeWidth={isActive ? 2.5 : 2}
        />
        <span
          className={`text-xs font-bold ${isActive ? 'text-[var(--main-3)]' : 'text-[var(--gray-light)]'}`}
        >
          {item.label}
        </span>
      </button>
    </li>
  );
};

export const BottomNav = () => {
  const { isDrawerOpen, toggleDrawer } = useSosDrawer();
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const getActiveIdx = () => {
    return NAV_CONFIG.findIndex((item) => {
      if (item.path === '/') {
        return pathname === '/';
      }
      return pathname.startsWith(item.path);
    });
  };
  const activeIdx = getActiveIdx();

  return (
    <nav className="relative bottom-0 inset-x-0 h-[80px]">
      {/* 파도 형태 */}
      <div
        className="absolute bottom-0 left-0 w-full h-[80px] bg-[var(--main-5)]"
        style={{
          clipPath: WAVE_CLIP_PATH,
        }}
      />

      <ul className="relative flex w-full justify-between items-end px-2 z-10 h-full">
        {NAV_CONFIG.slice(0, 2).map((item, idx) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={activeIdx === idx}
            onClick={() => router.push(item.path)}
          />
        ))}

        {/* SOS 버튼 */}
        <li className="relative mb-6 z-20 flex flex-col items-center transition-transform duration-300">
          <button
            onClick={toggleDrawer}
            className={`w-[80px] h-[80px] rounded-full flex items-center justify-center transition-color duration-100 ${
              isDrawerOpen ? 'bg-black' : 'none'
            }`}
          >
            {isDrawerOpen ? (
              <div className="flex flex-col items-center text-white justify-center transition-opacity duration-200">
                <X />
                <span className="text-[14px] font-semibold">닫기</span>
              </div>
            ) : (
              <Image
                src="/images/sos-button.svg"
                alt="SOS"
                width={80}
                height={80}
                draggable={false}
                priority
              />
            )}
          </button>
        </li>

        {NAV_CONFIG.slice(2).map((item, idx) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={activeIdx === idx + 2}
            onClick={() => router.push(item.path)}
          />
        ))}
      </ul>
    </nav>
  );
};
