// Design token utilities for the styling system

export const designTokens = {
  // Charcoal Color Palette
  charcoal: {
    50: 'hsl(var(--charcoal-50))',
    100: 'hsl(var(--charcoal-100))',
    200: 'hsl(var(--charcoal-200))',
    300: 'hsl(var(--charcoal-300))',
    400: 'hsl(var(--charcoal-400))',
    500: 'hsl(var(--charcoal-500))',
    600: 'hsl(var(--charcoal-600))',
    700: 'hsl(var(--charcoal-700))',
    800: 'hsl(var(--charcoal-800))',
    900: 'hsl(var(--charcoal-900))',
    950: 'hsl(var(--charcoal-950))',
  },

  // Accent Colors
  accent: {
    blue: 'hsl(var(--accent-blue))',
    green: 'hsl(var(--accent-green))',
    orange: 'hsl(var(--accent-orange))',
    red: 'hsl(var(--accent-red))',
    purple: 'hsl(var(--accent-purple))',
  },

  // Semantic Colors
  semantic: {
    success: 'hsl(var(--success))',
    warning: 'hsl(var(--warning))',
    error: 'hsl(var(--error))',
    info: 'hsl(var(--info))',
  },

  // Typography Scale
  fontSize: {
    xs: 'var(--text-xs)',
    sm: 'var(--text-sm)',
    base: 'var(--text-base)',
    lg: 'var(--text-lg)',
    xl: 'var(--text-xl)',
    '2xl': 'var(--text-2xl)',
    '3xl': 'var(--text-3xl)',
    '4xl': 'var(--text-4xl)',
  },

  // Spacing Scale
  spacing: {
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    3: 'var(--space-3)',
    4: 'var(--space-4)',
    6: 'var(--space-6)',
    8: 'var(--space-8)',
    12: 'var(--space-12)',
    16: 'var(--space-16)',
  },

  // Animation Configuration
  duration: {
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
  },

  // Easing Functions
  easing: {
    out: 'var(--ease-out)',
    in: 'var(--ease-in)',
    spring: 'var(--ease-spring)',
    bounce: 'var(--ease-bounce)',
  },

  // Shadow System
  shadow: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
    '2xl': 'var(--shadow-2xl)',
    glass: 'var(--shadow-glass)',
    card: 'var(--shadow-card)',
    soft: 'var(--shadow-soft)',
  },

  // Layout
  radius: 'var(--radius)',
  containerMaxWidth: 'var(--container-max-width)',

  // Font Families
  fontFamily: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
} as const;

// Utility function to get CSS custom property value
export function getCSSVariable(property: string): string {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
  }
  return '';
}

// Utility function to validate if all design tokens are available
export function validateDesignTokens(): boolean {
  if (typeof window === 'undefined') return true;

  const requiredTokens = [
    '--charcoal-50',
    '--charcoal-900',
    '--accent-blue',
    '--success',
    '--text-base',
    '--space-4',
    '--duration-normal',
    '--ease-out',
    '--shadow-md',
    '--radius',
  ];

  return requiredTokens.every(token => {
    const value = getCSSVariable(token);
    return value !== '';
  });
}

// Glassmorphism utility classes as JavaScript objects for dynamic styling
export const glassmorphismStyles = {
  glass: {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))',
  },
  glassCard: {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-glass)',
  },
} as const;

// Animation presets
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  spring: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  },
} as const;