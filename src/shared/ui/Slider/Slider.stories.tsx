import { useState } from 'react';

import { Slider } from './Slider';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    min: 0,
    max: 50000,
    step: 1000,
    defaultValue: 25500,
    label: '가격',
    showTooltip: true,
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {},
};

export const WithoutTooltip: Story = {
  args: {
    showTooltip: false,
  },
};

export const ZeroValue: Story = {
  args: {
    defaultValue: 0,
  },
};

export const MaxValue: Story = {
  args: {
    defaultValue: 50000,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    showTooltip: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [priceValue, setPriceValue] = useState(25500);

    const formatPrice = (price: number) => {
      if (price === 0) return '0원';
      return `${price.toLocaleString()}원`;
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-gray-900 font-semibold text-lg mb-2">가격 선택기</h3>
          <p className="text-gray-600 text-sm">
            슬라이더를 움직여서 원하는 가격을 선택하세요 (380×8px)
          </p>
        </div>

        <Slider
          value={priceValue}
          onValueChange={setPriceValue}
          label="가격"
          showTooltip
          step={250}
        />

        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h4 className="text-gray-900 font-medium mb-2">선택된 가격</h4>
          <p className="text-2xl font-bold text-[var(--main-5)]">{formatPrice(priceValue)}</p>
          <p className="text-sm text-gray-500 mt-2">
            전체 범위의 {Math.round((priceValue / 50000) * 100)}%
          </p>
        </div>
      </div>
    );
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <h3 className="text-gray-900 font-semibold mb-4">🛍️ 쇼핑몰 가격 필터</h3>
        <Slider defaultValue={30000} label="최대 가격" showTooltip />
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <h3 className="text-gray-900 font-semibold mb-4">💰 예산 설정</h3>
        <Slider defaultValue={20000} label="예산 한도" showTooltip />
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-lg">
        <h3 className="text-gray-900 font-semibold mb-4">🎯 목표 가격</h3>
        <Slider defaultValue={15000} label="희망 가격" showTooltip />
      </div>
    </div>
  ),
};
