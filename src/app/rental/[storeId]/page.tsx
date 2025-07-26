import StoreDetailPage from '@/pages/rental/store/store-detail/page/StoreDetailPage';

interface PageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { storeId } = await params;
  return <StoreDetailPage storeId={Number(storeId)} />;
}
