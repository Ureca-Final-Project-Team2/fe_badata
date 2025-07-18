import { useState } from 'react';

import { Flag, Pencil, Trash2 } from 'lucide-react';

import { DataUsageCard } from '../DataUsageCard';

import { Drawer } from './Drawer';
import { DrawerButton } from './DrawerButton';
import { FilterDrawerButton } from './FilterDrawerButton';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// 신고하기, 게시물 삭제하기 등 다크 drawer
export const DefaultDark: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-800 text-white rounded">
          다크 Drawer 열기
        </button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} variant="default">
          <div className="flex flex-col">
            <DrawerButton icon={<Flag />} variant="point" onClick={() => alert('신고')}>
              신고하기
            </DrawerButton>
            <DrawerButton icon={<Pencil />} onClick={() => alert('수정')}>
              게시글 수정
            </DrawerButton>
            <DrawerButton icon={<Trash2 />} variant="point" onClick={() => alert('삭제')}>
              삭제
            </DrawerButton>
          </div>
          <DrawerButton variant="close" onClick={() => setOpen(false)}>
            닫기
          </DrawerButton>
        </Drawer>
      </>
    );
  },
};

// 필터링 등 라이트 drawer
export const FilterDrawerStory: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<'recent' | 'high' | 'low'>('recent');

    return (
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
          필터 Drawer 열기
        </button>

        {open && (
          <Drawer isOpen={open} onClose={() => setOpen(false)} variant="filter">
            <div className="flex flex-col divide-y divide-[var(--gray-light)]">
              <FilterDrawerButton
                selected={selected === 'recent'}
                onClick={() => setSelected('recent')}
              >
                최신순
              </FilterDrawerButton>
              <FilterDrawerButton
                selected={selected === 'high'}
                onClick={() => setSelected('high')}
              >
                평점 높은순
              </FilterDrawerButton>
              <FilterDrawerButton selected={selected === 'low'} onClick={() => setSelected('low')}>
                평점 낮은순
              </FilterDrawerButton>
            </div>

            <div className="pt-4">
              <DrawerButton variant="close" onClick={() => setOpen(false)} theme="light">
                닫기
              </DrawerButton>
            </div>
          </Drawer>
        )}
      </>
    );
  },
};

// SOS Drawer
export const SosDrawerStory: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-pink-500 text-white rounded">
          SOS Drawer 열기
        </button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} variant="sos">
          <div className="w-full flex flex-col items-center px-4 pt-6 pb-28">
            <button className="w-full max-w-md rounded-xl bg-pink-100 text-pink-500 text-lg py-3 flex items-center justify-center gap-2 cursor-pointer">
              <span className="text-xl">🚨</span>
              SOS 요청하기
            </button>

            <div className="w-full max-w-md mt-6">
              <h2 className="text-base font-semibold text-black mb-2">나의 데이터 서랍</h2>

              <DataUsageCard
                phoneMasked="010-1**4-5**8"
                planName="5G 청춘 요금제"
                billMonth="5월 청구요금"
                billStatus="납부 완료"
                billAmount="150,340원"
                remainingLabel="남은 데이터"
                totalAmount="5GB"
                totalValue={5}
                remainingValue={2.5}
              />
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};
