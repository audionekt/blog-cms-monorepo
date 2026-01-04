import { createTheme, createGlobalTheme } from '@vanilla-extract/css';
import { colors, gradients, spacing, shadows, radii, duration, easing } from '../tokens';
import { vars } from './contract.css';

// Create the light theme (default)
export const lightTheme = createTheme(vars, {
  color: {
    primitive: {
      slate: colors.primitive.slate,
      violet: colors.primitive.violet,
      emerald: colors.primitive.emerald,
      rose: colors.primitive.rose,
      amber: colors.primitive.amber,
    },
    semantic: colors.semantic,
  },
  gradient: gradients,
  space: spacing,
  shadow: shadows,
  radius: radii,
  transition: {
    duration,
    easing,
  },
});

// Create the dark theme
export const darkTheme = createTheme(vars, {
  color: {
    primitive: {
      // Invert slate scale for dark mode
      slate: {
        50: colors.primitive.slate[950],
        100: colors.primitive.slate[900],
        200: colors.primitive.slate[800],
        300: colors.primitive.slate[700],
        400: colors.primitive.slate[600],
        500: colors.primitive.slate[500],
        600: colors.primitive.slate[400],
        700: colors.primitive.slate[300],
        800: colors.primitive.slate[200],
        900: colors.primitive.slate[100],
        950: colors.primitive.slate[50],
      },
      // Keep other primitive colors the same
      violet: colors.primitive.violet,
      emerald: colors.primitive.emerald,
      rose: colors.primitive.rose,
      amber: colors.primitive.amber,
    },
    semantic: colors.semanticDark,
  },
  gradient: gradients,
  space: spacing,
  shadow: shadows,
  radius: radii,
  transition: {
    duration,
    easing,
  },
});

// Global tokens that don't change between themes
export const globalTokens = createGlobalTheme(':root', {
  font: {
    family: {
      sans: "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
    },
  },
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    fixed: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    tooltip: '1600',
    toast: '1700',
  },
  breakpoint: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
});
