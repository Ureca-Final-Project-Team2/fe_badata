import { ReportPage } from '@/pages/trade/report/pages/ReportPage';

interface Props {
  params: {
    id: string;
  };
}
export default function ReportPostPage({ params }: Props) {
  const id = parseInt(params.id);

  return <ReportPage postId={id} />;
}
