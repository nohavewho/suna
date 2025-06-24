'use client';

import Image from 'next/image';

interface AgentAZLogoProps {
  size?: number;
  className?: string;
}

export function AgentAZLogo({ size = 24, className = '' }: AgentAZLogoProps) {
  return (
    <Image
      src="/az.png"
      alt="Agent AZ"
      width={size}
      height={size}
      className={`flex-shrink-0 ${className}`}
      unoptimized={true}
      priority
    />
  );
}

// Export as KortixLogo for backward compatibility
export { AgentAZLogo as KortixLogo };