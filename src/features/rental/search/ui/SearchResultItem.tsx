import React, { useCallback } from 'react';

import { MapPin, Phone } from 'lucide-react';

import type { PlaceSearchResult } from '@/features/rental/search/utils/address/searchPlaces';

// 검색 결과 아이템 컴포넌트
const SearchResultItem = React.memo(
  ({
    place,
    keyword,
    onSelectPlace,
  }: {
    place: PlaceSearchResult;
    keyword: string;
    onSelectPlace: (place: PlaceSearchResult) => void;
  }) => {
    // 검색어 강조 표시 함수
    const highlightKeyword = useCallback(
      (text: string) => {
        if (!keyword.trim()) return text;

        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="text-[var(--main-5)] font-semibold">
              {part}
            </span>
          ) : (
            part
          ),
        );
      },
      [keyword],
    );

    const handleClick = useCallback(() => {
      onSelectPlace(place);
    }, [place, onSelectPlace]);

    return (
      <div
        className="p-3 border-b border-[var(--gray-light)] cursor-pointer hover:bg-[var(--gray-light)] transition-colors"
        onClick={handleClick}
      >
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[var(--gray-dark)] mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {/* 장소명 */}
            <h3 className="text-[var(--black)] font-small-semibold mb-1 truncate">
              {highlightKeyword(place.place_name)}
            </h3>

            {/* 도로명 주소 */}
            {place.road_address_name && (
              <p className="text-[var(--gray-dark)] font-small-regular mb-1">
                {highlightKeyword(place.road_address_name)}
              </p>
            )}

            {/* 지번 주소 */}
            <p className="text-[var(--gray-dark)] font-small-regular mb-1">
              지번 {highlightKeyword(place.address_name)}
            </p>

            {/* 전화번호 */}
            {place.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-[var(--main-5)]" />
                <span className="text-[var(--main-5)] font-small-semibold">{place.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

SearchResultItem.displayName = 'SearchResultItem';

export default SearchResultItem;
