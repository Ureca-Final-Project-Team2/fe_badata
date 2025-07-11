import { TradeDetailPage } from '@features/trade/pages/TradeDetailPage';

interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  return <TradeDetailPage tradeId={params.id} />;
}
