import { ReportPage } from '@/pages/trade/report/page/ReportPage';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportPostPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id);

  return <ReportPage postId={postId} />;
}
