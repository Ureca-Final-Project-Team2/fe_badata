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

export interface FlatTabProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
