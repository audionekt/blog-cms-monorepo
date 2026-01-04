import { style } from '@vanilla-extract/css';
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

export const triggerWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const trigger = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: vars.space[10],
  width: "100%",
  borderRadius: vars.radius.lg,
  border: `2px solid ${vars.color.semantic.border.default}`,
  backgroundColor: vars.color.semantic.background.base,
  paddingLeft: vars.space[3],
  paddingRight: vars.space[10],
  paddingTop: vars.space[2],
  paddingBottom: vars.space[2],
  fontSize: globalTokens.font.size.sm,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
  cursor: "pointer",
  fontFamily: "inherit",
  color: vars.color.semantic.foreground.primary,
  textAlign: "left",

  ":focus": {
    outline: "none",
    boxShadow: `0 0 0 2px ${vars.color.primitive.violet[400]}`,
    borderColor: "transparent",
  },

  // selectors: {
  //   "&:hover:not(:disabled)": {
  //     borderColor: vars.color.semantic.border.strong,
  //   },
  // },

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
    backgroundColor: vars.color.semantic.background.muted,
  },
});

export const triggerPlaceholder = style({
  color: vars.color.semantic.foreground.muted,
});

export const dropdownIcon = style({
  position: "absolute",
  right: vars.space[3],
  top: "50%",
  transform: "translateY(-50%)",
  color: vars.color.semantic.foreground.muted,
  pointerEvents: "none",
  height: "1.25rem",
  width: "1.25rem",
  transition: `transform ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
});

export const dropdownIconOpen = style({
  transform: "translateY(-50%) rotate(180deg)",
});

// Floating menu styles
export const menu = style({
  zIndex: 1000,
  backgroundColor: vars.color.semantic.background.base,
  borderRadius: vars.radius.lg,
  // border: `1px solid ${vars.color.semantic.border.default}`,
  boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
  overflow: "hidden",
  minWidth: "200px",
  border: `1px solid ${vars.color.semantic.border.default}`,
  display: "flex",
  flexDirection: "column",
});

export const searchInput = style({
  padding: vars.space[3],
  border: "none",
  borderBottom: `1px solid ${vars.color.semantic.border.default}`,
  backgroundColor: vars.color.semantic.background.base,
  fontSize: globalTokens.font.size.sm,
  fontFamily: "inherit",
  color: vars.color.semantic.foreground.primary,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",

  "::placeholder": {
    color: vars.color.semantic.foreground.muted,
  },

  ":focus": {
    borderBottomColor: vars.color.primitive.violet[400],
  },
});

export const menuList = style({
  overflowY: "auto",
  overflowX: "hidden",
  maxHeight: "250px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space[2],
});

export const menuItem = style({
  display: "flex",
  alignItems: "center",
  padding: `${vars.space[2]} ${vars.space[3]}`,
  fontSize: globalTokens.font.size.base,
  color: vars.color.semantic.foreground.primary,
  cursor: "pointer",
  borderRadius: vars.radius.md,
  transition: `all ${vars.transition.duration.base} ${vars.transition.easing.inOut}`,
  userSelect: "none",
  gap: vars.space[3],
  minHeight: vars.space[10],
  fontWeight: globalTokens.font.weight.normal,
  position: "relative",
  width: "100%",
  backgroundColor: "transparent",
  textAlign: "left",

  ":hover": {
    backgroundColor: vars.color.semantic.background.subtle,
  },

  ":focus": {
    outline: "none",
    backgroundColor: vars.color.semantic.background.subtle,
  },

  ":focus-visible": {
    outline: "none",
  },

  selectors: {
    "&:active": {
      backgroundColor: vars.color.semantic.background.muted,
    },
  },
});

export const menuItemActive = style({
  backgroundColor: vars.color.semantic.background.subtle,
  fontWeight: globalTokens.font.weight.medium,
});

export const menuItemSelected = style({
  backgroundColor: vars.color.semantic.background.muted,
  fontWeight: globalTokens.font.weight.semibold,
  color: vars.color.semantic.brand.primary,
});

export const menuItemDisabled = style({
  opacity: 0.5,
  cursor: "not-allowed",

  ":hover": {
    backgroundColor: "transparent",
  },
});

export const checkbox = style({
  width: "1rem",
  height: "1rem",
  cursor: "pointer",
  flexShrink: 0,
});

export const emptyState = style({
  padding: `${vars.space[6]} ${vars.space[4]}`,
  textAlign: "center",
  color: vars.color.semantic.foreground.muted,
  fontSize: globalTokens.font.size.sm,
  fontStyle: "italic",
});
