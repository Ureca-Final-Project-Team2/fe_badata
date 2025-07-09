import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '@ui/Input/InputField';
import { SearchIcon, TicketIcon } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const OCR: Story = {
  args: {
    variant: 'ocr',
    icon: <TicketIcon size={20} className="text-main-1" />,
    value: '모바일 금액권 5천원권',
    readOnly: true,
  },
};

export const PriceInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const isInvalid = !!value && isNaN(Number(value));

    return (
      <InputField
        variant="user"
        type="number"
        placeholder="판매가격을 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isRequired={true}
        errorMessage="필수 입력 항목입니다."
      />
    );
  },
};

export const AddressSearch: Story = {
  args: {
    variant: 'address',
    icon: <SearchIcon size={14} className="text-[var(--gray-dark)]" />,
    placeholder: '지번, 도로명, 건물명으로 검색',
  },
};
