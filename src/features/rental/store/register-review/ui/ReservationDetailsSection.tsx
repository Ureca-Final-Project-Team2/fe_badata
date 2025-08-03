
import type { ReservationDetails } from '@/features/rental/store/register-review/lib/types';

interface ReservationDetailsSectionProps {
  reservationDetails: ReservationDetails;
}
export default function ReservationDetailsSection({
  reservationDetails,
}: ReservationDetailsSectionProps) {
  const totalPrice = reservationDetails.showReservedDeviceResponses.reduce(
    (sum, device) => sum + device.price * device.count,
    0,
  );

  return (
    <div className="bg-white rounded-2xl mb-6">
      <div className="flex items-start justify-between mb-4 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[var(--gray)] rounded-lg relative overflow-hidden">
            <img
              src={reservationDetails.storeImageUrl}
              width={48}
              height={48}
              className="object-cover"
              alt="가맹점이미지"
            />
          </div>
          <div>
            <h3 className="font-label-semibold">{reservationDetails.storeName}</h3>
            <p className="font-caption-regular">
              {reservationDetails.countOfVisit}번째 방문이네요!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--main-1)] px-4 py-2 rounded-2xl">
        {reservationDetails.showReservedDeviceResponses.map((device, index) => (
          <div key={index} className="flex items-center justify-between p-3">
            <div>
              <p className="font-label-regular">{device.deviceName}</p>
              <p className="font-caption-regular">{device.dataCapacity}GB</p>
            </div>
            <div className="text-right">
              <p className="font-label-regular">{device.price.toLocaleString()}원</p>
              <p className="font-caption-regular text-[var(--gray-dark)]">× {device.count}개</p>
            </div>
          </div>
        ))}
        <div className="border-t border-[var(--gray)] mt-2 pt-4 px-3 pb-2">
          <div className="flex items-center justify-between font-label-semibold">
            <p>총 금액</p>
            <p>{totalPrice.toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </div>
  );
}
