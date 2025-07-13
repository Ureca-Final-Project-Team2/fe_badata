import { getTradeDetail } from '@features/trade/apis/getTradeDetail';
import { TradeDetailPage } from '@features/trade/pages/TradeDetailPage';

interface Props {
  params: { id: string };
}

export default async function DataDetailPage({ params }: Props) {
  const { id } = params;
  // 데이터 게시물 상세 API 호출
  const { postUserId, post, sellerName } = await getTradeDetail(id);

  // 데이터 게시물 전용 UI만 구현
  return (
    <TradeDetailPage
      tradeId={id}
      post={post}
      postUserId={postUserId}
      postType="data"
      sellerName={sellerName}
    />
  );
}
