import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { FlatTab } from './FlatTab';

const meta: Meta<typeof FlatTab> = {
  title: 'Components/FlatTab',
  component: FlatTab,
};

export default meta;

type Story = StoryObj<typeof FlatTab>;

export const OnlyTabs: Story = {
  args: {
    items: [
      { id: 'tab1', label: '전체' },
      { id: 'tab2', label: '데이터' },
      { id: 'tab3', label: '쿠폰' },
    ],
    onValueChange: (value) => console.log(`Tab changed to: ${value}`),
  },
};

export const ManyTabs: Story = {
  args: {
    items: [
      { id: 'tab1', label: '전체', content: <div>전체 내용</div> },
      { id: 'tab2', label: '데이터', content: <div>데이터 내용</div> },
      { id: 'tab3', label: '쿠폰', content: <div>쿠폰 내용</div> },
      { id: 'tab4', label: '이벤트', content: <div>이벤트 내용</div> },
      { id: 'tab5', label: '공지사항', content: <div>공지사항 내용</div> },
      { id: 'tab6', label: '설정', content: <div>설정 내용</div> },
    ],
  },
};

export const AllVariants: Story = {
  render: () => {
    const sampleItems = [
      { id: 'all', label: '전체' },
      { id: 'data', label: '데이터' },
      { id: 'gifticon', label: '기프티콘' },
    ];

    const salesItems = [
      { id: 'selling', label: '판매 중' },
      { id: 'soldout', label: '판매 완료' },
    ];

    const sampleContents: Record<string, string> = {
      all: '전체 내용입니다.',
      data: '데이터 내용입니다.',
      gifticon: '쿠폰 내용입니다.',
    };

    const salesContents: Record<string, string> = {
      selling: '판매 중인 상품입니다.',
      soldout: '판매 완료된 상품입니다.',
    };

    const [selectedTab1, setSelectedTab1] = React.useState('all');
    const [selectedTab2, setSelectedTab2] = React.useState('selling');

    return (
      <div className="space-y-8 bg-gray-50 p-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">기본 탭 (전체/데이터/쿠폰)</h3>
          <FlatTab items={sampleItems} defaultValue="all" onValueChange={setSelectedTab1} />
          <div className="mt-4 p-4 bg-gray-50 rounded text-center">
            <p>{sampleContents[selectedTab1]}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">판매 탭 (판매 중/판매 완료)</h3>
          <FlatTab items={salesItems} defaultValue="selling" onValueChange={setSelectedTab2} />
          <div className="mt-4 p-4 bg-gray-50 rounded text-center">
            <p>{salesContents[selectedTab2]}</p>
          </div>
        </div>
      </div>
    );
  },
};
