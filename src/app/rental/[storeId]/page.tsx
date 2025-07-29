import StoreDetailPage from '@/pages/rental/store/store-detail/page/StoreDetailPage';

interface PageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { storeId } = await params;

  const numericStoreId = Number(storeId);
  if (isNaN(numericStoreId) || numericStoreId <= 0) {
    throw new Error('Invalid store ID');
  }
  return <StoreDetailPage storeId={numericStoreId} />;
}
