// Aurigami Color System
// Primitive color scales

export const primitive = {
  charcoal: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d4d1cd",
    400: "#a39e98",
    500: "#716c66",
    600: "#58534e",
    700: "#3f3b37",
    800: "#2a2724",
    900: "#1a1816",
    950: "#0f0e0d",
  },
  gold: {
    50: "#fdfcf7",
    100: "#faf7ed",
    200: "#f5eed5",
    300: "#ede2b8",
    400: "#e3cf8a",
    500: "#d4b568",
    600: "#b8954a",
    700: "#95763a",
    800: "#6e5830",
    900: "#4a3a20",
    950: "#2a2013",
  },
  sage: {
    50: "#f7f9f7",
    100: "#eff2ef",
    200: "#dfe5df",
    300: "#c5d1c5",
    400: "#a1b3a1",
    500: "#7a927a",
    600: "#5f7360",
    700: "#4a5a4b",
    800: "#36423a",
    900: "#252d28",
    950: "#161a18",
  },
  azul: {
    50: "#f0f2f7",  
    100: "#f5f5f4",
    200: "#dfe3ec",
    300: "#c0c8d9",
    400: "#a0abb6",
    500: "#808ea3",
    600: "#60718c",
    700: "#405475",
    800: "#20375e",
    900: "#001a47",
    950: "#000d23",
  },
  terracotta: {
    50: "#faf7f7",
    100: "#f5eeec",
    200: "#ead9d5",
    300: "#dab8ae",
    400: "#c7897a",
    500: "#b85c4f",
    600: "#a24d42",
    700: "#8f3d32",
    800: "#6d2f27",
    900: "#4a201c",
    950: "#2a1310",
  },
  amethyst: {
    50: "#faf7fc",
    100: "#f4eef9",
    200: "#e8dcf2",
    300: "#d6c1e7",
    400: "#bb9bd8",
    500: "#9d6fc4",
    600: "#8454ab",
    700: "#6d4290",
    800: "#5a3576",
    900: "#4a2c61",
    950: "#2d1a3c",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },
  ruby: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
  },
} as const;

// Semantic color mappings - Light theme
export const semantic = {
  brand: {
    primary: primitive.amethyst[600],
    primaryHover: primitive.amethyst[700],
    primaryActive: primitive.amethyst[800],
    accent: primitive.amethyst[400],
    accentHover: primitive.amethyst[500],
    accentActive: primitive.amethyst[600],
  },
  background: {
    base: primitive.charcoal[50],
    subtle: primitive.charcoal[100],
    muted: primitive.charcoal[200],
    elevated: primitive.charcoal[50],
    overlay: "rgba(15, 14, 13, 0.5)",
  },
  foreground: {
    primary: primitive.charcoal[950],
    secondary: primitive.charcoal[700],
    tertiary: primitive.charcoal[600],
    muted: primitive.charcoal[500],
    onBrand: primitive.charcoal[50],
    accent: primitive.amethyst[600],
  },
  border: {
    default: primitive.charcoal[300],
    strong: primitive.charcoal[400],
    subtle: primitive.charcoal[200],
    accent: primitive.amethyst[400],
  },
  success: {
    base: primitive.sage[600],
    hover: primitive.sage[700],
    subtle: primitive.sage[100],
    text: primitive.sage[800],
    border: primitive.sage[300],
  },
  error: {
    base: primitive.terracotta[600],
    hover: primitive.terracotta[700],
    subtle: primitive.terracotta[100],
    text: primitive.terracotta[800],
    border: primitive.terracotta[300],
  },
  warning: {
    base: primitive.gold[600],
    hover: primitive.gold[700],
    subtle: primitive.gold[100],
    text: primitive.gold[900],
    border: primitive.gold[300],
  },
  info: {
    base: primitive.sky[600],
    hover: primitive.sky[700],
    subtle: primitive.sky[100],
    text: primitive.sky[900],
    border: primitive.sky[300],
  },
} as const;

// Semantic color mappings - Dark theme (matches blog aesthetic)
export const semanticDark = {
  brand: {
    primary: '#a78bfa', // Soft purple
    primaryHover: '#c4b5fd', // Lighter purple
    primaryActive: '#8b5cf6', // Deeper purple
    accent: '#c4b5fd',
    accentHover: '#ddd6fe',
    accentActive: '#a78bfa',
  },
  background: {
    base: '#0a0a14', // Deep dark blue
    subtle: '#141428', // Slightly lighter
    muted: '#1a1a2e', // Card backgrounds
    elevated: '#25253d', // Elevated surfaces
    overlay: 'rgba(10, 10, 20, 0.8)',
  },
  foreground: {
    primary: '#f0f0f5', // Almost white
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.5)',
    onBrand: '#ffffff',
    accent: '#a78bfa',
  },
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.2)',
    subtle: 'rgba(255, 255, 255, 0.06)',
    accent: 'rgba(167, 139, 250, 0.4)',
  },
  success: {
    base: primitive.sage[500],
    hover: primitive.sage[400],
    subtle: 'rgba(122, 146, 122, 0.15)',
    text: primitive.sage[300],
    border: 'rgba(122, 146, 122, 0.3)',
  },
  error: {
    base: primitive.ruby[500],
    hover: primitive.ruby[400],
    subtle: 'rgba(244, 63, 94, 0.15)',
    text: primitive.ruby[300],
    border: 'rgba(244, 63, 94, 0.3)',
  },
  warning: {
    base: primitive.gold[500],
    hover: primitive.gold[400],
    subtle: 'rgba(212, 181, 104, 0.15)',
    text: primitive.gold[300],
    border: 'rgba(212, 181, 104, 0.3)',
  },
  info: {
    base: primitive.sky[500],
    hover: primitive.sky[400],
    subtle: 'rgba(14, 165, 233, 0.15)',
    text: primitive.sky[300],
    border: 'rgba(14, 165, 233, 0.3)',
  },
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
export type CharcoalColor = keyof typeof primitive.charcoal;
export type GoldColor = keyof typeof primitive.gold;
export type SageColor = keyof typeof primitive.sage;
export type TerracottaColor = keyof typeof primitive.terracotta;
export type AmethystColor = keyof typeof primitive.amethyst;
export type AzulColor = keyof typeof primitive.azul;
export type SkyColor = keyof typeof primitive.sky;
export type RubyColor = keyof typeof primitive.ruby;
export type SemanticColor = keyof typeof semantic;
