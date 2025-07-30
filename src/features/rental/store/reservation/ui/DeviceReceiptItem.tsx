const DeviceReceiptItem = ({
  name,
  price,
  count,
}: {
  name: string;
  price: string;
  count: number;
}) => (
  <div className="flex justify-between text-[var(--gray-dark)]">
    <span>{name}</span>
    <span className="text-[var(--black)]">
      {price} x {count}
    </span>
  </div>
);
export default DeviceReceiptItem;
