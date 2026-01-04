import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';
import { globalTokens } from '../../styles/theme.css';

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[2],
  cursor: 'pointer',
  userSelect: 'none',
});

export const wrapperDisabled = style({
  cursor: 'not-allowed',
  opacity: 0.5,
});

export const checkboxInput = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});

export const checkboxBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.25rem',
  height: '1.25rem',
  borderRadius: vars.radius.sm,
  border: `2px solid ${vars.color.semantic.border.default}`,
  backgroundColor: vars.color.semantic.background.base,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
  flexShrink: 0,

  selectors: {
    [`${checkboxInput}:checked + &`]: {
      backgroundColor: vars.color.semantic.brand.primary,
      borderColor: vars.color.semantic.brand.primary,
    },
    [`${checkboxInput}:focus-visible + &`]: {
      outline: `2px solid ${vars.color.primitive.violet[400]}`,
      outlineOffset: '2px',
    },
    [`${checkboxInput}:disabled + &`]: {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    [`${wrapper}:hover ${checkboxInput}:not(:disabled):not(:checked) + &`]: {
      borderColor: vars.color.semantic.border.strong,
    },
  },
});

export const checkboxIcon = style({
  width: '0.875rem',
  height: '0.875rem',
  color: vars.color.semantic.foreground.onBrand,
  opacity: 0,
  transform: 'scale(0.5)',
  transition: `all ${vars.transition.duration.fast} ${vars.transition.easing.out}`,

  selectors: {
    [`${checkboxInput}:checked + ${checkboxBox} > &`]: {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
});

export const label = style({
  fontSize: globalTokens.font.size.base,
  fontWeight: globalTokens.font.weight.normal,
  color: vars.color.semantic.foreground.primary,
  lineHeight: globalTokens.font.lineHeight.normal,
});

