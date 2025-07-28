

import { Drawer } from '@/shared/ui/Drawer';

interface CoinInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoinInfoDrawer({ isOpen, onClose }: CoinInfoDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="bg-[var(--gray-light)] rounded-t-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 bg-[var(--main-5)] rounded-full flex items-center justify-center">
            <span className="text-[var(--white)] text-sm font-bold">i</span>
          </div>
          <h2 className="font-label-semibold text-[var(--black)]">BADATA 코인 이용안내</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="font-small-regular text-[var(--black)] leading-relaxed">
              BADATA에서는 자체 코인을 통해 사용자 간 보상 및 거래가 가능합니다.
            </span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-[var(--black)] rounded-full mt-2 flex-shrink-0"></div>
            <span className="font-small-regular text-[var(--black)] leading-relaxed">
              <span className="font-small-semibold">코인 획득 방법:</span>
            </span>
          </div>
          
          <div className="ml-6 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 bg-[var(--black)] rounded-full mt-2 flex-shrink-0"></div>
              <span className="font-small-regular text-[var(--black)] leading-relaxed">
                다른 사용자에게 <span className="text-[var(--main-5)] font-small-semibold">SOS 데이터</span>를 제공할 경우
              </span>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 bg-[var(--black)] rounded-full mt-2 flex-shrink-0"></div>
              <span className="font-small-regular text-[var(--black)] leading-relaxed">
                공유기 대여 시 <span className="text-[var(--main-5)] font-small-semibold">대리점 리뷰</span>를 작성할 경우
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-[var(--black)] rounded-full mt-2 flex-shrink-0"></div>
            <span className="font-small-regular text-[var(--black)] leading-relaxed">
              <span className="font-small-semibold">획득한 코인 사용처:</span>
            </span>
          </div>
          
          <div className="ml-6 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 bg-[var(--black)] rounded-full mt-2 flex-shrink-0"></div>
              <span className="font-small-regular text-[var(--black)] leading-relaxed">
                데이터 거래 게시글 내 <span className="text-[var(--main-5)] font-small-semibold">데이터</span> 또는 <span className="text-[var(--main-5)] font-small-semibold">기프티콘</span> 구매 
              </span>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
} 