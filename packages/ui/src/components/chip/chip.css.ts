import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[1],
  borderRadius: vars.radius.full,
  fontWeight: globalTokens.font.weight.medium,
  whiteSpace: 'nowrap',
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
  border: '1px solid transparent',
});

export const clickable = style({
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});

export const sizes = styleVariants({
  sm: {
    height: vars.space[5],
    paddingLeft: vars.space[2],
    paddingRight: vars.space[2],
    fontSize: globalTokens.font.size.xs,
  },
  md: {
    height: vars.space[6],
    paddingLeft: vars.space[3],
    paddingRight: vars.space[3],
    fontSize: globalTokens.font.size.sm,
  },
  lg: {
    height: vars.space[8],
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    fontSize: globalTokens.font.size.base,
  },
});

export const variants = styleVariants({
  default: {
    backgroundColor: vars.color.semantic.background.muted,
    color: vars.color.semantic.foreground.primary,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: vars.color.semantic.border.default,
    color: vars.color.semantic.foreground.secondary,
  },
  featured: {
    backgroundColor: vars.color.primitive.amber[100],
    color: vars.color.primitive.amber[700],
  },
  success: {
    backgroundColor: vars.color.semantic.success.subtle,
    color: vars.color.semantic.success.text,
  },
  warning: {
    backgroundColor: vars.color.semantic.warning.subtle,
    color: vars.color.semantic.warning.text,
  },
  error: {
    backgroundColor: vars.color.semantic.error.subtle,
    color: vars.color.semantic.error.text,
  },
});

export const colors = styleVariants({
  violet: {
    backgroundColor: vars.color.primitive.violet[100],
    color: vars.color.primitive.violet[700],
  },
  emerald: {
    backgroundColor: vars.color.primitive.emerald[100],
    color: vars.color.primitive.emerald[600],
  },
  rose: {
    backgroundColor: vars.color.primitive.rose[50],
    color: vars.color.primitive.rose[600],
  },
  amber: {
    backgroundColor: vars.color.primitive.amber[100],
    color: vars.color.primitive.amber[700],
  },
  slate: {
    backgroundColor: vars.color.primitive.slate[200],
    color: vars.color.primitive.slate[700],
  },
});

export const dismissButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: vars.space[1],
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  borderRadius: vars.radius.full,
  opacity: 0.6,
  transition: `opacity ${vars.transition.duration.fast} ${vars.transition.easing.inOut}`,
  
  ':hover': {
    opacity: 1,
  },
});
