import { ICONS } from '@/shared/config/iconPath';
import Image from 'next/image';

interface BackIconProps extends Omit<React.ComponentProps<typeof Image>, 'src'> {
  width?: number;
  height?: number;
  alt: string;
}

export const BackIcon = ({
  width = 24,
  height = 24,
  alt = '뒤로가기 아이콘',
  ...props
}: BackIconProps) => {
  return <Image src={ICONS.ETC.BACKICON} width={width} height={height} alt={alt} {...props} />;
};
