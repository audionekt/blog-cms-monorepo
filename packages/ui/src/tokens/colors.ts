// Nexus Color System
// Primitive color scales derived from design tokens

export const primitive = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  violet: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    800: '#065f46',
    900: '#064e3b',
  },
  rose: {
    50: '#fff1f2',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    800: '#9f1239',
    950: '#4c0519',
  },
  amber: {
    100: '#fef3c7',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#78350f',
    900: '#451a03',
  },
  base: {
    white: '#ffffff',
    black: '#000000',
  },
} as const;

// Semantic color mappings - Light theme
export const semantic = {
  brand: {
    primary: primitive.violet[500],
    primaryHover: primitive.violet[600],
    primaryActive: primitive.violet[700],
    accent: primitive.violet[400],
    accentHover: primitive.violet[500],
    accentActive: primitive.violet[600],
    containerLight: primitive.violet[50],
  },
  background: {
    base: primitive.base.white,
    content: primitive.base.white,
    subtle: primitive.slate[50],
    muted: primitive.slate[100],
    elevated: primitive.base.white,
    popup: primitive.base.white,
    sidebar: primitive.slate[50],
    greyFill: primitive.slate[50],
    hover: primitive.violet[100],
    selected: primitive.violet[200],
    disabled: primitive.slate[100],
    tag: primitive.slate[100],
    overlay: 'rgba(15, 23, 42, 0.5)',
  },
  foreground: {
    primary: primitive.slate[900],
    secondary: primitive.slate[500],
    tertiary: primitive.slate[400],
    muted: primitive.slate[400],
    disabled: primitive.slate[400],
    onBrand: primitive.base.white,
    accent: primitive.violet[500],
    link: primitive.violet[600],
    linkHover: primitive.violet[700],
  },
  border: {
    default: primitive.slate[200],
    strong: primitive.slate[300],
    subtle: primitive.slate[200],
    accent: primitive.violet[400],
    hover: primitive.violet[300],
    line: primitive.slate[300],
  },
  success: {
    base: primitive.emerald[500],
    main: primitive.emerald[600],
    hover: primitive.emerald[600],
    subtle: primitive.emerald[50],
    background: primitive.emerald[100],
    text: primitive.emerald[600],
    border: primitive.emerald[300],
  },
  error: {
    base: primitive.rose[600],
    main: primitive.rose[600],
    hover: primitive.rose[500],
    subtle: primitive.rose[50],
    containerLight: primitive.rose[50],
    text: primitive.rose[600],
    border: primitive.rose[300],
  },
  warning: {
    base: primitive.amber[600],
    main: primitive.amber[600],
    hover: primitive.amber[700],
    subtle: primitive.amber[100],
    background: primitive.amber[100],
    text: primitive.amber[700],
    border: primitive.amber[300],
  },
  highlight: {
    background: primitive.amber[100],
    border: primitive.amber[300],
  },
  added: {
    background: primitive.emerald[100],
    subtleBackground: primitive.emerald[50],
  },
  code: {
    base: '#1e293b',
    comment: primitive.slate[400],
    keyword: '#db2777',
    string: primitive.emerald[600],
    attribute: '#7c3aed',
    addition: primitive.emerald[100],
    deletion: '#ffe4e6',
    tagBackground: primitive.slate[100],
    tagColor: '#334155',
  },
} as const;

// Semantic color mappings - Dark theme
export const semanticDark = {
  brand: {
    primary: primitive.violet[400],
    primaryHover: primitive.violet[300],
    primaryActive: primitive.violet[500],
    accent: primitive.violet[400],
    accentHover: primitive.violet[300],
    accentActive: primitive.violet[500],
    containerLight: primitive.violet[900],
  },
  background: {
    base: primitive.slate[900],
    content: primitive.slate[900],
    subtle: primitive.slate[800],
    muted: primitive.slate[800],
    elevated: primitive.slate[800],
    popup: primitive.slate[800],
    sidebar: primitive.slate[950],
    greyFill: primitive.slate[800],
    hover: primitive.violet[900],
    selected: primitive.violet[800],
    disabled: primitive.slate[800],
    tag: primitive.slate[700],
    overlay: 'rgba(2, 6, 23, 0.8)',
  },
  foreground: {
    primary: primitive.slate[50],
    secondary: primitive.slate[400],
    tertiary: primitive.slate[500],
    muted: primitive.slate[500],
    disabled: primitive.slate[600],
    onBrand: primitive.base.white,
    accent: primitive.violet[400],
    link: primitive.violet[400],
    linkHover: primitive.violet[300],
  },
  border: {
    default: primitive.slate[700],
    strong: primitive.slate[600],
    subtle: primitive.slate[700],
    accent: primitive.violet[500],
    hover: primitive.violet[400],
    line: primitive.slate[700],
  },
  success: {
    base: primitive.emerald[400],
    main: primitive.emerald[400],
    hover: primitive.emerald[300],
    subtle: primitive.emerald[900],
    background: primitive.emerald[900],
    text: primitive.emerald[400],
    border: primitive.emerald[800],
  },
  error: {
    base: primitive.rose[400],
    main: primitive.rose[500],
    hover: primitive.rose[300],
    subtle: primitive.rose[950],
    containerLight: primitive.rose[950],
    text: primitive.rose[400],
    border: primitive.rose[800],
  },
  warning: {
    base: primitive.amber[500],
    main: primitive.amber[400],
    hover: primitive.amber[300],
    subtle: primitive.amber[900],
    background: primitive.amber[900],
    text: primitive.amber[500],
    border: primitive.amber[800],
  },
  highlight: {
    background: primitive.amber[900],
    border: primitive.amber[800],
  },
  added: {
    background: primitive.emerald[900],
    subtleBackground: primitive.emerald[800],
  },
  code: {
    base: '#e2e8f0',
    comment: primitive.slate[500],
    keyword: '#f472b6',
    string: primitive.emerald[400],
    attribute: '#a78bfa',
    addition: primitive.emerald[900],
    deletion: '#881337',
    tagBackground: primitive.slate[700],
    tagColor: primitive.slate[300],
  },
} as const;

// Corner radius tokens
export const radius = {
  xs: '3px',
  sm: '6px',
  md: '10px',
  lg: '14px',
} as const;

// Combined colors export
export const colors = {
  primitive,
  semantic,
  semanticDark,
} as const;

// Export types for type safety
export type ColorToken = typeof colors;
export type PrimitiveColor = keyof typeof primitive;
export type SlateColor = keyof typeof primitive.slate;
export type VioletColor = keyof typeof primitive.violet;
export type EmeraldColor = keyof typeof primitive.emerald;
export type RoseColor = keyof typeof primitive.rose;
export type AmberColor = keyof typeof primitive.amber;
export type SemanticColor = keyof typeof semantic;
export type RadiusToken = keyof typeof radius;
