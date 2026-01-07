// Aurigami Theme System
// Aggregates all design tokens into a unified theme object for styled-components

import { colors, primitive, semantic, semanticDark } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from '../tokens/typography';
import { shadows } from '../tokens/shadows';
import { borderWidths, borderStyles } from '../tokens/borders';
import { radii } from '../tokens/radii';
import { duration, easing, transitions } from '../tokens/transitions';
import { breakpoints, mediaQueries } from '../tokens/breakpoints';
import { zIndex } from '../tokens/zIndex';
import { gradients } from '../tokens/gradients';

// Create the unified theme object
export const theme = {
  colors: {
    primitive,
    semantic,
    semanticDark,
  },
  spacing,
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
  },
  shadows,
  borders: {
    widths: borderWidths,
    styles: borderStyles,
  },
  radii,
  transitions: {
    duration,
    easing,
    transitions,
  },
  breakpoints,
  mediaQueries,
  zIndex,
  gradients,
} as const;

// Export the theme type for use in styled-components
export type ThemeType = typeof theme;

// Re-export for convenience
export { colors, spacing, shadows, radii, breakpoints, zIndex, gradients };

