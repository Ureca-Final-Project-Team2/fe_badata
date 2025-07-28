import type { AddressHistoryItem } from '@/pages/rental/search/api/apis';

const STORAGE_KEY = 'addressHistory';

// localStorage에서 주소 이력 가져오기
export const getLocalAddressHistory = (): AddressHistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('localStorage에서 주소 이력 조회 실패:', error);
    return [];
  }
};

// localStorage에 주소 이력 저장하기
export const saveLocalAddressHistory = (history: AddressHistoryItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('localStorage에 주소 이력 저장 실패:', error);
  }
};

// 주소 사용 시 최신 시간 업데이트
export const updateAddressUsageTime = (addressId: number): void => {
  const history = getLocalAddressHistory();
  const updatedHistory = history.map((item) => {
    if (item.addressId === addressId) {
      return { ...item, lastUsed: Date.now() };
    }
    return item;
  });
  saveLocalAddressHistory(updatedHistory);
};

// 새로운 주소 이력 추가
export const addLocalAddressHistory = (
  address_name: string,
  id: string,
  phone: string,
  place_name: string,
  road_address_name: string,
  x: number,
  y: number,
): number | null => {
  const history = getLocalAddressHistory();
  console.log(
    'localStorage 현재 주소들:',
    history.map((item) => item.address_name),
  );
  console.log('추가하려는 주소:', address_name);

  // 중복 주소 확인
  const existingItem = history.find((item) => item.address_name === address_name);
  if (existingItem) {
    console.log('중복 주소입니다. 사용 시간만 업데이트합니다:', address_name);
    // 중복인 경우 사용 시간만 업데이트
    updateAddressUsageTime(existingItem.addressId);
    return existingItem.addressId;
  }

  console.log('새로운 주소입니다. 추가합니다:', address_name);

  // 새로운 주소 이력 생성
  const newItem: AddressHistoryItem = {
    addressId: Date.now(), // 고유 ID 생성
    address_name: address_name,
    id: id,
    phone: phone,
    place_name: place_name,
    road_address_name: road_address_name,
    x: x,
    y: y,
    lastUsed: Date.now(), // 사용 시간 추가
  };

  // 최신 항목을 맨 앞에 추가 (최대 10개 유지)
  const updatedHistory = [newItem, ...history].slice(0, 10);

  saveLocalAddressHistory(updatedHistory);
  return newItem.addressId;
};

// 주소 이력 삭제
export const deleteLocalAddressHistory = (addressId: number): number | null => {
  const history = getLocalAddressHistory();
  const filteredHistory = history.filter((item) => item.addressId !== addressId);

  if (filteredHistory.length === history.length) {
    return null; // 삭제할 항목이 없음
  }

  saveLocalAddressHistory(filteredHistory);
  return addressId;
};

// 무한스크롤을 위한 주소 이력 조회 (최신 사용 순으로 정렬)
export const getLocalAddressHistoryPaginated = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
): { getAddressResponses: AddressHistoryItem[]; hasNext: boolean } => {
  const history = getLocalAddressHistory();

  // 정렬 (최신 사용 순으로 정렬, 사용 시간이 없으면 생성 시간으로)
  const sortedHistory = [...history].sort((a, b) => {
    const aTime = a.lastUsed || a.addressId;
    const bTime = b.lastUsed || b.addressId;

    if (sort.includes('desc')) {
      return bTime - aTime;
    }
    return aTime - bTime;
  });

  // 무한스크롤을 위한 페이지네이션
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const paginatedHistory = sortedHistory.slice(startIndex, endIndex);

  return {
    getAddressResponses: paginatedHistory,
    hasNext: endIndex < sortedHistory.length,
  };
};

// 테스트용 샘플 데이터 추가
export const addSampleLocalAddressHistory = (): void => {
  const sampleAddresses = [
    {
      address_name: '서울 강남구 삼성동 131',
      id: '26967382',
      phone: '02-568-1291',
      place_name: '서울선릉과정릉',
      road_address_name: '서울 강남구 선릉로100길 1',
      x: 127.04892851392,
      y: 37.5091105328378,
    },
    {
      address_name: '서울 강남구 테헤란로 123',
      id: '12345678',
      phone: '02-123-4567',
      place_name: '강남역',
      road_address_name: '서울 강남구 테헤란로 123',
      x: 127.028,
      y: 37.498,
    },
    {
      address_name: '서울 강남구 역삼동 123-45',
      id: '87654321',
      phone: '02-987-6543',
      place_name: '역삼역',
      road_address_name: '서울 강남구 역삼동 123-45',
      x: 127.036,
      y: 37.5,
    },
  ];

  sampleAddresses.forEach((address, index) => {
    const newItem: AddressHistoryItem = {
      addressId: Date.now() + index, // 고유 ID 생성
      address_name: address.address_name,
      id: address.id,
      phone: address.phone,
      place_name: address.place_name,
      road_address_name: address.road_address_name,
      x: address.x,
      y: address.y,
      lastUsed: Date.now() - index * 1000, // 각각 다른 사용 시간
    };

    const history = getLocalAddressHistory();
    const existingItem = history.find((item) => item.address_name === address.address_name);

    if (!existingItem) {
      const updatedHistory = [newItem, ...history].slice(0, 10);
      saveLocalAddressHistory(updatedHistory);
    }
  });
};
