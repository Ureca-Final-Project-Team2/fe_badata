const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY;

export interface Position {
  latitude: number;
  longitude: number;
}

// 주소를 좌표로 변환하는 함수
export const getPosition = async (address: string): Promise<Position | null> => {
  const url = `https://dapi.kakao.com/v2/local/search/address?query=${encodeURIComponent(address)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });

    if (res.ok) {
      const data = await res.json();

      if (data.documents && data.documents.length > 0) {
        const { x: longitude, y: latitude } = data.documents[0];
        return {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        };
      }
    }

    throw new Error('주소를 좌표로 변환할 수 없습니다.');
  } catch (error) {
    console.error('주소 좌표 변환 오류:', error);
    return null;
  }
};
