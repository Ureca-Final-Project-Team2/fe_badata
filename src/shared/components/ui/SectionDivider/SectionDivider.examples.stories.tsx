import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SectionDivider } from './SectionDivider';

const meta: Meta<typeof SectionDivider> = {
  title: 'Examples/SectionDividerPage',
  component: SectionDivider,
};

export default meta;
type Story = StoryObj<typeof SectionDivider>;

export const UsageExample: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">첫 번째 섹션</h2>
        <p className="text-gray-600">여기는 첫 번째 섹션의 내용입니다.</p>
      </div>

      <SectionDivider size="full" color="default" />

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">두 번째 섹션</h2>
        <p className="text-gray-600">여기는 두 번째 섹션의 내용입니다.</p>
      </div>

      <SectionDivider size="full" color="default">
        중요한 구분
      </SectionDivider>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">세 번째 섹션</h2>
        <p className="text-gray-600">파란색 구분선과 텍스트로 나뉘어졌습니다.</p>
      </div>

      <SectionDivider size="full" color="default" thickness="thick" />

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">마지막 섹션</h2>
        <p className="text-gray-600">두꺼운 메인 색상 구분선으로 강조되었습니다.</p>
      </div>
    </div>
  ),
};

export const PageLayoutExample: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold text-center">페이지 제목</h1>
      </div>

      <SectionDivider size="full" color="default" thickness="medium" />

      <div className="p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">콘텐츠 1</h3>
            <p className="text-sm text-gray-600">첫 번째 콘텐츠 영역입니다.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">콘텐츠 2</h3>
            <p className="text-sm text-gray-600">두 번째 콘텐츠 영역입니다.</p>
          </div>
        </div>
      </div>

      <SectionDivider size="full" color="default">
        특별 섹션
      </SectionDivider>

      <div className="p-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">특별한 콘텐츠</h2>
          <p className="text-gray-600">포인트 색상으로 구분된 특별한 섹션입니다.</p>
        </div>
      </div>

      <SectionDivider size="full" color="default" />

      <div className="bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">푸터 영역</div>
      </div>
    </div>
  ),
};
