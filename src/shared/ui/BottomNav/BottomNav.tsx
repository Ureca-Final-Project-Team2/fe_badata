'use client';

import { useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { FileText, Home, Repeat, User, X } from 'lucide-react';

const NAV_CONFIG = [
  { label: '홈', path: '/', icon: Home },
  { label: '거래', path: '/trade', icon: FileText },
  { label: '대여', path: '/rental', icon: Repeat },
  { label: '마이', path: '/mypage', icon: User },
];

interface BottomNavProps {
  onSosClick?: () => void;
}

export const BottomNav = ({ onSosClick }: BottomNavProps) => {
  const [isSosOpen, setIsSosOpen] = useState(false);
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const getActiveIdx = () => {
    if (pathname === '/') return 0;
    if (pathname.startsWith('/trade')) return 1;
    if (pathname.startsWith('/rental')) return 2;
    if (pathname.startsWith('/mypage')) return 3;
    return -1;
  };
  const activeIdx = getActiveIdx();

  const handleSosToggle = () => {
    setIsSosOpen((prev) => !prev);
    onSosClick?.();
  };

  return (
    <nav className="relative bottom-0 inset-x-0 h-[80px]">
      {/* 파도 형태 */}
      <div
        className="absolute bottom-0 left-0 w-full h-[80px] bg-[var(--main-5)]"
        style={{
          clipPath: `path('M 0 10 C 80 0 120 20 214 10 C 290 0 320 20 400 10 C 420 8 428 12 428 10 L 428 120 L 0 120 Z')`,
        }}
      />

      <ul className="relative flex w-full justify-between items-end px-2 z-10 h-full">
        {NAV_CONFIG.slice(0, 2).map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeIdx === idx;
          return (
            <li key={item.label} className="flex-1 flex flex-col items-center justify-end pb-3">
              <button
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-1"
              >
                <Icon
                  size={24}
                  stroke="white"
                  fill={isActive ? 'white' : 'none'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-xs font-bold text-white">{item.label}</span>
              </button>
            </li>
          );
        })}

        {/* SOS 버튼 */}
        <li className="relative mb-8 z-20 flex flex-col items-center  transition-transform duration-300">
          <button
            onClick={handleSosToggle}
            className={` rounded-full flex items-center justify-center transition-color duration-100 ${
              isSosOpen ? 'w-[80px] h-[80px] bg-black' : 'w-[80px] h-[80px]'
            }`}
          >
            {isSosOpen ? (
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

        {NAV_CONFIG.slice(2).map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeIdx === idx + 2;
          return (
            <li key={item.label} className="flex-1 flex flex-col items-center justify-end pb-3">
              <button
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-1"
              >
                <Icon
                  size={24}
                  stroke="white"
                  fill={isActive ? 'white' : 'none'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-xs font-bold text-white">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
