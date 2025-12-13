import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const container = style({
  minHeight: '100vh',
  backgroundColor: '#f9fafb',
});

export const header = style({
  backgroundColor: 'white',
  borderBottom: '1px solid #e5e7eb',
});

export const headerInner = style({
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '2rem 1.5rem',
});

export const headerTop = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '2rem',
});

export const headerTitles = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const statsBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1.5rem',
  backgroundColor: '#f9fafb',
  borderRadius: '0.5rem',
  border: '1px solid #e5e7eb',
  padding: '0.75rem 0',
});

export const statItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  flex: 1,
  padding: '0 1rem',
});

export const statItemIconBlue = style({
  color: '#2563eb',
});

export const statItemIconGreen = style({
  color: '#16a34a',
});

export const statItemIconGray = style({
  color: '#6b7280',
});

export const statItemIconYellow = style({
  color: '#ca8a04',
});

export const statItemValue = style({
  fontWeight: 600,
  fontSize: '1rem',
  color: '#111827',
});

export const statItemLabel = style({
  fontSize: '0.875rem',
  color: '#6b7280',
});

export const statDivider = style({
  width: '1px',
  height: '24px',
  backgroundColor: '#e5e7eb',
});

export const content = style({
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '2rem 1.5rem',
});

export const loadingContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5rem 0',
});

export const loadingInner = style({
  textAlign: 'center',
});

export const spinner = style({
  width: '3rem',
  height: '3rem',
  border: '4px solid #2563eb',
  borderTopColor: 'transparent',
  borderRadius: '9999px',
  margin: '0 auto 1rem',
  animation: `${spin} 1s linear infinite`,
});

export const emptyState = style({
  maxWidth: '28rem',
  margin: '0 auto',
  textAlign: 'center',
});

export const emptyIconWrapper = style({
  width: '64px',
  height: '64px',
  borderRadius: '16px',
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
});

export const svgIcon = style({
  width: '1.25rem',
  height: '1.25rem',
});

export const errorIcon = style({
  width: '1.5rem',
  height: '1.5rem',
  flexShrink: 0,
});
