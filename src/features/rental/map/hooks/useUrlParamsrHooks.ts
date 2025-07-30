import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

// URL 파라미터 관리를 위한 커스텀 훅
export const useUrlParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasProcessedUrlParams, setHasProcessedUrlParams] = useState(false);

  const selectedLat = !hasProcessedUrlParams ? searchParams?.get('lat') : null;
  const selectedLng = !hasProcessedUrlParams ? searchParams?.get('lng') : null;
  const selectedAddress = !hasProcessedUrlParams ? searchParams?.get('address') : null;
  const selectedPlaceName = !hasProcessedUrlParams ? searchParams?.get('placeName') : null;

  const clearUrlParams = useCallback(() => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('lat');
    newUrl.searchParams.delete('lng');
    newUrl.searchParams.delete('address');
    newUrl.searchParams.delete('placeName');
    router.replace(newUrl.pathname, { scroll: false });
  }, [router]);

  return {
    selectedLat,
    selectedLng,
    selectedAddress,
    selectedPlaceName,
    hasProcessedUrlParams,
    setHasProcessedUrlParams,
    clearUrlParams,
  };
};
