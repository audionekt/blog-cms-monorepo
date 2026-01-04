import { style } from '@vanilla-extract/css';

export const nav = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
});

export const navContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '1rem 1.5rem',
  '@media': {
    '(min-width: 1024px)': {
      padding: '1.25rem 3rem',
    },
  },
});

export const logo = style({
  fontSize: '1.125rem',
  fontWeight: 800,
  color: '#0f172a',
  textDecoration: 'none',
  letterSpacing: '-0.02em',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#6366f1',
  },
});

export const navLinks = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
});

export const navLink = style({
  fontSize: '0.9375rem',
  fontWeight: 500,
  color: '#64748b',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#0f172a',
  },
});

export const navLinkActive = style({
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: '#0f172a',
  textDecoration: 'none',
});

export const ctaButton = style({
  padding: '0.5rem 1.25rem',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#ffffff',
  backgroundColor: '#0f172a',
  border: 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#1e293b',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

