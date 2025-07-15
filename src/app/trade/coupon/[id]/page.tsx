import { getTradePostDetail } from '@features/trade/api/trade';
import { TradeDetailPage } from '@features/trade/pages/TradeDetailPage';

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
      postType="GIFTICON"
      sellerName={sellerName}
    />
  );
}
