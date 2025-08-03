import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

type ToastVariant = 'success' | 'warning';

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface CustomToastOptions {
  duration?: number;
  position?: ToastPosition;
}

export const makeCustomToast = (
  message: string,
  variant: ToastVariant,
  options?: CustomToastOptions
) => {
  toast.dismiss();

  toast.custom(() => (
    <div className="flex items-center w-[350px] gap-4 px-10 py-6 rounded-xl bg-[var(--black)]/80 shadow-md">
      {variant === 'success' ? (
        <CheckCircle2 color="var(--green)" />
      ) : (
        <XCircle color="var(--red)" />
      )}
      <span className="font-body-semibold text-[var(--white)]">{message}</span>
    </div>
  ), {
    duration: options?.duration ?? 3000,
    position: options?.position ?? 'top-center',
  });
};