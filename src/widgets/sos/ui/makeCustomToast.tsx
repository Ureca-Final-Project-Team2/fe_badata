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
  actions?: { label: string; onClick: () => void }[]; // 버튼 옵션
}

export const makeCustomToast = (
  message: string,
  variant: ToastVariant,
  options?: CustomToastOptions & { dismissAll?: boolean },
) => {
  if (options?.dismissAll) toast.dismiss();

  toast.custom(
    (t) => (
      <div className="flex flex-col items-start w-[350px] mx-auto gap-4 px-6 py-5 rounded-xl bg-[var(--black)]/80 shadow-md">
        <div className="flex items-start justify-between w-full gap-4">
          <div className="flex items-center gap-3">
            {variant === 'success' ? (
              <button onClick={() => toast.dismiss(t)} aria-label="닫기">
                <CheckCircle2 color="var(--green)" />
              </button>
            ) : (
              <button onClick={() => toast.dismiss(t)} aria-label="닫기">
                <XCircle color="var(--red)" />
              </button>
            )}
            <span className="font-body-semibold text-[var(--white)] whitespace-pre-line">
              {message}
            </span>
          </div>
        </div>

        {options?.actions && (
          <div className="flex gap-2 mt-2 self-end">
            {options.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="px-3 py-1 bg-[var(--main-4)] hover:bg-[var(--main-5)] text-white text-sm rounded-md"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    ),
    {
      duration: options?.duration ?? 4000,
      position: options?.position ?? 'top-center',
    },
  );
};
