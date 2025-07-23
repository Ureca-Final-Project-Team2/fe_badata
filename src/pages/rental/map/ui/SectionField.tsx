import type { ReactNode } from 'react';

interface SectionFieldProps {
  title: string;
  children: ReactNode;
}

export default function SectionField({ title, children }: SectionFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-label-semibold">{title}</div>
      {children}
    </div>
  );
}
