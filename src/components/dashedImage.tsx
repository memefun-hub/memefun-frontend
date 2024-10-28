'use client';

import Image from 'next/image';

export const DashedImage = (props: { className?: string; src: any; alt?: string; style?: React.CSSProperties }) => {
  const { className = '', src, alt = '' } = props;
  return <Image className={className} src={src} alt={alt} style={props.style} />;
};
