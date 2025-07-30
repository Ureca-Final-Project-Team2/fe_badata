'use client';

import { useState } from 'react';

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

  // 확인 모달 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<RestockAlarmItem | null>(null);

  const handleDeleteClick = (item: RestockAlarmItem) => {
    setItemToDelete(item);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeletingIds((prev) => new Set(prev).add(itemToDelete.id));

      await deleteMutation.mutateAsync(itemToDelete.id);

      makeToast('재입고 알림을 해제하였습니다.', 'success');
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

  return (
    <BaseLayout
      header={<PageHeader title="재입고 알림 내역" onBack={() => router.back()} />}
      showBottomNav
    >
      <div className="w-full max-w-[428px] flex-1 overflow-y-auto pt-0 pb-[84px] px-4">
        <AlarmNoticeSection />
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
            {alarms.map((item) => {
              const isDeleting = deletingIds.has(item.id);

              return (
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
                        className={`cursor-pointer text-[20px] px-2 py-0 ml-2 flex-shrink-0 relative -top-2 ${
                          isDeleting
                            ? 'text-[var(--gray-light)] cursor-not-allowed'
                            : 'text-[var(--gray-mid)] hover:text-[var(--red-main)]'
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
                    <div className="flex items-end justify-start w-full mt-1">
                      <span className="font-body-xs-semibold text-[var(--main-5)]">
                        {item.price.toLocaleString()}원
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
