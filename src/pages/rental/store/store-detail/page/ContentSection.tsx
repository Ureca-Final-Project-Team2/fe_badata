import { Clock9, MapPin, Phone as PhoneIcon } from 'lucide-react';

import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

interface ContentSectionProps {
  store: StoreDetail;
}

export default function ContentSection({ store }: ContentSectionProps) {
  return (
    <div className="flex flex-col w-full p-4 mb-4 gap-2">
      <div className="flex items-start gap-2 mb-2 text-body-semibold">
        <MapPin size={30} className="text-[var(--gray-dark)] mt-0.5" />
        <span>{store.detailAddress}</span>
      </div>
      <div className="flex items-center gap-2 mb-2 text-body-semibold">
        <Clock9 size={20} className="text-[var(--gray-dark)]" />
        <span>영업 종료 · {store.startTime.slice(0, 5)}에 영업 시작</span>
      </div>
      <div className="flex items-center gap-2 mb-2 text-body-semibold">
        <PhoneIcon size={20} className="text-[var(--gray-dark)]" />
        <span className="cursor-pointer transition-colors group hover:text-[var(--main-5)] active:text-[var(--main-4)]">
          {store.phoneNumber}
        </span>
        <span className="text-[var(--main-5)] cursor-pointer text-body-semibold ml-1">복사</span>
      </div>
    </div>
  );
}
