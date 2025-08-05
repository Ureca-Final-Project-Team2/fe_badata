import React from 'react';

import { Clock9, MapPin, Phone as PhoneIcon } from 'lucide-react';

import { formatDisplayTime, getBusinessStatus } from '@/features/rental/utils/businessUtils';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';

import type { StoreDetail } from '@/features/rental/map/lib/types';

interface ContentSectionProps {
  store: StoreDetail;
}

function ContentSection({ store }: ContentSectionProps) {
  const { copyPhoneNumber, copyAddress } = useCopyToClipboard();

  const { status, color } = getBusinessStatus(store.startTime, store.endTime);

  return (
    <div className="flex flex-col w-full p-4 mb-4 gap-2">
      {/* 주소 섹션 */}
      <div className="flex items-start gap-4 mb-2 font-label-regular">
        <MapPin size={30} className="text-[var(--gray-dark)] mt-0.5 " />
        <span
          className="cursor-pointer transition-colors hover:text-[var(--main-5)] active:text-[var(--main-4)]"
          onClick={() => copyAddress(store.detailAddress)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              copyAddress(store.detailAddress);
            }
          }}
          aria-label="주소 복사하기"
        >
          {store.detailAddress}
        </span>
      </div>

      {/* 영업시간 섹션 */}
      <div className="flex items-center gap-4 mb-2 font-label-regular ml-0.5">
        <Clock9 size={26} className="text-[var(--gray-dark)]" />
        <span className={color}>{status}</span>
        <span className="text-[var(--gray-dark)]">
          {' '}
          · {formatDisplayTime(store.startTime)}에 영업 시작
        </span>
      </div>

      {/* 전화번호 섹션 */}
      <div className="flex items-center gap-4 mb-2 font-label-regular ml-0.5">
        <PhoneIcon size={26} className="text-[var(--gray-dark)]" />
        <a
          href={`tel:${store.phoneNumber}`}
          className="cursor-pointer transition-colors group hover:text-[var(--main-5)] active:text-[var(--main-4)]"
        >
          {store.phoneNumber}
        </a>
        {store.phoneNumber && (
          <span
            className="text-[var(--main-5)] cursor-pointer font-label-regular ml-1"
            onClick={() => copyPhoneNumber(store.phoneNumber!)}
          >
            복사
          </span>
        )}
      </div>
    </div>
  );
}

// React.memo로 최적화하여 store props가 변경되지 않으면 리렌더링 방지
export default React.memo(ContentSection);
