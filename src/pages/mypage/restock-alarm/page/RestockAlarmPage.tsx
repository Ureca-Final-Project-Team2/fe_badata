'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import { useRestockAlarmListQuery } from '../model/queries';

import type { RestockAlarmItem } from '../lib/types';

export default function RestockAlarmPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useRestockAlarmListQuery();
  let alarms: RestockAlarmItem[] = [];
  if (data?.item) {
    alarms = data.item;
  } else if (data?.content?.item) {
    alarms = data.content.item;
  }
  console.log('alarms', alarms);

  return (
    <BaseLayout
      header={<PageHeader title="재입고 알림 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex-1 overflow-y-auto pt-0 pb-[84px] px-4">
        <div className="flex items-center justify-between mt-6 mb-4">
          <span className="font-body-semibold text-[var(--black)]">
            전체 <span className="text-[var(--main-5)]">{alarms.length}</span>개
          </span>
          <button className="font-body-light-lh text-[var(--gray-mid)]" disabled>
            전체 삭제
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-[var(--gray-mid)]">불러오는 중...</div>
        ) : isError ? (
          <div className="text-center py-8 text-[var(--red-main)]">
            데이터를 불러오지 못했습니다.
          </div>
        ) : alarms.length === 0 ? (
          <div className="text-center py-8 text-[var(--gray-mid)]">알림 내역이 없습니다.</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {alarms.map((item) => (
              <li key={item.id} className="flex gap-3 p-0 min-h-[72px]">
                <div className="w-[72px] h-[72px] bg-[var(--gray-light)] rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.deviceImage}
                    alt="상품 이미지"
                    width={72}
                    height={72}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between h-[72px]">
                  <div className="flex items-start w-full">
                    <div className="font-body-xs-semibold text-[var(--black)] leading-tight break-words whitespace-pre-line overflow-hidden max-h-[52px] flex-1 line-clamp-2">
                      {item.deviceName} {item.is5G ? '(5G)' : ''}
                    </div>
                    <button
                      className="text-[20px] text-[var(--gray-mid)] px-2 py-0 ml-2 flex-shrink-0 relative -top-2"
                      aria-label="삭제"
                      disabled
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-end justify-start w-full mt-1">
                    <span className="font-body-xs-semibold text-[var(--main-5)]">
                      {item.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 rounded-xl border-2 border-[var(--gray-light)] bg-[var(--white)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--main-1)]">
            <span className="font-body-xs-semibold text-[var(--main-5)]">ⓘ</span>
            <span className="font-body-xs-semibold text-[var(--black)]">이용안내</span>
          </div>
          <div className="px-3 pb-3 pt-0 bg-[var(--white)]">
            <ul className="list-disc pl-4">
              <li className="font-body-light-lh text-[var(--gray-mid)] mb-1">
                기기의 입고 시점에 따라 1회 발송되고, 이미 발송된 재입고 알림은 다시 발송되지
                않으므로 고객님께서 확인 후 원하실 때만 알림을 다시 받고 싶으실 경우 해당 상품
                페이지에서 재신청해주시기 바랍니다.
              </li>
              <li className="font-body-light-lh text-[var(--gray-mid)]">
                대여 기간 내에 기기가 재고로 되지 않게 되면 재입고 알림 신청 내역에서 자동으로
                삭제됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
