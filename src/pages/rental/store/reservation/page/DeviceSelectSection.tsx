import React, { useEffect, useRef } from 'react';

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
  onCountChange: (deviceId: number, count: number) => void;
}

const DeviceSelectSection: React.FC<DeviceSelectSectionProps> = ({
  devices,
  selectedDevices,
  onCountChange,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = React.useState(false);

  // document 이벤트 등록/해제
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX.current;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      setDragging(false);
    };
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  return (
    <>
      <div className="font-body-semibold flex items-center gap-2 mt-6">
        <CircleCheck size={28} className="text-[var(--main-5)]" />
        기기를 선택해 주세요
      </div>
      <div
        ref={scrollRef}
        className="flex flex-row gap-6 overflow-x-auto pb-2 pl-1"
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
      >
        {devices.map((device) => (
          <ReservationDeviceCard
            key={device.id}
            device={device}
            count={selectedDevices[device.id] ?? 0}
            onCountChange={(newCount: number) => onCountChange(device.id, newCount)}
            selected={!!selectedDevices[device.id]}
            max={device.remainCount}
          />
        ))}
      </div>
    </>
  );
};

export default DeviceSelectSection;
