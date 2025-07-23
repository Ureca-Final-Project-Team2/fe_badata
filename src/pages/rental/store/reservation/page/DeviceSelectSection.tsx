import React, { useState } from 'react';

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
  const [counts, setCounts] = useState<Record<number, number>>(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: 0 }), {} as Record<number, number>),
  );

  const handleCountChange = (id: number, newCount: number) => {
    setCounts((prev) => ({ ...prev, [id]: Math.max(0, newCount) }));
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
            onCountChange={(newCount) => handleCountChange(device.id, newCount)}
            selected={selectedDeviceId === device.id}
            onClick={() => onSelect(device.id)}
          />
        ))}
      </div>
    </>
  );
};

export default DeviceSelectSection;
