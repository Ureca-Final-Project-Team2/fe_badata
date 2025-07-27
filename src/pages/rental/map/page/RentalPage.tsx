'use client';

import { useEffect, useReducer, useState } from 'react';

import { CenterScrollSwiper } from '@/entities/scroll';
import {
  initialSelectedStoreState,
  selectedStoreReducer,
} from '@/pages/rental/map/model/selectedStoreReducer';
import { useFetchStoreListHooks } from '@/pages/rental/map/model/useFetchStoreListHooks';
import DeviceCard from '@/pages/rental/map/ui/DeviceCard';
import { DrawerSection } from '@/pages/rental/map/ui/DrawerSection';
import { MapSection } from '@/pages/rental/map/ui/MapSection';
import RentalFilterContent from '@/pages/rental/map/ui/RentalFilterContent';
import { SearchPosHeader } from '@/pages/rental/map/ui/SearchPosHeader';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { FilterDrawer } from '@/shared/ui/FilterDrawer';
import { FilterIcon } from '@/shared/ui/FilterIcon/FilterIcon';

import type { StoreDetail, StoreDevice } from '@/pages/rental/map/lib/types';

const RentalPage = () => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedStore, dispatchSelectedStore] = useReducer(
    selectedStoreReducer,
    initialSelectedStoreState,
  );
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userAddress, setUserAddress] = useState<string>('현재위치');

  // 좌표를 주소로 변환하는 함수 (Kakao REST API 사용)
  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      console.log('REST API로 주소 변환 시작:', { lat, lng });

      const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API_KEY;
      if (!KAKAO_REST_API_KEY) {
        setUserAddress('현재위치');
        return;
      }

      const x = lng.toString();
      const y = lat.toString();
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('REST API 응답:', data);

        if (data.documents && data.documents.length > 0) {
          const roadAddress = data.documents[0].road_address?.address_name;
          const bunjiAddress = data.documents[0].address?.address_name;

          console.log('도로명 주소:', roadAddress);
          console.log('지번 주소:', bunjiAddress);

          // 도로명 주소가 있으면 도로명 주소를, 없으면 지번 주소를 사용
          const finalAddress = roadAddress || bunjiAddress || '현재위치';
          setUserAddress(finalAddress);
        } else {
          console.log('주소 정보가 없습니다.');
          setUserAddress('현재위치');
        }
      } else {
        console.error('REST API 요청 실패:', response.status, response.statusText);
        setUserAddress('현재위치');
      }
    } catch (error) {
      console.error('주소 변환 실패:', error);
      setUserAddress('현재위치');
    }
  };

  // 사용자 위치 가져오기
  useEffect(() => {
    console.log('GPS 위치 요청 시작');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('GPS 위치 획득 성공:', { latitude, longitude });
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log('GPS 위치 획득 실패, fallback 사용:', error);
        // fallback: 서울시청 좌표
        setUserLocation({ lat: 37.5665, lng: 126.978 });
      },
    );
  }, []);

  // userLocation이 변경될 때마다 주소 변환 시도
  useEffect(() => {
    if (userLocation) {
      console.log('userLocation 변경됨:', userLocation);
      // REST API로 바로 주소 변환 시도
      getAddressFromCoords(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  // useFetchStoreListHooks로 스토어 리스트 관리
  const { stores } = useFetchStoreListHooks(
    userLocation
      ? {
          centerLat: userLocation.lat,
          centerLng: userLocation.lng,
          page: 0,
          size: 10,
          sort: ['distance,asc'],
        }
      : {
          centerLat: 37.5665,
          centerLng: 126.978,
          page: 0,
          size: 10,
          sort: ['distance,asc'],
        },
    [userLocation],
  );

  return (
    <BaseLayout
      centered
      paddingX={false}
      showHeader
      showBottomNav
      header={
        <div className="max-w-[428px] px-4 pt-4 z-30">
          <div className="flex flex-row items-center gap-1">
            <SearchPosHeader search="" setSearch={() => {}} onSubmit={() => {}} />
            <FilterIcon
              alt="필터 아이콘"
              className="w-8 h-8 flex-shrink-0 cursor-pointer"
              onClick={() => setFilterDrawerOpen(true)}
            />
          </div>
        </div>
      }
    >
      <div className="w-full h-[50px] flex flex-row items-center px-4 gap-4">
        <div className="font-label-semibold text-[var(--black)]">기준 위치 </div>
        <div className="font-label-regular text-[var(--black)]">{userAddress}</div>
      </div>
      <div className="w-full h-[calc(100vh-190px)]">
        <MapSection
          onStoreMarkerClick={(
            devices: StoreDevice[],
            storeDetail?: StoreDetail,
            storeId?: number,
          ) => {
            dispatchSelectedStore({
              type: 'SELECT_STORE',
              devices,
              storeId: storeId ?? 0,
              storeDetail,
            });
          }}
        />
      </div>
      <DrawerSection
        open={true}
        storeList={stores.map((store) => ({
          id: store.id,
          store,
          storeDetail: {
            storeName: store.name,
            storeId: store.id,
            imageUrl: '',
            detailAddress: '',
            phoneNumber: '',
            distanceFromMe: 0,
            reviewRating: 0,
            isOpening: false,
            startTime: '',
            endTime: '',
          },
          deviceCount: 0,
        }))}
      />
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        className="bg-[var(--main-2)]"
      >
        <RentalFilterContent onClose={() => setFilterDrawerOpen(false)} />
      </FilterDrawer>
      {selectedStore.selectedDevices.length > 0 && (
        <div className="absolute bottom-20 left-0 w-full flex justify-center z-50">
          <CenterScrollSwiper
            key={selectedStore.selectedDevices.map((d) => d.storeDeviceId).join('-')}
            items={selectedStore.selectedDevices}
          >
            {(device) => <DeviceCard device={device} />}
          </CenterScrollSwiper>
        </div>
      )}
    </BaseLayout>
  );
};

export default RentalPage;
