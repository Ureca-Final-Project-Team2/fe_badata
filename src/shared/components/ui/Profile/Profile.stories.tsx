import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from '@ui/Profile/Profile';

const AVATAR_URL = 'https://i.pinimg.com/originals/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg';

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
    avatar: AVATAR_URL,
  },
};

export const DefaultWithClose: Story = {
  args: {
    size: 'md',
    name: '사용자1',
    avatar: AVATAR_URL,
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
    avatar: AVATAR_URL,
  },
};

export const CompactWithFollow: Story = {
  args: {
    size: 'sm',
    name: '사용자2',
    subtitle: '거래내역 10',
    avatar: AVATAR_URL,
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
    avatar: AVATAR_URL,
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
        avatar={AVATAR_URL}
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
    avatar: AVATAR_URL,
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
          <Profile size="md" name="사용자1" avatar={AVATAR_URL} />
          <Profile size="md" name="사용자1" avatar={AVATAR_URL} showCloseButton />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Small Size (기존 compact, 320*56)</h3>
        <div className="space-y-2">
          <Profile size="sm" name="사용자2" subtitle="거래내역 10" avatar={AVATAR_URL} />
          <Profile
            size="sm"
            name="사용자2"
            subtitle="거래내역 10"
            avatar={AVATAR_URL}
            isFollowing={false}
          />
          <Profile
            size="sm"
            name="사용자2"
            subtitle="거래내역 10"
            avatar={AVATAR_URL}
            showFollowButton
            isFollowing={true}
          />
        </div>
      </div>
    </div>
  ),
};
