interface DeviceImageProps {
  url: string;
  alt: string;
  className?: string;
}

const DeviceImage = ({ url, alt, className }: DeviceImageProps) => (
  <img
    src={
      url ||
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
    }
    alt={alt}
    className={className}
  />
);

export default DeviceImage;
