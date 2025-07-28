// Kakao Places API를 사용한 키워드 검색 결과 타입
export interface PlaceSearchResult {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string; // longitude
  y: string; // latitude
}

// 키워드 검색 함수
export const searchPlaces = async (keyword: string): Promise<PlaceSearchResult[]> => {
  if (!keyword.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('검색 요청에 실패했습니다.');
    }

    const data = await response.json();

    interface KakaoPlaceDocument {
      id: string;
      place_name: string;
      address_name: string;
      road_address_name: string;
      phone: string;
      x: string;
      y: string;
    }

    if (data.documents) {
      return data.documents.map((doc: KakaoPlaceDocument) => ({
        id: doc.id,
        place_name: doc.place_name,
        address_name: doc.address_name,
        road_address_name: doc.road_address_name,
        phone: doc.phone,
        x: doc.x,
        y: doc.y,
      }));
    }

    return [];
  } catch (error) {
    console.error('키워드 검색 오류:', error);
    return [];
  }
};
