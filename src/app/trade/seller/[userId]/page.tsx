import { notFound } from 'next/navigation';

import SellerPage from '@/features/trade/seller/page/SellerPage';

interface SellerPageProps {
  params: Promise<{
    userId: string;
  }>;
  searchParams: Promise<{
    name?: string;
    avatar?: string;
  }>;
}

export default async function Page({ params, searchParams }: SellerPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const userId = parseInt(resolvedParams.userId, 10);
  if (isNaN(userId)) {
    notFound();
  }

  return (
    <SellerPage
      userId={userId}
      sellerName={resolvedSearchParams.name ? decodeURIComponent(resolvedSearchParams.name) : ''}
      sellerAvatar={
        resolvedSearchParams.avatar ? decodeURIComponent(resolvedSearchParams.avatar) : ''
      }
    />
  );
}
