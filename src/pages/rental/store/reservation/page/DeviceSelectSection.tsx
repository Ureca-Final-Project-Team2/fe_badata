import React from 'react';

import { CircleCheck } from 'lucide-react';

import ReservationDeviceCard from '@/pages/rental/map/ui/ReservationDeviceCard';

interface Device {
  id: number;
  name: string;
  price: string;
  image?: string;
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
}) => (
  <>
    <div className="font-body-semibold text-lg flex items-center gap-2 mt-6">
      <CircleCheck size={28} className="text-[var(--main-5)]" />
      기기를 선택해 주세요
    </div>
    <div className="flex flex-row gap-6 overflow-x-auto pb-2 pl-1">
      {devices.map((device) => (
        <ReservationDeviceCard
          key={device.id}
          name={device.name}
          price={device.price}
          image={device.image}
          selected={selectedDeviceId === device.id}
          onClick={() => onSelect(device.id)}
        />
      ))}
    </div>
  </>
);

export default DeviceSelectSection;
