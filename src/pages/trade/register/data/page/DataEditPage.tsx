'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { TradeDataEditForm } from '@/pages/trade/register/data/ui/DataEditForm';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

interface DataEditPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default function DataEditPage({ params }: DataEditPageProps) {
  const router = useRouter();
  const [postId, setPostId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;

        const parsedPostId = parseInt(resolvedParams.postId, 10);

        if (isNaN(parsedPostId)) {
          router.push('/trade');
          return;
        }

        setPostId(parsedPostId);
      } catch {
        router.push('/trade');
      } finally {
        setIsLoading(false);
      }
    };

    resolveParams();
  }, [params, router]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (postId === null) {
    return null;
  }

  return (
    <BaseLayout
      header={<PageHeader title="게시물 수정" onBack={() => router.back()} />}
      showBottomNav={false}
    >
      <TradeDataEditForm postId={postId} />
    </BaseLayout>
  );
}
