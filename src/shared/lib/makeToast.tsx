import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

type ToastVariant = 'success' | 'warning';

export const makeToast = (message: string, variant: ToastVariant) => {
  // 기존 토스트들을 모두 제거
  toast.dismiss();

  // 새 토스트 표시
  toast.custom(
    () => (
      <div className="flex items-center w-[350px] gap-4 px-10 py-6 rounded-xl bg-[var(--black)]/80 shadow-md">
        {variant === 'success' ? (
          <CheckCircle2 color="var(--green)" />
        ) : (
          <XCircle color="var(--red)" />
        )}
        <span className="font-body-semibold text-[var(--white)]">{message}</span>
      </div>
    ),
    {
      duration: 2000,
      position: 'bottom-center',
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        left: '0',
      },
    },
  );

  console.log('✅ 새 토스트 표시:', message);
};
