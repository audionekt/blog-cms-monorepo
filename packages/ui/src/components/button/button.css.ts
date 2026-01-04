import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  borderRadius: vars.radius.sm,
  fontWeight: globalTokens.font.weight.semibold,
  fontFamily: globalTokens.font.family.sans,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
  cursor: 'pointer',
  border: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  
  ':disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
});

// Variant styles
export const variants = styleVariants({
  primary: {
    backgroundColor: vars.color.semantic.brand.primary,
    color: vars.color.semantic.foreground.onBrand,
    boxShadow: vars.shadow.sm,
    
    ':hover': {
      backgroundColor: vars.color.semantic.brand.primaryHover,
      boxShadow: vars.shadow.md,
    },
    
    ':active': {
      backgroundColor: vars.color.semantic.brand.primaryActive,
    },
    
    ':focus-visible': {
      outline: `3px solid ${vars.color.primitive.violet[400]}`,
      outlineOffset: '2px',
    },
  },
  secondary: {
    backgroundColor: 'transparent',
    color: vars.color.semantic.foreground.primary,
    border: `2px solid ${vars.color.semantic.border.default}`,
    
    ':hover': {
      backgroundColor: vars.color.semantic.background.subtle,
      borderColor: vars.color.semantic.border.strong,
      color: vars.color.semantic.foreground.primary,
    },
    
    ':active': {
      backgroundColor: vars.color.semantic.background.muted,
      borderColor: vars.color.semantic.border.strong,
    },
    
    ':focus-visible': {
      outline: `3px solid ${vars.color.primitive.violet[400]}`,
      outlineOffset: '2px',
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.color.semantic.foreground.secondary,
    
    ':hover': {
      backgroundColor: vars.color.semantic.background.subtle,
      color: vars.color.semantic.foreground.primary,
    },
    
    ':active': {
      backgroundColor: vars.color.semantic.background.muted,
      color: vars.color.semantic.foreground.primary,
    },
    
    ':focus-visible': {
      outline: `3px solid ${vars.color.primitive.violet[400]}`,
      outlineOffset: '2px',
    },
  },
  danger: {
    backgroundColor: vars.color.semantic.error.base,
    color: vars.color.semantic.foreground.onBrand,
    boxShadow: vars.shadow.sm,
    
    ':hover': {
      backgroundColor: vars.color.semantic.error.hover,
      boxShadow: vars.shadow.md,
    },
    
    ':active': {
      backgroundColor: vars.color.semantic.error.text,
    },
    
    ':focus-visible': {
      outline: `3px solid ${vars.color.primitive.rose[400]}`,
      outlineOffset: '2px',
    },
  },
  success: {
    backgroundColor: vars.color.semantic.success.base,
    color: vars.color.semantic.foreground.onBrand,
    boxShadow: vars.shadow.sm,
    
    ':hover': {
      backgroundColor: vars.color.semantic.success.hover,
      boxShadow: vars.shadow.md,
    },
    
    ':active': {
      backgroundColor: vars.color.semantic.success.text,
    },
    
    ':focus-visible': {
      outline: `3px solid ${vars.color.primitive.emerald[400]}`,
      outlineOffset: '2px',
    },
  },
});

// Size variants
export const sizes = styleVariants({
  sm: {
    height: vars.space[6],
    paddingLeft: vars.space[2],
    paddingRight: vars.space[2],
    fontSize: globalTokens.font.size.sm,
  },
  md: {
    height: vars.space[8],
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
    fontSize: globalTokens.font.size.sm,
  },
  lg: {
    height: vars.space[10],
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    fontSize: globalTokens.font.size.base,
  },
  xl: {
    height: vars.space[16],
    paddingLeft: vars.space[8],
    paddingRight: vars.space[8],
    fontSize: globalTokens.font.size.lg,
  },
});

export const fullWidth = style({
  width: '100%',
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const loadingSpinner = style({
  animation: `${spin} 1s linear infinite`,
  height: '1rem',
  width: '1rem',
});

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

