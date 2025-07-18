import { ICONS } from '@/shared/config/iconPath';

interface BackIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const BackIcon = ({
  width = 24,
  height = 24,
  alt = '뒤로가기 아이콘',
  ...props
}: BackIconProps) => {
  return <img src={ICONS.LOGO.BACKICON} width={width} height={height} alt={alt} {...props} />;
};
