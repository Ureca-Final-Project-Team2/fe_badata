import SellerPage from '@/features/trade/seller/page/SellerPage';

interface SellerPageProps {
  params: {
    userId: string;
  };
  searchParams: {
    name?: string;
    avatar?: string;
  };
}

export default function Page({ params, searchParams }: SellerPageProps) {
  return (
    <SellerPage
      userId={parseInt(params.userId, 10)}
      sellerName={searchParams.name || ''}
      sellerAvatar={searchParams.avatar || ''}
    />
  );
}
