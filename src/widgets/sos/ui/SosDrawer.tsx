'use client';

import { useEffect, useState } from 'react';

import { X } from 'lucide-react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { END_POINTS } from '@/shared/api/endpoints';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { Drawer } from '@/shared/ui/Drawer';
import { DataUsageWidgetContainer } from '@/widgets/data-usage/ui/DataUsageWidgetContainer';
import { useSosDrawer } from '@/widgets/sos/model/useSosDrawer';
import { SosInfoModal } from '@/widgets/sos/ui/SosInfoModal';
import { SosModal } from '@/widgets/sos/ui/SosModal';

export function SosDrawer() {
  const { isDrawerOpen, closeDrawer } = useSosDrawer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const { isLoggedIn } = useAuthStore();
  const { executeWithAuth } = useAuthRequiredRequest();

  // 정보 창 자동 오픈
  useEffect(() => {
    if (isDrawerOpen) {
      setIsInfoOpen(true);
    }
  }, [isDrawerOpen]);

  const handleSosRequest = () => {
    executeWithAuth(
      () => {
        // 로그인된 상태에서만 SosModal 열기
        setIsModalOpen(true);
        return Promise.resolve();
      },
      `${END_POINTS.SOS.REQUEST}`,
      {
        type: 'SOS_REQUEST',
        method: 'POST',
      },
    );
  };

  return (
    <>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} className="bg-[var(--white)]">
        <div className="w-full flex flex-col items-center px-4 pt-6 pb-28">
          <button
            onClick={handleSosRequest}
            className="w-full rounded-xl bg-[var(--main-1)] text-[var(--main-5)] font-body-medium py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-[var(--main-2)] transition-colors"
          >
            <span className="font-body-semibold">🚨</span>
            SOS 요청하기
          </button>

          {/* 로그인한 상태일 때만 '나의 데이터 서랍' 표시 */}
          {isLoggedIn && (
            <div className="w-full mt-6">
              <div className="flex items-center gap-1">
                <h2 className="font-body-semibold text-[var(--black)] mb-2">나의 데이터 서랍</h2>
                <button onClick={() => setIsInfoOpen(true)}>
                  <span className="font-small-semibold text-[var(--main-5)] translate-y-[-3px] inline-block">
                    ⓘ
                  </span>
                </button>
              </div>
              <DataUsageWidgetContainer />
            </div>
          )}

          {/* 하단 고정 닫기 버튼 */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={closeDrawer}
              className="w-20 h-20 bg-[var(--black)] text-[var(--white)] rounded-full flex flex-col items-center justify-center border-2 border-[var(--white)] shadow-lg cursor-pointer"
            >
              <X className="font-label-semibold w-5 h-5 text-[var(--white)]" />
              <span className="font-small-semibold mt-1">닫기</span>
            </button>
          </div>
        </div>
      </Drawer>
      <SosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SosInfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </>
  );
}
