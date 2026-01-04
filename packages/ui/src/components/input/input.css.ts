import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
});

export const fullWidth = style({
  width: '100%',
});

export const label = style({
  fontSize: globalTokens.font.size.sm,
  fontWeight: globalTokens.font.weight.medium,
  color: vars.color.semantic.foreground.secondary,
});

export const required = style({
  color: vars.color.semantic.error.base,
  marginLeft: vars.space[1],
});

export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const input = style({
  display: 'flex',
  height: vars.space[10],
  width: '100%',
  borderRadius: vars.radius.lg,
  border: `2px solid ${vars.color.semantic.border.default}`,
  backgroundColor: vars.color.semantic.background.base,
  paddingLeft: vars.space[3],
  paddingRight: vars.space[3],
  paddingTop: vars.space[2],
  paddingBottom: vars.space[2],
  fontSize: globalTokens.font.size.sm,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,

  '::placeholder': {
    color: vars.color.semantic.foreground.muted,
  },

  ':focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${vars.color.primitive.violet[400]}`,
    borderColor: 'transparent',
  },

  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: vars.color.semantic.border.strong,
    },
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
    backgroundColor: vars.color.semantic.background.muted,
  },
});

export const inputStates = styleVariants({
  default: {},
  error: {
    borderColor: vars.color.semantic.error.base,
    ':focus': {
      boxShadow: `0 0 0 2px ${vars.color.semantic.error.base}`,
    },
  },
  success: {
    borderColor: vars.color.semantic.success.base,
    ':focus': {
      boxShadow: `0 0 0 2px ${vars.color.semantic.success.base}`,
    },
  },
});

export const withLeftIcon = style({
  paddingLeft: vars.space[10],
});

export const withRightIcon = style({
  paddingRight: vars.space[10],
});

export const icon = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: vars.color.semantic.foreground.muted,
});

export const leftIcon = style({
  left: vars.space[3],
});

export const rightIcon = style({
  right: vars.space[3],
});

export const message = style({
  fontSize: globalTokens.font.size.sm,
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[1],
});

export const errorMessage = style({
  color: vars.color.semantic.error.text,
});

export const helperMessage = style({
  color: vars.color.semantic.foreground.tertiary,
});

export const errorIcon = style({
  height: '1rem',
  width: '1rem',
  flexShrink: 0,
});

