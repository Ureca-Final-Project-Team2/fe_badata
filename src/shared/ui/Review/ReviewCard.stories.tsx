// import { ReviewCard } from './ReviewCard';

// import type { ReviewCardProps } from '@/shared/ui/ReviewCard';
// import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// const meta: Meta<typeof ReviewCard> = {
//   title: 'Components/ReviewCard',
//   component: ReviewCard,
//   args: {
//     title: '공유기 대리점',
//     rating: '3.12 토',
//     price: '30,000원',
//   },
// };

// export default meta;

// type Story = StoryObj<typeof ReviewCard>;

// export const Default: Story = {
//   args: {
//     size: 'default',
//   },
// };

// export const WithReviewButton: Story = {
//   args: {
//     size: 'default',
//     showReviewButton: true,
//     onReviewClick: () => console.log('리뷰쓰기 클릭'),
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'sm',
//     title: '저렴한 공유기 대리점',
//     rating: '4.5 토',
//     price: '25,000원',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'lg',
//     title: '비싼 공유기 대리점',
//     rating: '2.8 토',
//     price: '45,000원',
//     showReviewButton: true,
//   },
// };

// export const LongTitle: Story = {
//   args: {
//     title: '아주 긴 대리점 이름이 들어간 경우 어떻게 표시되는지 확인해보는 테스트',
//     rating: '3.95 토',
//     price: '50,000원',
//     showReviewButton: true,
//   },
// };

// export const HighRating: Story = {
//   args: {
//     title: '최고 평점 대리점',
//     rating: '4.98 토',
//     price: '80,000원',
//     showReviewButton: true,
//   },
// };

// export const LowRating: Story = {
//   args: {
//     title: '낮은 평점 대리점',
//     rating: '1.2 토',
//     price: '15,000원',
//   },
// };

// export const ExpensiveItem: Story = {
//   args: {
//     title: '프리미엄 대리점',
//     rating: '4.7 토',
//     price: '150,000원',
//     showReviewButton: true,
//   },
// };

// export const AllSizes: Story = {
//   render: () => (
//     <div className="space-y-4 bg-gray-50 p-6">
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Small</h3>
//         <ReviewCard {...(Small.args as ReviewCardProps)} />
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Default</h3>
//         <ReviewCard {...(Default.args as ReviewCardProps)} />
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Large</h3>
//         <ReviewCard {...(Large.args as ReviewCardProps)} />
//       </div>
//     </div>
//   ),
// };

// export const GridLayout: Story = {
//   render: () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//       <ReviewCard {...(HighRating.args as ReviewCardProps)} />
//       <ReviewCard {...(LowRating.args as ReviewCardProps)} />
//       <ReviewCard {...(ExpensiveItem.args as ReviewCardProps)} />
//       <ReviewCard {...(LongTitle.args as ReviewCardProps)} />
//     </div>
//   ),
// };
// export default {};
