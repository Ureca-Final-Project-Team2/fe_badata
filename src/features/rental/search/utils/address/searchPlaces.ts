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

// 검색 파라미터 타입
export interface SearchPlacesParams {
  keyword: string;
  page?: number;
  size?: number;
  signal?: AbortSignal;
}

// 키워드 검색 함수 (페이지네이션 지원)
export const searchPlaces = async (params: SearchPlacesParams): Promise<PlaceSearchResult[]> => {
  const { keyword, page = 1, size = 15, signal } = params;

  if (!keyword.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}&page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY}`,
        },
        signal, //진행 중 요청을 취소할 수 있도록 signal 추가
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('API 호출 제한에 도달했습니다. 잠시 후 다시 시도해주세요.');
      }
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
    if ((error as Error)?.name === 'AbortError') {
      // 요청이 취소된 경우 (AbortError)에는 아무 작업도 하지 않음
      throw error;
    }
    console.error('키워드 검색 오류:', error);
    throw error;
  }
};
