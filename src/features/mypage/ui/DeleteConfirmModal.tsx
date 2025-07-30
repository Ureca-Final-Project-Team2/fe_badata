'use client';

import { Modal } from '@/shared/ui/Modal';

import type { RestockAlarmItem } from '@/features/mypage/restock-alarm/lib/types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: RestockAlarmItem | null;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-[280px] mx-auto">
        <div className="text-center mb-6">
          <h3 className="font-title-semibold text-[var(--black)] mb-2">재입고 알림 취소</h3>
          <p className="font-body-light-lh text-[var(--gray-mid)]">
            재입고 알림을 취소하시겠습니까?
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 py-3 px-4 font-body-semibold bg-[var(--gray-light)] border border-[var(--gray-light)] rounded-lg hover:bg-[var(--gray-light)]"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer flex-1 py-3 text-[var(--white)] px-4 font-body-semibold bg-[var(--main-5)] rounded-lg hover:bg-[var(--main-4)]"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
