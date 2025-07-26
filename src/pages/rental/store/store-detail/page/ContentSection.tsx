import { Clock9, MapPin, Phone as PhoneIcon } from 'lucide-react';

import { makeToast } from '@/shared/lib/makeToast';

import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

interface ContentSectionProps {
  store: StoreDetail;
}

function getBusinessStatus(startTime: string, endTime: string) {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  let endMinutes = endHour * 60 + endMin;

  // 자정을 넘나드는 경우 처리 (예: 22:00-02:00)
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // 다음날로 연장
    if (nowMinutes < startMinutes) {
      const adjustedNow = nowMinutes + 24 * 60;
      if (adjustedNow >= startMinutes && adjustedNow <= endMinutes) {
        return { status: '영업 중', color: 'text-[var(--main-5)]' };
      }
    }
  }
  if (nowMinutes < startMinutes) return { status: '영업 전', color: 'text-[var(--gray)]' };
  if (nowMinutes >= startMinutes && nowMinutes <= endMinutes)
    return { status: '영업 중', color: 'text-[var(--main-5)]' };
  return { status: '영업 종료', color: 'text-[var(--gray)]' };
}

export default function ContentSection({ store }: ContentSectionProps) {
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(store.phoneNumber)
        .then(() => {
          makeToast('번호가 복사되었습니다', 'success');
        })
        .catch(() => {
          makeToast('복사에 실패했습니다', 'warning');
        });
    } else {
      makeToast('클립보드를 지원하지 않는 브라우저입니다', 'warning');
    }
  };

  const handleAddressCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(store.detailAddress);
      makeToast('주소가 복사되었습니다', 'success');
    }
  };

  const { status, color } = getBusinessStatus(store.startTime, store.endTime);

  return (
    <div className="flex flex-col w-full p-4 mb-4 gap-2">
      <div className="flex items-start gap-2 mb-2 font-label-regular">
        <MapPin size={30} className="text-[var(--gray-dark)] mt-0.5" />
        <span
          className="cursor-pointer transition-colors hover:text-[var(--main-5)] active:text-[var(--main-4)]"
          onClick={handleAddressCopy}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleAddressCopy();
            }
          }}
          aria-label="주소 복사하기"
        >
          {store.detailAddress}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2 font-label-regular">
        <Clock9 size={20} className="text-[var(--gray-dark)]" />
        <span className={color}>{status}</span>
        <span className="text-[var(--gray-dark)]">
          {' '}
          · {store.startTime.slice(0, 5)}에 영업 시작
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2 font-label-regular">
        <PhoneIcon size={20} className="text-[var(--gray-dark)]" />
        <a
          href={`tel:${store.phoneNumber}`}
          className="cursor-pointer transition-colors group hover:text-[var(--main-5)] active:text-[var(--main-4)]"
        >
          {store.phoneNumber}
        </a>
        <span
          className="text-[var(--main-5)] cursor-pointer font-label-regular ml-1"
          onClick={handleCopy}
        >
          복사
        </span>
      </div>
    </div>
  );
}
