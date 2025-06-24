'use client';

import Image from 'next/image';

interface AIResearchLogoProps {
  size?: number;
}
export function AIResearchLogo({ size = 24 }: AIResearchLogoProps) {
  return (
    <Image
        src="/az.png"
        alt="Agent AZ"
        width={size}
        height={size}
        className="flex-shrink-0"
        unoptimized={true}
        priority
      />
  );
}
