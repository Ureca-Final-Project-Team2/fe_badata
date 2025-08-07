'use client';

import { useSosRespondMutation } from '@/widgets/sos/model/queries';

interface SosRespondButtonProps {
  sosId: number;
}

export const SosRespondButton = ({ sosId }: SosRespondButtonProps) => {
  const { mutate: respond, isPending } = useSosRespondMutation();

  const handleClick = () => {
    respond(sosId, {
      onSuccess: () => {
        console.log('✅ 응답 성공');
      },
      onError: () => {
        console.error('❌ 응답 실패');
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="px-3 py-1 text-sm bg-[var(--main-5)] hover:bg-[var(--main-4)] rounded-md disabled:opacity-50"
    >
      {isPending ? '응답 중...' : '응답'}
    </button>
  );
};
