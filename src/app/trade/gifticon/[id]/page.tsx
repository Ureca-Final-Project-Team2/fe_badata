import { getTradePostDetail } from '@/pages/trade/data/detail/api/apis';
import TradeDetailPage from '@/pages/trade/gifticon/detail/page/GifticonDetailPage';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GifticonDetailPage(props: Props) {
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
