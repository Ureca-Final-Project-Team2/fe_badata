'use client';

import { useState } from 'react';
import { SosDrawer } from './SosDrawer';

export function SosPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative">
      {/* <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-pink-100 text-pink-600 px-4 py-2 rounded-full shadow"
      >
        🚨 SOS 요청하기
      </button> */}

      {isDrawerOpen && <SosDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />}
    </div>
  );
}
