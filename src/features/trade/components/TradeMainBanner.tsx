import { ChevronRight } from 'lucide-react';
import { ImageCard } from '@ui/ImageCard';
import { ProductInfo } from '@ui/ProductInfo';

const mockBannerItems = [
  {
    id: 1,
    image: '/assets/sample.png',
    expireDate: '2025-07-15',
    defaultLiked: false,
    brand: '배스킨라빈스',
    name: '싱글 레귤러',
    price: 2050,
  },
  {
    id: 2,
    image: '/assets/sample.png',
    expireDate: '2025-07-20',
    defaultLiked: true,
    brand: '스타벅스',
    name: '텀블러 쿠폰',
    price: 2050,
  },
  {
    id: 3,
    image: '/assets/sample.png',
    expireDate: '2025-07-20',
    defaultLiked: true,
    brand: '배스킨라빈스',
    name: '파인트',
    price: 2050,
  },
  {
    id: 4,
    image: '/assets/sample.png',
    expireDate: '2025-07-29',
    defaultLiked: true,
    brand: '던킨',
    name: '카푸치노 츄이스티',
    price: 2050,
  },
  {
    id: 5,
    image: '/assets/sample.png',
    expireDate: '2025-07-29',
    defaultLiked: true,
    brand: '던킨',
    name: '카푸치노 츄이스티',
    price: 2050,
  },
];

export function TradeMainBanner() {
  return (
    <section className="bg-white px-6">
      <div className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-[20px] font-semibold">마감임박 데려가세요!</h2>
        <ChevronRight />
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {mockBannerItems.map((item) => (
          <div key={item.id} className="w-[98px]">
            <ImageCard
              key={item.id}
              size="sm"
              url={item.image}
              expireDate={item.expireDate}
              defaultLiked={item.defaultLiked}
            />
            <div className="mt-1">
              <ProductInfo brand={item.brand} name={item.name} price={item.price} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
