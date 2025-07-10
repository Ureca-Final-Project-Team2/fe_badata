import { BaseLayout } from '@/shared/components/layout/BaseLayout';
import { Header } from '@/shared/components/ui/Header';
import { SosPage } from '@/features/sos/components/SosPage';

export default function SosPageRoute() {
  return (
    <BaseLayout header={<Header />}>
      <SosPage />
    </BaseLayout>
  );
}
