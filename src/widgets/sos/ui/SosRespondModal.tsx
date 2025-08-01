'use client';

import { useSosRespondMutation } from '../model/queries';
import { useSosStore } from '../model/sosStore';

export const SosRespondModal = () => {
  const { sosId, isRespondModalOpen, closeRespondModal } = useSosStore();
  const { mutate: respond } = useSosRespondMutation();

  if (!isRespondModalOpen || sosId === null) return null;

  const handleRespond = () => {
    respond(sosId, {
      onSuccess: () => {
        closeRespondModal();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center">
        <p className="font-body-regular mb-4">해당 SOS 요청에 응답하시겠습니까?</p>
        <div className="flex gap-4 justify-center">
          <button onClick={closeRespondModal} className="px-4 py-2 border rounded">
            취소
          </button>
          <button
            onClick={handleRespond}
            className="px-4 py-2 bg-[var(--main-5)] text-white rounded"
          >
            응답하기
          </button>
        </div>
      </div>
    </div>
  );
};
