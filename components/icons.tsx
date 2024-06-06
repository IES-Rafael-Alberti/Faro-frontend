// components/SvgIcon.tsx
import Image from 'next/image';

interface SvgIconProps {
    src: string;
    width?: number;
    height?: number;
    className?: string;
  }
  
  const Icon = ({ src, width = 50, height = 50, className }: SvgIconProps) => (
    <Image src={src} alt="Icon" width={width} height={height} className={className} />
  );
  
  export default Icon;
  