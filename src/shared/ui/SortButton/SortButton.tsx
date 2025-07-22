import { ArrowDownUp } from 'lucide-react';

interface SortButtonProps {
  label: string;
  onClick: () => void;
}

export function SortButton({ label, onClick }: SortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row gap-1 items-center font-semibold"
    >
      <ArrowDownUp size={16} />
      {label}
    </button>
  );
}
