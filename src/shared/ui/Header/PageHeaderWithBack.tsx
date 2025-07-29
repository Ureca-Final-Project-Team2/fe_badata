'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from './PageHeader';

interface PageHeaderWithBackProps {
  title: string;
}

export function PageHeaderWithBack({ title }: PageHeaderWithBackProps) {
  const router = useRouter();
  return <PageHeader title={title} onBack={() => router.back()} />;
}
