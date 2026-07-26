'use client';

import React, { useState } from 'react';
import { THEME_PALETTES } from '@/lib/constants';
import { ThemeSelector } from '@/components/molecules/ThemeSelector';

export function ThemeSectionWrapper() {
  const [activeTheme, setActiveTheme] = useState<keyof typeof THEME_PALETTES>('boho');

  return (
    <ThemeSelector 
      activeTheme={activeTheme} 
      onSelectTheme={setActiveTheme} 
    />
  );
}