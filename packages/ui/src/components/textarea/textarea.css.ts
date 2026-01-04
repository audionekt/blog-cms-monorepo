import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';
import * as inputStyles from '../input/input.css';

// Reuse input styles for consistency
export const wrapper = inputStyles.wrapper;
export const fullWidth = inputStyles.fullWidth;
export const label = inputStyles.label;
export const required = inputStyles.required;
export const message = inputStyles.message;
export const errorMessage = inputStyles.errorMessage;
export const helperMessage = inputStyles.helperMessage;
export const errorIcon = inputStyles.errorIcon;
export const inputStates = inputStyles.inputStates;

export const textarea = style({
  display: 'flex',
  minHeight: '80px',
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
  fontFamily: 'inherit',

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

export const resize = styleVariants({
  none: { resize: 'none' },
  vertical: { resize: 'vertical' },
  horizontal: { resize: 'horizontal' },
  both: { resize: 'both' },
});

