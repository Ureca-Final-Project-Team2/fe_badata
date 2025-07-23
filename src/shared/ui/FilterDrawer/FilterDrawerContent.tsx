import RentalFilterContent from '@/pages/rental/map/ui/RentalFilterContent';

export function FilterDrawerContent({ type }: { type: 'rental' | 'trade' }) {
  if (type === 'rental') return <RentalFilterContent />;
  if (type === 'trade') return <></>;
  return null;
}
