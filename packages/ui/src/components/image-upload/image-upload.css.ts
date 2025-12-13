import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../styles/contract.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],
});

export const dropzone = style({
  border: `2px dashed ${vars.color.semantic.border.default}`,
  borderRadius: vars.radius.lg,
  padding: vars.space[8],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[3],
  cursor: 'pointer',
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
  backgroundColor: vars.color.semantic.background.subtle,
  minHeight: '200px',
  ':hover': {
    borderColor: vars.color.semantic.brand.primary,
    backgroundColor: vars.color.semantic.background.muted,
  },
});

export const dropzoneActive = style({
  borderColor: vars.color.semantic.brand.primary,
  backgroundColor: vars.color.semantic.background.muted,
  borderStyle: 'solid',
});

export const dropzoneDisabled = style({
  opacity: 0.6,
  cursor: 'not-allowed',
  ':hover': {
    borderColor: vars.color.semantic.border.default,
    backgroundColor: vars.color.semantic.background.subtle,
  },
});

export const icon = style({
  width: '48px',
  height: '48px',
  color: vars.color.semantic.foreground.tertiary,
});

export const text = style({
  textAlign: 'center',
});

export const hiddenInput = style({
  display: 'none',
});

export const preview = style({
  position: 'relative',
  borderRadius: vars.radius.lg,
  overflow: 'hidden',
  backgroundColor: vars.color.semantic.background.muted,
});

export const previewImage = style({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
  objectFit: 'cover',
  display: 'block',
});

export const previewOverlay = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  opacity: 0,
  transition: `opacity ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
  selectors: {
    [`${preview}:hover &`]: {
      opacity: 1,
    },
  },
});

export const removeButton = style({
  position: 'absolute',
  top: vars.space[2],
  right: vars.space[2],
  backgroundColor: vars.color.semantic.error.base,
  color: 'white',
  border: 'none',
  borderRadius: vars.radius.full,
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: `all ${vars.transition.duration.fast} ${vars.transition.easing.inOut}`,
  ':hover': {
    backgroundColor: vars.color.semantic.error.hover,
    transform: 'scale(1.1)',
  },
});

export const uploadingOverlay = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const spinner = style({
  width: '32px',
  height: '32px',
  border: '3px solid',
  borderColor: vars.color.semantic.border.default,
  borderTopColor: vars.color.semantic.brand.primary,
  borderRadius: vars.radius.full,
  animation: `${spin} 1s linear infinite`,
});

export const error = style({
  color: vars.color.semantic.error.text,
  fontSize: '0.875rem',
  marginTop: vars.space[1],
});

export const fileInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  padding: vars.space[2],
  backgroundColor: vars.color.semantic.background.muted,
  borderRadius: vars.radius.md,
  fontSize: '0.875rem',
  color: vars.color.semantic.foreground.secondary,
});

