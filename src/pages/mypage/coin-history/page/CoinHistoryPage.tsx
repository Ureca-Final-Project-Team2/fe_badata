'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useUserCoinQuery } from '@/pages/mypage/coin-history/model/queries';
import { ICONS } from '@/shared/config/iconPath';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Drawer } from '@/shared/ui/Drawer';
import { PageHeader } from '@/shared/ui/Header';

export default function CoinHistoryPage() {
  const { data, isLoading, isError } = useUserCoinQuery();
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);

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

          <p className="font-small-medium text-[var(--gray-dark)]">나의 현재 코인</p>
          <p className="font-body-semibold">+{data.coin}코인</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="font-body-semibold">코인 사용 가능 항목</h2>
            <button
              onClick={() => setIsInfoDrawerOpen(true)}
              className="flex items-center justify-center"
            >
              <span className="font-body-xs-semibold text-[var(--main-5)]">ⓘ</span>
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-[var(--main-1)] flex flex-col items-center gap-1">
              🎁<span className="font-small-medium">기프티콘 구매하기</span>
            </button>
            <button className="flex-1 py-3 rounded-xl bg-[var(--main-1)] flex flex-col items-center gap-1">
              🔁<span className="font-small-medium">데이터 구매하기</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <h2 className="font-body-semibold">BADATA 코인 내역</h2>
          {/* 코인 내역 리스트가 여기에 들어갈 예정 */}
        </div>
      </div>

      {/* BADATA 코인 안내 Drawer - 개선된 디자인 */}
      <Drawer isOpen={isInfoDrawerOpen} onClose={() => setIsInfoDrawerOpen(false)}>
        <div className="relative bg-gradient-to-br from-[var(--main-1)] to-[var(--white)] rounded-t-3xl p-6">
          {/* 헤더 */}
                      <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={ICONS.MYPAGE.COIN}
                  alt="코인 이미지"
                  width={32}
                  height={32}
                  className="rounded-full object-contain"
                  unoptimized
                />
                <h2 className="font-body-semibold text-[var(--black)]">BADATA 코인 안내</h2>
              </div>
            <button
              onClick={() => setIsInfoDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-[var(--gray-light)] hover:bg-[var(--gray)] transition-colors flex items-center justify-center text-[var(--gray-dark)] hover:text-[var(--black)]"
            >
              ×
            </button>
          </div>

          {/* 안내 내용 */}
          <div className="space-y-6">
            {/* 소개 */}
            <div className="bg-[var(--white)]/70 backdrop-blur-sm rounded-2xl p-5 border border-[var(--white)]/30">
              <p className="font-label-regular text-[var(--gray-dark)] leading-relaxed">
                BADATA에서는 자체 코인을 통해 사용자 간 보상과 거래가 이루어집니다.
              </p>
            </div>

            {/* 코인 획득 방법 */}
            <div className="bg-gradient-to-r from-[var(--main-1)] to-[var(--main-2)] rounded-2xl p-5 border border-[var(--white)]/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-[var(--green)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--white)] text-xs">💰</span>
                </div>
                <h3 className="font-label-semibold text-[var(--black)]">코인 획득 방법</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--main-5)] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-small-regular text-[var(--gray-dark)]">
                    다른 사용자에게 SOS 데이터를 제공할 경우
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--main-5)] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-small-regular text-[var(--gray-dark)]">
                    공유기 대여 시 대리점 리뷰를 작성할 경우
                  </span>
                </li>
              </ul>
            </div>

            {/* 코인 사용처 */}
            <div className="bg-gradient-to-r from-[var(--main-2)] to-[var(--main-3)] rounded-2xl p-5 border border-[var(--white)]/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-[var(--main-5)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--white)] text-xs">🛒</span>
                </div>
                <h3 className="font-label-semibold text-[var(--black)]">획득한 코인 사용처</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--main-5)] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-small-regular text-[var(--gray-dark)]">
                    데이터 거래 게시글 내 데이터 또는 기프티콘 구매
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Drawer>
    </BaseLayout>
  );
}
