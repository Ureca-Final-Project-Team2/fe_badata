import { ICONS } from '@/shared/config/iconPath';

interface FilterIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const FilterIcon = ({
  width = 24,
  height = 24,
  alt = '필터 아이콘',
  ...props
}: FilterIconProps) => {
  return <img src={ICONS.LOGO.FILTERICON} width={width} height={height} alt={alt} {...props} />;
};
