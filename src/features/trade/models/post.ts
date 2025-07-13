export interface Post {
  id: number;
  title: string;
  partner?: string;
  price: number;
  createdAt: string;
  postImage: string;
  postCategory: 'DATA' | 'GIFTICON';
  gifticonCategory?: string | null;
  likesCount: number;
  isLiked: boolean;
}
