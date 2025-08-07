import { useRouter } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

import { HEADER_WIDTH } from '@/shared/config/ui';

interface HeaderDetailProps {
  title: string;
}

export function Header_Detail({ title }: HeaderDetailProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <header
      className="w-full h-[70px] px-0 flex items-center justify-between bg-white relative"
      style={{
        maxWidth: `${HEADER_WIDTH.MAX}px`,
        minWidth: `${HEADER_WIDTH.MIN}px`,
      }}
    >
      <button
        className="absolute left-4 w-[50px] h-[30px] flex items-center justify-center cursor-pointer"
        onClick={handleBackClick}
        aria-label="뒤로가기"
      >
        <ChevronLeft size={30} className="text-[var(--main-4)]" />
      </button>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none">
        <span className="text-black text-xl font-semibold">{title}</span>
      </div>
    </header>
  );
}
