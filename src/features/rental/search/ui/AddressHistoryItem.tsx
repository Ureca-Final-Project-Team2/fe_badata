import React, { useCallback, useState } from 'react';

import { MapPin, Phone, X } from 'lucide-react';

// 주소 이력 아이템 컴포넌트
const AddressHistoryItem = React.memo(
  ({
    item,
    onAddressClick,
    onDelete,
  }: {
    item: {
      addressId: number;
      address_name: string;
      place_name: string;
      road_address_name: string;
      phone: string;
    };
    onAddressClick: (item: { addressId: number; address_name: string }) => void;
    onDelete: (addressId: number, e: React.MouseEvent) => void;
  }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClick = useCallback(() => {
      onAddressClick(item);
    }, [item, onAddressClick]);

    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDeleting(true);

        // 애니메이션 완료 후 삭제 실행
        setTimeout(() => {
          onDelete(item.addressId, e);
        }, 300);
      },
      [item.addressId, onDelete],
    );

    return (
      <div
        className={`p-3 border-b border-[var(--gray-light)] rounded-lg cursor-pointer hover:bg-[var(--gray-light)] transition-all duration-300 ${
          isDeleting ? 'opacity-0' : ''
        }`}
        onClick={handleClick}
      >
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[var(--gray-dark)] mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {/* 장소명 */}
            <h3 className="text-[var(--black)] font-small-semibold mb-1 truncate">
              {item.place_name}
            </h3>

            {/* 도로명 주소 */}
            {item.road_address_name && (
              <p className="text-[var(--gray-dark)] font-small-regular mb-1">
                {item.road_address_name}
              </p>
            )}

            {/* 지번 주소 */}
            <p className="text-[var(--gray-dark)] font-small-regular mb-1">
              지번 {item.address_name}
            </p>

            {/* 전화번호 */}
            {item.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-[var(--main-5)]" />
                <span className="text-[var(--main-5)] font-small-semibold">{item.phone}</span>
              </div>
            )}
          </div>
          <button
            onClick={handleDelete}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            className="cursor-pointer p-2 rounded transition-colors flex-shrink-0 hover:bg-[var(--gray-light)]"
          >
            <X className="w-4 h-4 text-[var(--gray)] hover:text-[var(--gray-dark)]" />
          </button>
        </div>
      </div>
    );
  },
);

AddressHistoryItem.displayName = 'AddressHistoryItem';

export default AddressHistoryItem;
