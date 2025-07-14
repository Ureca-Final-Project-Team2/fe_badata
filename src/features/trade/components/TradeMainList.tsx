import { useEffect, useState } from 'react';
import { ArrowDownUp, ListFilter } from 'lucide-react';
import { Product } from '@ui/Product/Product';
import { SectionDivider } from '@ui/SectionDivider';
import { Drawer, DrawerButton, FilterDrawerButton } from '@ui/Drawer';

const mockListItems = [
  {
    id: 1,
    image: '/assets/sample.png',
    brand: '배스킨라빈스',
    name: '싱글 레귤러',
    price: 2050,
    likeCount: 2,
    createdAt: '2025-07-10T13:00:00Z',
  },
  {
    id: 2,
    image: '/assets/sample.png',
    brand: '스타벅스',
    name: '텀블러 쿠폰',
    price: 2050,
    likeCount: 5,
    createdAt: '2025-07-09T15:00:00Z',
  },
  {
    id: 3,
    image: '/assets/sample.png',
    brand: '배스킨라빈스',
    name: '파인트',
    price: 2050,
    likeCount: 1,
    createdAt: '2025-07-08T10:00:00Z',
  },
  {
    id: 4,
    image: '/assets/sample.png',
    brand: '던킨',
    name: '카푸치노 츄이스티',
    price: 2050,
    likeCount: 8,
    createdAt: '2025-07-07T11:00:00Z',
  },
];

interface TradeMainListProps {
  isSortDrawerOpen: boolean;
  setIsSortDrawerOpen: (value: boolean) => void;
}

type SortOption = 'latest' | 'popular';

export function TradeMainList({ isSortDrawerOpen, setIsSortDrawerOpen }: TradeMainListProps) {
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [sortedList, setSortedList] = useState(mockListItems);

  useEffect(() => {
    const sorted = [...mockListItems].sort((a, b) => {
      if (sortOption === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.likeCount - a.likeCount;
      }
    });
    setSortedList(sorted);
  }, [sortOption]);

  return (
    <section className="bg-white px-4 py-4">
      <SectionDivider thickness="thick" size="full" />
      <div className="flex flex-row justify-between py-2">
        <button
          onClick={() => setIsSortDrawerOpen(true)}
          className="flex flex-row gap-1 items-center font-semibold"
        >
          <ArrowDownUp size={16} />
          {sortOption === 'latest' ? '최신순' : '인기순'}
        </button>

        <div className="flex flex-row gap-1 items-center font-semibold">
          조건
          <ListFilter size={14} />
        </div>
      </div>
      <div className="flex flex-col gap-4 h-full">
        {sortedList.map((item) => (
          <Product
            key={item.id}
            brand={item.brand}
            name={item.name}
            price={item.price}
            imageSrc={item.image}
            likeCount={item.likeCount}
          />
        ))}
      </div>

      <Drawer isOpen={isSortDrawerOpen} onClose={() => setIsSortDrawerOpen(false)} variant="filter">
        <FilterDrawerButton
          selected={sortOption === 'latest'}
          onClick={() => {
            setSortOption('latest');
            setIsSortDrawerOpen(false);
          }}
        >
          최신순
        </FilterDrawerButton>
        <FilterDrawerButton
          selected={sortOption === 'popular'}
          onClick={() => {
            setSortOption('popular');
            setIsSortDrawerOpen(false);
          }}
        >
          인기순
        </FilterDrawerButton>
        <DrawerButton variant="close" onClick={() => setIsSortDrawerOpen(false)} theme="light">
          닫기
        </DrawerButton>
      </Drawer>
    </section>
  );
}
