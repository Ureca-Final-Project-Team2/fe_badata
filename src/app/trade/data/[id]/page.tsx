import { getTradePostDetail } from '@/features/trade/data/detail/api/apis';
import TradeDetailPage from '@/features/trade/data/detail/page/DataDetailPage';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DataDetailPage(props: Props) {
  const { params } = await props;
  const { id } = await params;

  const { postUserId, post, sellerName } = await getTradePostDetail(id);

  return (
    <TradeDetailPage
      tradeId={id}
      post={post}
      postUserId={postUserId}
      postType="DATA"
      sellerName={sellerName}
    />
  );
}
