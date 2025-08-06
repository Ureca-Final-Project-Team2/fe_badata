'use client';

import { useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { Drawer } from '@/shared/ui/Drawer';
import { DataUsageWidgetContainer } from '@/widgets/data-usage/ui/DataUsageWidgetContainer';
import { useSosDrawer } from '@/widgets/sos/model/useSosDrawer';
import { SosInfoModal } from '@/widgets/sos/ui/SosInfoModal';
import { SosModal } from '@/widgets/sos/ui/SosModal';

export function SosDrawer() {
  const { isDrawerOpen, closeDrawer } = useSosDrawer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const { executeWithAuth } = useAuthRequiredRequest();

  const handleSosRequest = () => {
    executeWithAuth(() => {
      // 로그인된 상태에서만 SosModal 열기
      setIsModalOpen(true);
      return Promise.resolve();
    }, '/api/v1/sos/request');
  };
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} className="bg-white">
        <div className="w-full flex flex-col items-center px-4 pt-6 pb-28">
          <button
            onClick={handleSosRequest}
            className="w-full rounded-xl bg-[var(--main-1)] text-[var(--main-5)] font-body-medium py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--main-2)] transition-colors"
          >
            <span className="text-xl">🚨</span>
            SOS 요청하기
          </button>

          {/* 로그인한 상태일 때만 '나의 데이터 서랍' 표시 */}
          {isLoggedIn && (
            <div className="w-full mt-6">
              <div className="flex items-center justify-between">
                <h2 className="font-body-semibold text-black mb-2">나의 데이터 서랍</h2>
                <button onClick={() => setIsInfoOpen(true)}>
                  <span className="font-small-semibold text-[var(--main-5)]">ⓘ</span>
                </button>
              </div>
              <DataUsageWidgetContainer />
            </div>
          )}

          {/* 하단 고정 닫기 버튼 */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={closeDrawer}
              className="w-20 h-20 bg-black text-white rounded-full flex flex-col items-center justify-center border-2 border-white shadow-lg cursor-pointer"
            >
              <span className="text-xl font-bold">×</span>
              <span className="text-xs mt-1">닫기</span>
            </button>
          </div>
        </div>
      </Drawer>
      <SosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SosInfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </>
  );
}
