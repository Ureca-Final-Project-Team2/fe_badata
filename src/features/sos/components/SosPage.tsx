'use client';

import { useState } from 'react';
import { SosDrawer } from './SosDrawer';

export function SosPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-lg font-bold">SOS 요청용 페이지</h1>
      </div>
      <SosDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
