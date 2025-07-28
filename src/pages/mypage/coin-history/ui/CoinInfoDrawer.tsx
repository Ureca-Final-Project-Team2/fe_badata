import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';
import { Drawer } from '@/shared/ui/Drawer';

interface CoinInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoinInfoDrawer({ isOpen, onClose }: CoinInfoDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="bg-[var(--main-1)] rounded-t-3xl p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image
              src={ICONS.MYPAGE.COIN}
              alt="코인 이미지"
              width={28}
              height={28}
              className="rounded-full object-contain"
              unoptimized
            />
            <h2 className="font-title-semibold text-[var(--black)]">BADATA 코인 안내</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--gray-light)] flex items-center justify-center text-[var(--gray-dark)]"
          >
            ×
          </button>
        </div>

        {/* 안내 내용 */}
        <div className="space-y-6">
          {/* 소개 */}
          <div className="bg-[var(--main-1)] rounded-2xl p-5">
            <p className="font-label-regular text-[var(--gray-dark)] leading-relaxed">
              BADATA에서는 자체 코인을 통해 사용자 간 보상과 거래가 이루어집니다.
            </p>
          </div>

          {/* 코인 획득 방법 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--green)] rounded-full flex items-center justify-center">
                <span className="text-[var(--white)] text-sm">💰</span>
              </div>
              <h3 className="font-label-semibold text-[var(--black)]">코인 획득 방법</h3>
            </div>
            <div className="ml-11 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--main-5)] rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-small-regular text-[var(--gray-dark)]">
                  다른 사용자에게 SOS 데이터를 제공할 경우
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--main-5)] rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-small-regular text-[var(--gray-dark)]">
                  공유기 대여 시 대리점 리뷰를 작성할 경우
                </span>
              </div>
            </div>
          </div>

          {/* 코인 사용처 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--main-5)] rounded-full flex items-center justify-center">
                <span className="text-[var(--white)] text-sm">🛒</span>
              </div>
              <h3 className="font-label-semibold text-[var(--black)]">획득한 코인 사용처</h3>
            </div>
            <div className="ml-11 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[var(--main-5)] rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-small-regular text-[var(--gray-dark)]">
                  데이터 거래 게시글 내 데이터 또는 기프티콘 구매
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
} 