import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Slider } from '@/shared/components/ui/Slider/Slider';

const meta: Meta<typeof Slider> = {
  title: 'EXAMPLE/Slider',
  component: Slider,
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    size: 'default',
    min: 0,
    max: 50000,
    step: 1000,
    defaultValue: 20000,
    label: '가격',
    showTooltip: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 30,
    label: '비활성화된 슬라이더',
  },
};

export const CustomRange: Story = {
  args: {
    min: 20,
    max: 80,
    defaultValue: 50,
    label: '커스텀 범위 (20-80)',
    showValue: true,
  },
};

// 모든 크기 비교
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-gray-900 font-semibold mb-4">Small (140×50)</h3>
        <Slider size="sm" defaultValue={30} label="Small Slider" showValue />
      </div>

      <div>
        <h3 className="text-gray-900 font-semibold mb-4">Default (176×66)</h3>
        <Slider size="default" defaultValue={50} label="Default Slider" showValue />
      </div>

      <div>
        <h3 className="text-gray-900 font-semibold mb-4">Large (220×80)</h3>
        <Slider size="lg" defaultValue={70} label="Large Slider" showValue />
      </div>
    </div>
  ),
};

// 다양한 가격대 예시
export const DifferentPrices: Story = {
  render: () => (
    <div className="space-y-6">
      <Slider min={0} max={50000} step={1000} defaultValue={0} label="0원" showValue />
      <Slider min={0} max={50000} step={1000} defaultValue={10000} label="1만원대" showValue />
      <Slider min={0} max={50000} step={1000} defaultValue={20000} label="2만원대" showValue />
      <Slider min={0} max={50000} step={1000} defaultValue={35000} label="3.5만원" showValue />
      <Slider min={0} max={50000} step={1000} defaultValue={50000} label="5만원대" showValue />
    </div>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-gray-900 font-semibold mb-4">음량 조절</h3>
        <Slider defaultValue={65} label="Volume" showValue min={0} max={100} />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-gray-900 font-semibold mb-4">밝기 조절</h3>
        <Slider defaultValue={80} label="Brightness" showValue min={0} max={100} />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-gray-900 font-semibold mb-4">가격 필터</h3>
        <Slider defaultValue={20000} label="최대 가격" showValue min={0} max={50000} step={1000} />
      </div>
    </div>
  ),
};

// 인터랙티브 예시
export const InteractiveExample: Story = {
  render: () => {
    const [priceValue, setPriceValue] = React.useState(20000);
    const [value2, setValue2] = React.useState(30000);
    const [value3, setValue3] = React.useState(15000);

    const formatPrice = (price: number) => {
      if (price === 0) return '0원';
      if (price < 10000) return `${Math.floor(price / 1000)}천원`;
      return `${Math.floor(price / 10000)}만${price % 10000 !== 0 ? Math.floor((price % 10000) / 1000) + '천' : ''}원`;
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-gray-900 font-semibold text-lg">가격대 슬라이더</h3>
          <p className="text-gray-600 text-sm">가격 범위를 선택해보세요! (0원 ~ 5만원)</p>
        </div>

        <Slider
          value={priceValue}
          onValueChange={setPriceValue}
          label={`현재 가격: ${formatPrice(priceValue)}`}
          min={0}
          max={50000}
          step={1000}
        />

        <Slider
          value={value2}
          onValueChange={setValue2}
          label={`최대 예산: ${formatPrice(value2)}`}
          min={0}
          max={50000}
          step={1000}
          size="lg"
        />

        <Slider
          value={value3}
          onValueChange={setValue3}
          label={`최소 가격: ${formatPrice(value3)}`}
          min={0}
          max={50000}
          step={1000}
          size="sm"
        />

        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h4 className="text-gray-900 font-medium mb-2">선택된 가격대:</h4>
          <p className="text-gray-600 text-sm">
            현재: {formatPrice(priceValue)} | 최대: {formatPrice(value2)} | 최소:{' '}
            {formatPrice(value3)}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            가격 범위: {formatPrice(value3)} ~ {formatPrice(value2)}
          </p>
        </div>
      </div>
    );
  },
};
