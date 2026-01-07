'use client';

import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme as defaultTheme } from './index';
import type { ThemeType } from './index';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<ThemeType>;
}

/**
 * ThemeProvider component that wraps the application with styled-components theme
 * Provides design tokens to all styled components
 */
export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  // Merge custom theme with default theme if provided
  const mergedTheme = theme ? { ...defaultTheme, ...theme } : defaultTheme;

  return <StyledThemeProvider theme={mergedTheme}>{children}</StyledThemeProvider>;
}

