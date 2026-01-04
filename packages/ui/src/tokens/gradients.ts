// Nexus Gradient System

import { primitive } from './colors';

export const background = {
  subtle: `linear-gradient(135deg, ${primitive.slate[50]} 0%, ${primitive.slate[100]} 100%)`,
  muted: `linear-gradient(135deg, ${primitive.slate[100]} 0%, ${primitive.slate[200]} 100%)`,
  warm: `linear-gradient(135deg, ${primitive.violet[50]} 0%, ${primitive.violet[100]} 100%)`,
} as const;

export const brand = {
  primary: `linear-gradient(135deg, ${primitive.violet[400]} 0%, ${primitive.violet[600]} 100%)`,
  accent: `linear-gradient(135deg, ${primitive.violet[300]} 0%, ${primitive.violet[500]} 100%)`,
  hero: `linear-gradient(135deg, ${primitive.violet[600]} 0%, ${primitive.violet[400]} 50%, ${primitive.violet[600]} 100%)`,
  subtle: `linear-gradient(135deg, ${primitive.violet[50]} 0%, ${primitive.violet[200]} 100%)`,
} as const;

export const overlay = {
  dark: `linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.75) 100%)`,
  light: `linear-gradient(180deg, rgba(248, 250, 252, 0) 0%, rgba(248, 250, 252, 0.95) 100%)`,
} as const;

export const mesh = {
  warm: `radial-gradient(at 27% 37%, rgba(99, 102, 241, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(129, 140, 248, 0.12) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(79, 70, 229, 0.1) 0px, transparent 50%)`,
  subtle: `radial-gradient(at 40% 20%, rgba(238, 242, 255, 0.9) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(199, 210, 254, 0.7) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(248, 250, 252, 1) 0px, transparent 50%)`,
} as const;

export const shimmer = {
  violet: `linear-gradient(90deg, transparent 0%, rgba(248, 250, 252, 0.4) 50%, transparent 100%)`,
  light: `linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.25) 50%, transparent 100%)`,
} as const;

export const text = {
  violet: `linear-gradient(135deg, ${primitive.violet[400]} 0%, ${primitive.violet[600]} 100%)`,
  subtle: `linear-gradient(135deg, ${primitive.slate[500]} 0%, ${primitive.slate[700]} 100%)`,
  hero: `linear-gradient(135deg, ${primitive.violet[600]} 0%, ${primitive.violet[300]} 50%, ${primitive.violet[600]} 100%)`,
} as const;

export const success = {
  subtle: `linear-gradient(135deg, ${primitive.emerald[50]} 0%, ${primitive.emerald[100]} 100%)`,
  base: `linear-gradient(135deg, ${primitive.emerald[500]} 0%, ${primitive.emerald[600]} 100%)`,
} as const;

export const error = {
  subtle: `linear-gradient(135deg, ${primitive.rose[50]} 0%, rgba(254, 205, 211, 1) 100%)`,
  base: `linear-gradient(135deg, ${primitive.rose[500]} 0%, ${primitive.rose[600]} 100%)`,
} as const;

export const warning = {
  subtle: `linear-gradient(135deg, ${primitive.amber[100]} 0%, rgba(253, 230, 138, 1) 100%)`,
  base: `linear-gradient(135deg, ${primitive.amber[500]} 0%, ${primitive.amber[600]} 100%)`,
} as const;

// Combined gradients export
export const gradients = {
  background,
  brand,
  overlay,
  mesh,
  shimmer,
  text,
  success,
  error,
  warning,
} as const;

// Export types for type safety
export type GradientToken = typeof gradients;
export type BackgroundGradient = keyof typeof background;
export type BrandGradient = keyof typeof brand;
export type OverlayGradient = keyof typeof overlay;
export type MeshGradient = keyof typeof mesh;
export type ShimmerGradient = keyof typeof shimmer;
export type TextGradient = keyof typeof text;
