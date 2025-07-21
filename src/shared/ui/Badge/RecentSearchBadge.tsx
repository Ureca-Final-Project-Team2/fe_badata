import { X } from 'lucide-react';

import { Badge } from './Badge';

interface RecentSearchBadgeProps {
  label: string;
  onDelete: (label: string) => void;
  onClick?: (label: string) => void;
}

export function RecentSearchBadge({ label, onDelete, onClick }: RecentSearchBadgeProps) {
  return (
    <Badge
      size="xs"
      color="main1Solid"
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => onClick?.(label)}
    >
      <span>{label}</span>
      <button
        type="button"
        className="ml-1"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(label);
        }}
        aria-label={`${label} 삭제`}
      >
        <X className="w-4 h-4 cursor-pointer hover:text-[var(--main-3)]" />
      </button>
    </Badge>
  );
}
