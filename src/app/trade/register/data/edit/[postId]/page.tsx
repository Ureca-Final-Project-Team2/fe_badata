import DataEditPage from '@/pages/trade/register/data/page/DataEditPage';

interface DataEditPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default function Page({ params }: DataEditPageProps) {
  return <DataEditPage params={params} />;
}
