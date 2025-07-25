import StoreDetailPage from '@/pages/rental/store/store-detail/page/StoreDetailPage';

interface PageProps {
  params: {
    storeId: string;
  };
}

export default function Page({ params }: PageProps) {
  return <StoreDetailPage storeId={Number(params.storeId)} />;
}
