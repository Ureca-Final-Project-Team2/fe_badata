import GifticonEditPage from '@/pages/trade/register/gifticon/page/GifticonEditPage';

interface GifticonEditPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default function Page({ params }: GifticonEditPageProps) {
  return <GifticonEditPage params={params} />;
}
