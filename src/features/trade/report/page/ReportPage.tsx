'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { REPORT_REASONS } from '@/entities/trade-post/lib/types';
import { useReportTradePostMutation } from '@/entities/trade-post/model/mutations';
import { END_POINTS } from '@/shared/api/endpoints';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { RegisterButton } from '@/shared/ui/RegisterButton';
import { TextAreaField } from '@/shared/ui/TextAreaField';

import type { ReportType } from '@/entities/trade-post/lib/types';

interface ReportPageProps {
  postId: number;
}
export default function ReportPage({ postId }: ReportPageProps) {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState<ReportType | null>(null);
  const [comment, setComment] = useState('');

  const reportMutation = useReportTradePostMutation();
  const { executeWithAuth } = useAuthRequiredRequest();

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert('신고 사유를 선택해주세요.');
      return;
    }

    if (selectedReason === 'ETC' && comment.trim() === '') {
      alert('기타 사유를 입력해주세요.');
      return;
    }

    const executeReport = async () => {
      try {
        await reportMutation.mutateAsync({
          postId,
          reportData: {
            reportType: selectedReason,
            comment: comment.trim(),
          },
        });
        router.back();
      } catch (error) {
        console.error('게시물 신고 처리 중 오류 발생:', error);
      }
    };

    executeWithAuth(executeReport, END_POINTS.TRADES.REPORT(postId));
  };

  return (
    <BaseLayout
      paddingX={true}
      header={<PageHeader title="신고하기" onBack={() => router.back()} />}
    >
      <div className="mt-6">
        <h2 className="font-body-semibold text-[var(--black)] mb-4">
          게시물을 신고하는 이유를 선택해주세요.
        </h2>

        <div className="space-y-3 mb-6">
          {Object.entries(REPORT_REASONS).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value={key}
                checked={selectedReason === key}
                onChange={(e) => setSelectedReason(e.target.value as ReportType)}
              />
              <span className="font-label-regular text-[var(--black)]">{value}</span>
            </label>
          ))}
        </div>
      </div>
      {selectedReason === 'ETC' && (
        <div className="mb-6">
          <TextAreaField
            placeholder="상세한 신고 사유를 적어주세요.
        허위신고 작성 시 불이익이 있을 수 있습니다."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      )}
      <RegisterButton
        onClick={handleSubmit}
        isFormValid={
          !!(
            selectedReason &&
            (selectedReason !== 'ETC' || comment.trim() !== '') &&
            !reportMutation.isPending
          )
        }
      >
        {reportMutation.isPending ? '신고 처리 중...' : '제출하기'}
      </RegisterButton>
    </BaseLayout>
  );
}
