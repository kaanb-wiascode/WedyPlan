export type ThemeMode = 'light' | 'dark' | 'system';

export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'gold' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'neutral';

export type GlassIntensity = 'subtle' | 'medium' | 'heavy' | 'solid';

export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'body' 
  | 'body-sm' 
  | 'caption' 
  | 'serif-hero' 
  | 'serif-heading';

export interface WedyThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}