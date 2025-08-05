export interface MarkerPosition {
  lat: number;
  lng: number;
}

export interface MapMarkerProps {
  position: MarkerPosition;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export interface OceanWaveMarkerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}
