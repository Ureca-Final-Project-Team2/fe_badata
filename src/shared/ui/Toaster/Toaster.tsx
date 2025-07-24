'use client';

import type { ToasterProps } from 'sonner';
import { Toaster as Sonner } from 'sonner';

export function Toaster(props: ToasterProps) {
  return (
    <Sonner position="top-center" className="!left-1/2 !-translate-x-1/2 !right-auto" {...props} />
  );
}
