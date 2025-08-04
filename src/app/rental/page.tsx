'use client';

import { Suspense } from 'react';

import RentalPage from '@/features/rental/map/page/RentalPage';
import { Loading } from '@/shared/ui/Loading';

function RentalPageWrapper() {
  return <RentalPage />;
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <RentalPageWrapper />
    </Suspense>
  );
}
