import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

type ToastVariant = 'success' | 'warning';

export const makeToast = (message: string, variant: ToastVariant) => {
  toast.custom(
    () => (
      <div className="flex items-center w-[350px] gap-4 px-10 py-6 rounded-xl bg-[var(--black)]/80 shadow-md">
        {variant === 'success' ? (
          <CheckCircle2 color="var(--green)" />
        ) : (
          <XCircle color="var(--red)" />
        )}
        <span className="text-[18px] font-semibold text-white">{message}</span>
      </div>
    ),
    {
      duration: 2000,
    },
  );
};
