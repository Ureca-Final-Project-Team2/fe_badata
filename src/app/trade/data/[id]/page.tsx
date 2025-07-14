import { getTradePostDetail } from '@features/trade/apis/trade';
import { TradeDetailPage } from '@features/trade/pages/TradeDetailPage';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DataDetailPage(props: Props) {
  const { params } = await props;
  const { id } = await params;
  // 데이터 게시물 상세 API 호출
  const { postUserId, post, sellerName } = await getTradePostDetail(id);

  // 데이터 게시물 전용 UI만 구현
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
