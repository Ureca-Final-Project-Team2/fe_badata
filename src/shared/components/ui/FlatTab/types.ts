import type * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { flatTabVariants } from '@ui/FlatTab/FlatTab';

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
