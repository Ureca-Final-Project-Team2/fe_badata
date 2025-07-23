import React, { useEffect } from 'react';

import { CircleCheck } from 'lucide-react';

import ReservationDeviceCard from '@/pages/rental/map/ui/ReservationDeviceCard';

interface Device {
  id: number;
  deviceName: string;
  imageUrl: string;
  dataCapacity: number | string;
  price: number;
  remainCount: number;
}

interface DeviceSelectSectionProps {
  devices: Device[];
  selectedDeviceId: number | null;
  onSelect: (id: number) => void;
}

const DeviceSelectSection: React.FC<DeviceSelectSectionProps> = ({
  devices,
  selectedDeviceId,
  onSelect,
}) => {
  const [counts, setCounts] = React.useState<Record<number, number>>(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: 0 }), {} as Record<number, number>),
  );

  useEffect(() => {
    setCounts(devices.reduce((acc, d) => ({ ...acc, [d.id]: 0 }), {} as Record<number, number>));
  }, [devices]);

  const handleCountChange = (id: number, newCount: number, remainCount: number) => {
    const safeCount = Math.max(0, Math.min(newCount, remainCount));
    setCounts((prev) => ({ ...prev, [id]: safeCount }));
    if (safeCount > 0) {
      onSelect(id);
    } else if (selectedDeviceId === id) {
      onSelect(-1);
    }
  };

  return (
    <>
      <div className="font-body-semibold text-lg flex items-center gap-2 mt-6">
        <CircleCheck size={28} className="text-[var(--main-5)]" />
        기기를 선택해 주세요
      </div>
      <div className="flex flex-row gap-6 overflow-x-auto pb-2 pl-1">
        {devices.map((device) => (
          <ReservationDeviceCard
            key={device.id}
            device={device}
            count={counts[device.id] ?? 0}
            onCountChange={(newCount) => handleCountChange(device.id, newCount, device.remainCount)}
            selected={selectedDeviceId === device.id}
            max={device.remainCount}
          />
        ))}
      </div>
    </>
  );
};

export default DeviceSelectSection;
