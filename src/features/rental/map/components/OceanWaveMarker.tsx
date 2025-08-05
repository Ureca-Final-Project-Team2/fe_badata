import React from 'react';

import styles from './OceanWaveMarker.module.css';

interface OceanWaveMarkerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const OceanWaveMarker: React.FC<OceanWaveMarkerProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`${styles.markerContainer} ${styles[size]} ${className}`}>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.locationMarker}></div>
    </div>
  );
};

export default OceanWaveMarker;
