import CoinHistoryPage from '@/features/mypage/coin-history/page/CoinHistoryPage';
import { AuthGuard } from '@/shared/ui/AuthGuard';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <AuthGuard>
      <CoinHistoryPage />
    </AuthGuard>
  );
}
