'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color,
  className = ''
}) => {
  const IconComponent = LucideIcons[name] as React.ElementType;

  if (!IconComponent) {
    const FallbackIcon = LucideIcons.Sparkles;
    return <FallbackIcon size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};