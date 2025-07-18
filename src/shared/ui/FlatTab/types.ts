import type { flatTabVariants } from '@/shared/ui/FlatTab';
import type { VariantProps } from 'class-variance-authority';

export type FlatTabItem = {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
};

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface FlatTabProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flatTabVariants> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
