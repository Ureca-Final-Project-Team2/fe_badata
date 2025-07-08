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

export const Default: Story = {
  args: {
    size: 'md',
    name: '사용자1',
  },
};

export const DefaultWithAvatar: Story = {
  args: {
    size: 'md',
    name: '사용자1',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
  },
};

export const DefaultWithClose: Story = {
  args: {
    size: 'md',
    name: '사용자1',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    showCloseButton: true,
    onClose: () => console.log('Close clicked'),
  },
};

export const Compact: Story = {
  args: {
    size: 'sm',
    name: '사용자2',
    subtitle: '거래내역 10',
  },
};

export const CompactWithAvatar: Story = {
  args: {
    size: 'sm',
    name: '사용자2',
    subtitle: '거래내역 10',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
  },
};

export const CompactWithFollow: Story = {
  args: {
    size: 'sm',
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
    size: 'sm',
    name: '사용자2',
    subtitle: '거래내역 10',
    avatar: 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg',
    showFollowButton: true,
    isFollowing: true,
    onFollowClick: () => console.log('Unfollow clicked'),
  },
};

export const InteractiveFollow: Story = {
  render: () => {
    const [isFollowing, setIsFollowing] = React.useState(false);

    return (
      <Profile
        size="sm"
        name="사용자2"
        subtitle="거래내역 10"
        avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
        showFollowButton
        isFollowing={isFollowing}
        onFollowClick={() => setIsFollowing((prev) => !prev)}
      />
    );
  },
};

export const CompactAllFeatures: Story = {
  args: {
    size: 'sm',
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

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 bg-gray-50 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium Size (기존 default, 380*70)</h3>
        <div className="space-y-2">
          <Profile
            size="md"
            name="사용자1"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
          />
          <Profile
            size="md"
            name="사용자1"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
            showCloseButton={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Small Size (기존 compact, 320*56)</h3>
        <div className="space-y-2">
          <Profile
            size="sm"
            name="사용자2"
            subtitle="거래내역 10"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
          />
          <Profile
            size="sm"
            name="사용자2"
            subtitle="거래내역 10"
            avatar="https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
            isFollowing={false}
          />
          <Profile
            size="sm"
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
