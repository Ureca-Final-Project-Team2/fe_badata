'use client';

import Image from 'next/image';

import { useUserCoinQuery } from '@/entities/coin/model/queries';
import { ICONS } from '@/shared/config/iconPath';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function CoinHistoryPage() {
  const { data, isLoading, isError } = useUserCoinQuery();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>코인 정보를 불러오지 못했습니다.</p>;

  return (
    <BaseLayout
      header={<PageHeader title="코인 내역" onBack={() => history.back()} />}
      showBottomNav
    >
      <div className="p-5 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={ICONS.MYPAGE.COIN}
            alt="코인 이미지"
            width={100}
            height={100}
            className="rounded-full object-contain"
            unoptimized
          />

          <p className="font-small-medium text-gray-500">나의 현재 코인</p>
          <p className="font-body-semibold">+{data.coin}코인</p>
        </div>

        <div className="space-y-3">
          <h2 className="font-body-semibold">코인 사용 가능 항목</h2>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-[var(--main-1)] flex flex-col items-center gap-1">
              🎁<span className="font-small-medium">기프티콘 구매하기</span>
            </button>
            <button className="flex-1 py-3 rounded-xl bg-[var(--main-1)] flex flex-col items-center gap-1">
              🔁<span className="font-small-medium">데이터 충전하기</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <h2 className="font-body-semibold">BADATA 코인 안내</h2>
          <div className="rounded-xl bg-[var(--main-1)] font-small-regular text-gray-700 p-4 leading-relaxed">
            <p>BADATA에서는 자체 코인을 통해 사용자 간 보상과 거래가 이루어집니다.</p>
            <p className="mt-2">
              코인은 다른 사용자에게 SOS 데이터를 나눔을 제공하거나, 공유기 대여 리뷰를 작성하면
              보상으로 받을 수 있습니다.
            </p>
            <p className="mt-2">
              획득한 코인은 BADATA 내에서 아래와 같은 방식으로 사용할 수 있습니다:
              <br />
              <span className="text-[var(--main-5)]">
                · 데이터 거래 게시글에서 데이터 또는 기프티콘 구매
              </span>
              <br />
              <span className="text-[var(--main-5)]">· 개인 데이터 충전 시 결제 수단으로 사용</span>
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
