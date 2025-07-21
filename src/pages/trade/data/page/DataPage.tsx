import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';
import { useTradeSortState } from '@/widgets/trade/trade-sort-filter/model/useTradeSortState';

import { DataList } from '../ui/DataList';

export default function DataPage() {
  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } =
    useTradeSortState();

  return (
    <>
      <BaseLayout
        header={<Header />}
        showBottomNav={!isSortDrawerOpen}
        fab={<TradeFloatingButton />}
      >
        <TradeFlatTab />
        <TradeSearchInput />
        <DataList sortOption={sortOption} onSortClick={openDrawer} />
      </BaseLayout>
      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
    </>
  );
}
