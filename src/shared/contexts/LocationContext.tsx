'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface LocationContextType {
  userLocation: LocationData | null;
  setUserLocation: (location: LocationData | null) => void;
  clearUserLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [userLocation, setUserLocationState] = useState<LocationData | null>(null);

  const setUserLocation = (location: LocationData | null) => {
    setUserLocationState(location);

    // 선택적으로 암호화된 형태로 localStorage에 저장
    if (location) {
      try {
        const encryptedLocation = btoa(JSON.stringify(location)); // 간단한 base64 인코딩
        localStorage.setItem('userLocation', encryptedLocation);
      } catch (error) {
        console.error('위치 정보 저장 실패:', error);
      }
    } else {
      localStorage.removeItem('userLocation');
    }
  };

  const clearUserLocation = () => {
    setUserLocationState(null);
    localStorage.removeItem('userLocation');
  };

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocation, clearUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
