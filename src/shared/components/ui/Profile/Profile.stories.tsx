import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  args: {
    name: '사용자1',
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

// 첫 번째 프로필 (380*70)
export const Default: Story = {
  args: {
    variant: 'default',
    name: '사용자1',
  },
};

export const DefaultWithAvatar: Story = {
  args: {
    variant: 'default',
    name: '사용자1',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
  },
};

export const DefaultWithClose: Story = {
  args: {
    variant: 'default',
    name: '사용자1',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    showCloseButton: true,
    onClose: () => console.log('Close clicked'),
  },
};

// 두 번째 프로필 (380*56)
export const Compact: Story = {
  args: {
    variant: 'compact',
    name: '사용자2',
    subtitle: '거래내역 10',
  },
};

export const CompactWithAvatar: Story = {
  args: {
    variant: 'compact',
    name: '사용자2',
    subtitle: '거래내역 10',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
  },
};

export const CompactWithFollow: Story = {
  args: {
    variant: 'compact',
    name: '사용자2',
    subtitle: '거래내역 10',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    showFollowButton: true,
    isFollowing: false,
    onFollowClick: () => console.log('Follow clicked'),
  },
};

export const CompactWithFollowing: Story = {
  args: {
    variant: 'compact',
    name: '사용자2',
    subtitle: '거래내역 10',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    showFollowButton: true,
    isFollowing: true,
    onFollowClick: () => console.log('Unfollow clicked'),
  },
};

export const CompactAllFeatures: Story = {
  args: {
    variant: 'compact',
    name: '사용자2',
    subtitle: '거래내역 10',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    showFollowButton: true,
    showCloseButton: true,
    isFollowing: false,
    onFollowClick: () => console.log('Follow clicked'),
    onClose: () => console.log('Close clicked'),
  },
};

// 비교용 - 모든 variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 bg-gray-50 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Default Variant (380*70)</h3>
        <div className="space-y-2">
          <Profile
            variant="default"
            name="사용자1"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
          />
          <Profile
            variant="default"
            name="사용자1"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
            showCloseButton={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Compact Variant (380*56)</h3>
        <div className="space-y-2">
          <Profile
            variant="compact"
            name="사용자2"
            subtitle="거래내역 10"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
          />
          <Profile
            variant="compact"
            name="사용자2"
            subtitle="거래내역 10"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
            isFollowing={false}
          />
          <Profile
            variant="compact"
            name="사용자2"
            subtitle="거래내역 10"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
            showFollowButton={true}
            isFollowing={true}
          />
        </div>
      </div>
    </div>
  ),
};
