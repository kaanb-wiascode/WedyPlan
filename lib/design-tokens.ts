export const DESIGN_TOKENS = {
    colors: {
      brand: {
        magenta: '#E6007E',
        magentaHover: '#C4006B',
        magentaLight: 'rgba(230, 0, 126, 0.1)',
        gold: '#D4AF37',
        goldHover: '#B8982C',
        goldLight: 'rgba(212, 175, 55, 0.12)',
      },
      neutral: {
        charcoal: '#1D1D1F',
        slate: '#6E6E73',
        muted: '#86868B',
        cream: '#FAF8F5',
        pureWhite: '#FFFFFF',
        pureBlack: '#000000',
      },
      status: {
        success: '#10B981',
        successBg: 'rgba(16, 185, 129, 0.1)',
        warning: '#F59E0B',
        warningBg: 'rgba(245, 158, 11, 0.1)',
        danger: '#EF4444',
        dangerBg: 'rgba(239, 68, 68, 0.1)',
      },
      dark: {
        background: '#0D0D0E',
        surface: '#18181B',
        surfaceBorder: '#27272A',
        textPrimary: '#F4F4F5',
        textSecondary: '#A1A1AA',
      }
    },
  
    typography: {
      fontFamilies: {
        serif: 'var(--font-serif, "Playfair Display", Georgia, serif)',
        sans: 'var(--font-sans, "Inter", -apple-system, BlinkMacSystemFont, sans-serif)',
        mono: 'var(--font-mono, "JetBrains Mono", monospace)',
      },
      sizes: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        md: '1rem',       // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
      }
    },
  
    radius: {
      none: '0px',
      sm: '0.5rem',     // 8px
      md: '0.75rem',    // 12px
      lg: '1rem',       // 16px
      xl: '1.5rem',     // 24px
      '2xl': '2rem',    // 32px
      '3xl': '2.25rem', // 36px
      full: '9999px',
    },
  
    shadows: {
      glassSubtle: '0 8px 32px 0 rgba(31, 38, 135, 0.04)',
      glassMedium: '0 16px 40px 0 rgba(0, 0, 0, 0.06)',
      glassHeavy: '0 24px 60px 0 rgba(0, 0, 0, 0.12)',
      glowMagenta: '0 0 25px rgba(230, 0, 126, 0.25)',
      glowGold: '0 0 25px rgba(212, 175, 55, 0.25)',
    },
  
    glass: {
      subtle: 'bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/60 dark:border-zinc-800/60',
      medium: 'bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/80 dark:border-zinc-800/80',
      heavy: 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-white dark:border-zinc-700',
      solid: 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800',
    },
  
    motion: {
      springFast: { type: 'spring', stiffness: 400, damping: 25 },
      springSmooth: { type: 'spring', stiffness: 200, damping: 20 },
      easeApple: [0.16, 1, 0.3, 1],
      durationFast: 0.2,
      durationMedium: 0.4,
    },
  
    breakpoints: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  
    spacing: {
      1: '0.25rem',  // 4px
      2: '0.5rem',   // 8px
      3: '0.75rem',  // 12px
      4: '1rem',      // 16px
      6: '1.5rem',   // 24px
      8: '2rem',     // 32px
      12: '3rem',    // 48px
      16: '4rem',    // 64px
      20: '5rem',    // 80px
    }
  } as const;