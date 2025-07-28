import { useState } from 'react';

import { DataUsageCard } from '@/shared/ui/DataUsageCard';
import { Drawer } from '@/shared/ui/Drawer';

import { useSosDrawer } from '../model/useSosDrawer';

import { SosModal } from './SosModal';

export function SosDrawer() {
  const { isDrawerOpen, closeDrawer } = useSosDrawer();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSosConfirm = () => {
    // SOS 요청 성공 시 추가 처리
    console.log('SOS 요청이 완료되었습니다.');
  };

  return (
    <>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} className="bg-white">
        <div className="w-full flex flex-col items-center px-4 pt-6 pb-28">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-xl bg-[var(--main-1)] text-[var(--main-5)] font-body-medium py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--main-2)] transition-colors"
          >
            <span className="text-xl">🚨</span>
            SOS 요청하기
          </button>

          <div className="w-full mt-6">
            <h2 className="font-body-semibold text-black mb-2">나의 데이터 서랍</h2>

            <DataUsageCard
              phoneMasked="010-1**4-5**8"
              planName="5G 청춘 요금제"
              billMonth="5월 청구요금"
              billStatus="납부 완료"
              billAmount="150,340원"
              remainingLabel="남은 데이터"
              totalAmount="5GB"
              totalValue={5}
              remainingValue={2.5}
            />
          </div>
        </div>

        {/* 하단 고정 닫기 버튼 - SOS 위치에 맞춤 */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={closeDrawer}
            className="w-20 h-20 bg-black text-white rounded-full flex flex-col items-center justify-center border-2 border-white shadow-lg"
          >
            <span className="text-xl font-bold">×</span>
            <span className="text-xs mt-1">닫기</span>
          </button>
        </div>
      </Drawer>

      <SosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSosConfirm}
      />
    </>
  );
}
