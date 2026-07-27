'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, WedyThemeContextType } from '@/types/design-system';

const WedyThemeContext = createContext<WedyThemeContextType | undefined>(undefined);

export const WedyThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('wedyplan_theme') as ThemeMode) || 'system';
    setThemeState(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (targetTheme: 'light' | 'dark') => {
      setResolvedTheme(targetTheme);
      if (targetTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('wedyplan_theme', newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <WedyThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </WedyThemeContext.Provider>
  );
};

export const useWedyTheme = () => {
  const context = useContext(WedyThemeContext);
  if (!context) {
    throw new Error('useWedyTheme must be used within a WedyThemeProvider');
  }
  return context;
};