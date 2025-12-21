import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

// Layout
export const container = style({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  display: 'flex',
  justifyContent: 'center',
});

export const article = style({
  width: '100%',
  maxWidth: '48rem',
  padding: '3rem 1.5rem',
  animation: `${fadeIn} 0.5s ease-out`,
  '@media': {
    '(min-width: 768px)': {
      padding: '4rem 2rem',
    },
  },
});

// Loading & Error
export const loadingContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  minHeight: '60vh',
  color: 'rgba(255, 255, 255, 0.6)',
});

export const loadingSpinner = style({
  width: '2.5rem',
  height: '2.5rem',
  border: '3px solid rgba(255, 255, 255, 0.1)',
  borderTopColor: '#a78bfa',
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

export const errorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  minHeight: '60vh',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.8)',
  padding: '2rem',
});

// Back Link
export const backLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'rgba(255, 255, 255, 0.5)',
  textDecoration: 'none',
  fontSize: '0.875rem',
  marginBottom: '2rem',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#a78bfa',
  },
});

// Header
export const header = style({
  marginBottom: '2.5rem',
});

export const tagsContainer = style({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  marginBottom: '1rem',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 800,
  color: '#fff',
  lineHeight: 1.2,
  marginBottom: '1rem',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '2.75rem',
    },
  },
});

export const excerpt = style({
  fontSize: '1.25rem',
  color: 'rgba(255, 255, 255, 0.6)',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
});

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '1.5rem',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});

export const authorInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const authorDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const authorName = style({
  fontWeight: 600,
  color: '#fff',
  fontSize: '0.9375rem',
});

export const metaDetails = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '0.875rem',
});

export const metaDot = style({
  color: 'rgba(255, 255, 255, 0.2)',
});

// Featured Image
export const featuredImageContainer = style({
  marginBottom: '2.5rem',
  borderRadius: '1rem',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
});

export const featuredImage = style({
  width: '100%',
  height: 'auto',
  display: 'block',
});

// Content
export const content = style({
  marginBottom: '3rem',
});

export const markdown = style({
  color: 'rgba(255, 255, 255, 0.85)',
  lineHeight: 1.8,
  fontSize: '1.0625rem',
});

// Typography
export const h1 = style({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  marginTop: '2.5rem',
  marginBottom: '1rem',
  lineHeight: 1.3,
});

export const h2 = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  marginTop: '2rem',
  marginBottom: '0.75rem',
  lineHeight: 1.3,
  paddingBottom: '0.5rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

export const h3 = style({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#fff',
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
  lineHeight: 1.4,
});

export const paragraph = style({
  marginBottom: '1.25rem',
  color: 'rgba(255, 255, 255, 0.8)',
});

export const bold = style({
  fontWeight: 600,
  color: '#fff',
});

export const link = style({
  color: '#a78bfa',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#c4b5fd',
  },
});

// Lists
export const list = style({
  marginBottom: '1.25rem',
  paddingLeft: '1.5rem',
});

export const listItem = style({
  marginBottom: '0.5rem',
  color: 'rgba(255, 255, 255, 0.8)',
  '::marker': {
    color: '#a78bfa',
  },
});

// Code
export const codeBlock = style({
  marginBottom: '1.5rem',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
});

export const code = style({
  display: 'block',
  padding: '1.25rem',
  fontSize: '0.875rem',
  lineHeight: 1.7,
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
  color: '#e2e8f0',
  overflowX: 'auto',
  whiteSpace: 'pre',
});

export const inlineCode = style({
  padding: '0.125rem 0.375rem',
  borderRadius: '0.25rem',
  backgroundColor: 'rgba(167, 139, 250, 0.15)',
  color: '#c4b5fd',
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
  fontSize: '0.875em',
});

// Blockquote
export const blockquote = style({
  marginBottom: '1.5rem',
  paddingLeft: '1.25rem',
  borderLeft: '3px solid #a78bfa',
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.7)',
});

// Images
export const figure = style({
  marginBottom: '1.5rem',
});

export const contentImage = style({
  width: '100%',
  height: 'auto',
  borderRadius: '0.75rem',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
});

export const figcaption = style({
  marginTop: '0.75rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.5)',
  fontStyle: 'italic',
});

// Footer
export const footer = style({
  paddingTop: '2rem',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  '@media': {
    '(min-width: 640px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  },
});

export const footerTags = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const footerLabel = style({
  color: 'rgba(255, 255, 255, 0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontSize: '0.75rem',
});

export const footerActions = style({
  display: 'flex',
  gap: '0.75rem',
});

