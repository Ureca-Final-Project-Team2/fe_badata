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
  selectedDevices: Record<number, number>;
  onCountChange: (deviceId: number, count: number, remainCount: number) => void;
}

const DeviceSelectSection: React.FC<DeviceSelectSectionProps> = ({
  devices,
  selectedDevices,
  onCountChange,
}) => {
  useEffect(() => {
    // No-op, kept for possible future logic
  }, [devices]);

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
            count={selectedDevices[device.id] ?? 0}
            onCountChange={(newCount: number) =>
              onCountChange(device.id, newCount, device.remainCount)
            }
            selected={!!selectedDevices[device.id]}
            max={device.remainCount}
          />
        ))}
      </div>
    </>
  );
};

export default DeviceSelectSection;
