import { FlatTab } from './FlatTab';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const sampleItems = [
  {
    id: 'all',
    label: '전체',
    content: (
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold mb-2">전체 내용</h3>
        <p>모든 항목을 표시합니다.</p>
      </div>
    ),
  },
  {
    id: 'data',
    label: '데이터',
    content: (
      <div className="p-4 bg-blue-50 rounded">
        <h3 className="text-lg font-semibold mb-2">데이터 내용</h3>
        <p>데이터 관련 항목들을 표시합니다.</p>
      </div>
    ),
  },
  {
    id: 'gifticon',
    label: '기프티콘',
    content: (
      <div className="p-4 bg-green-50 rounded">
        <h3 className="text-lg font-semibold mb-2">쿠폰 내용</h3>
        <p>쿠폰 관련 항목들을 표시합니다.</p>
      </div>
    ),
  },
];

const salesItems = [
  {
    id: 'selling',
    label: '판매 중',
    content: (
      <div className="p-4 bg-green-50 rounded">
        <h3 className="text-lg font-semibold mb-2">판매 중인 상품</h3>
        <p>현재 판매 중인 상품들입니다.</p>
      </div>
    ),
  },
  {
    id: 'soldout',
    label: '판매 완료',
    content: (
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold mb-2">판매 완료된 상품</h3>
        <p>판매가 완료된 상품들입니다.</p>
      </div>
    ),
  },
];

const meta: Meta<typeof FlatTab> = {
  title: 'Components/FlatTab',
  component: FlatTab,
  args: {
    items: sampleItems,
  },
};

export default meta;
type Story = StoryObj<typeof FlatTab>;

export const Default: Story = {
  args: {
    size: 'default',
  },
};

export const WithDefaultValue: Story = {
  args: {
    size: 'default',
    defaultValue: 'data',
  },
};

export const SalesTab: Story = {
  args: {
    items: salesItems,
    defaultValue: 'selling',
  },
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      ...sampleItems,
      {
        id: 'disabled',
        label: '비활성화',
        content: <div>이 탭은 비활성화되어 있습니다.</div>,
        disabled: true,
      },
    ],
  },
};

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

export const Small: Story = {
  args: {
    size: 'sm',
    items: sampleItems.slice(0, 2),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    items: [
      ...sampleItems,
      { id: 'extra1', label: '추가1', content: <div>추가 탭 1</div> },
      { id: 'extra2', label: '추가2', content: <div>추가 탭 2</div> },
    ],
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

// 탭 조합
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 bg-gray-50 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">기본 탭 (전체/데이터/쿠폰)</h3>
        <FlatTab items={sampleItems} defaultValue="all" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">판매 탭 (판매 중/판매 완료)</h3>
        <FlatTab items={salesItems} defaultValue="selling" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Small 사이즈</h3>
        <FlatTab size="sm" items={salesItems} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large 사이즈</h3>
        <FlatTab size="lg" items={sampleItems} />
      </div>
    </div>
  ),
};
