const DeviceReceiptItem = ({
  name,
  price,
  count,
}: {
  name: string;
  price: string;
  count: number;
}) => (
  <div className="flex justify-between text-[var(--gray-dark)] text-sm">
    <span>{name}</span>
    <span className="text-black">
      {price} x {count}
    </span>
  </div>
);
export default DeviceReceiptItem;
