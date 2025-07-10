'use client';

import { useState } from 'react';
import { SosDrawer } from './SosDrawer';
import { useSosDrawer } from '../hooks/useSosDrower';

export function SosPage() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useSosDrawer();

  return (
    <div className="relative">
      <SosDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
}
