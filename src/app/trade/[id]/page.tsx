import { TradeDetailPage } from '@features/trade/pages/TradeDetailPage';
import { getTradeDetail } from '@features/trade/apis/getTradeDetail';

interface Props {
  params: { id: string };
  searchParams: { type: 'data' | 'gifticon' };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { type } = await searchParams;
  const { postUserEmail, post, sellerName } = await getTradeDetail(id);

  return (
    <TradeDetailPage
      tradeId={id}
      post={post}
      postUserEmail={postUserEmail}
      postType={type} // 홈 조회에서 전달한 타입
      sellerName={sellerName}
    />
  );
}
