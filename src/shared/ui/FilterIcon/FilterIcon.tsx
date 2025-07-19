import Image from 'next/image';

import { ICONS } from '@/shared/config/iconPath';

interface FilterIconProps extends Omit<React.ComponentProps<typeof Image>, 'src'> {
  width?: number;
  height?: number;
  alt: string;
}

export const FilterIcon = ({
  width = 24,
  height = 24,
  alt = '필터 아이콘',
  ...props
}: FilterIconProps) => {
  return <Image src={ICONS.ETC.FILTERICON} width={width} height={height} alt={alt} {...props} />;
};
