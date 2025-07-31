'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  useDeleteRestockAlarmMutation,
  useRestockAlarmListQuery,
} from '@/features/mypage/restock-alarm/model/queries';
import { AlarmNoticeSection } from '@/features/mypage/ui/AlarmNoticeSection';
import { DeleteConfirmModal } from '@/features/mypage/ui/DeleteConfirmModal';
import { makeToast } from '@/shared/lib/makeToast';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import type { RestockAlarmItem } from '@/features/mypage/restock-alarm/lib/types';

export default function RestockAlarmPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useRestockAlarmListQuery();
  const deleteMutation = useDeleteRestockAlarmMutation();
  const alarms: RestockAlarmItem[] = data?.item || [];

  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [removedAlarmIds, setRemovedAlarmIds] = useState<Set<number>>(new Set());
  const [removingAlarmIds, setRemovingAlarmIds] = useState<Set<number>>(new Set());

  // 확인 모달 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<RestockAlarmItem | null>(null);

  const handleDeleteClick = (item: RestockAlarmItem) => {
    setItemToDelete(item);
    setShowConfirmModal(true);
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeletingIds((prev) => new Set(prev).add(itemToDelete.id));

      // 애니메이션을 위한 제거 중 상태 설정
      setRemovingAlarmIds((prev) => new Set([...prev, itemToDelete.id]));

      await deleteMutation.mutateAsync(itemToDelete.id);

      makeToast('재입고 알림을 해제하였습니다.', 'success');

      // 애니메이션 완료 후 실제 제거
      timeoutRef.current = setTimeout(() => {
        setRemovedAlarmIds((prev) => new Set([...prev, itemToDelete.id]));
        setRemovingAlarmIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemToDelete.id);
          return newSet;
        });
      }, 500); // 애니메이션 지속 시간
    } catch (error) {
      console.error('재입고 알림 삭제 실패:', error);
      makeToast('재입고 알림 삭제에 실패했습니다.', 'warning');
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemToDelete.id);
        return newSet;
      });
    }

    // 모달 닫기
    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  // 제거된 알림을 필터링
  const filteredAlarms = alarms.filter((item) => !removedAlarmIds.has(item.id));

  return (
    <BaseLayout
      header={<PageHeader title="재입고 알림 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex-1 overflow-y-auto pt-0 pb-[84px] px-4">
        <AlarmNoticeSection />
        <div className="flex items-center justify-between mt-6 mb-4">
          <span className="font-body-semibold text-[var(--black)]">
            전체 <span className="text-[var(--main-5)]">{filteredAlarms.length}</span>개
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-[var(--gray-mid)] animate-pulse">
            <div className="loading-spinner mr-2"></div>
            불러오는 중...
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-[var(--red-main)] animate-fade-in">
            데이터를 불러오지 못했습니다.
          </div>
        ) : filteredAlarms.length === 0 ? (
          <div className="text-center py-8 text-[var(--gray-mid)] animate-fade-in">
            알림 내역이 없습니다.
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {filteredAlarms.map((item, index) => {
              const isDeleting = deletingIds.has(item.id);
              const isRemoving = removingAlarmIds.has(item.id);
              const staggerClass = `animate-stagger-${Math.min(index + 1, 5)}`;

              return (
                <li
                  key={item.id}
                  className={`flex gap-3 p-0 min-h-[72px] transition-all duration-500 ease-in-out ${
                    isRemoving ? 'animate-slide-out-down' : `animate-slide-in-up ${staggerClass}`
                  }`}
                  style={{
                    transform: isRemoving
                      ? 'translateY(100%) scale(0.8)'
                      : 'translateY(0) scale(1)',
                    opacity: isRemoving ? 0 : 1,
                    height: isRemoving ? '0' : 'auto',
                    marginBottom: isRemoving ? '0' : '16px',
                    overflow: 'hidden',
                  }}
                >
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
                        className={`cursor-pointer text-[20px] px-2 py-0 ml-2 flex-shrink-0 relative -top-2 transition-all duration-200 ${
                          isDeleting
                            ? 'text-[var(--gray-light)] cursor-not-allowed'
                            : 'text-[var(--gray-mid)] hover:text-[var(--red-main)] hover:scale-110'
                        }`}
                        aria-label="삭제"
                        onClick={() => {
                          if (!isDeleting) {
                            handleDeleteClick(item);
                          }
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? '⋯' : '×'}
                      </button>
                    </div>
                    <div className="mt-1 text-[12px] font-body-xs-semibold text-[var(--gray-mid)]">
                      {item.storeName}
                    </div>
                    <div className="mt-[2px] flex items-center justify-between w-full">
                      <span className="font-body-xs-semibold text-[var(--main-5)]">
                        {item.price.toLocaleString()}원
                      </span>
                      <span className="text-[12px] font-body-xs text-[var(--gray-mid)]">
                        남은 공유기 {item.desiredCount}개
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <DeleteConfirmModal
          isOpen={showConfirmModal}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          item={itemToDelete}
        />
      </div>
    </BaseLayout>
  );
}
