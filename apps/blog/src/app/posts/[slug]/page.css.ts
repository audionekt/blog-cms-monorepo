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
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
});

// Hero Section - Clean minimal style
export const heroSection = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  padding: '8rem 1.5rem 3rem',
  borderBottom: '1px solid #e2e8f0',
  '@media': {
    '(min-width: 768px)': {
      padding: '10rem 2rem 4rem',
    },
  },
});

export const heroContent = style({
  maxWidth: '48rem',
  margin: '0 auto',
  width: '100%',
  animation: `${fadeIn} 0.8s ease-out`,
});

export const article = style({
  width: '100%',
  maxWidth: '48rem',
  margin: '0 auto',
  padding: '3rem 1.5rem',
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
  color: '#64748b',
});

export const loadingSpinner = style({
  width: '2.5rem',
  height: '2.5rem',
  border: '3px solid #e2e8f0',
  borderTopColor: '#6366f1',
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
  color: '#475569',
  padding: '2rem',
});

// Back Link
export const backLink = style({
  position: 'absolute',
  top: '2rem',
  left: '2rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'rgba(15, 23, 42, 0.7)',
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#0f172a',
  },
});

// Header (in hero)
export const header = style({
  marginBottom: 0,
});

export const tagsContainer = style({
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  marginBottom: '1rem',
});

export const categoryChip = style({
  padding: '0.25rem 0.75rem',
  fontSize: '0.6875rem',
  fontWeight: 600,
  color: '#6366f1',
  backgroundColor: '#f1f5f9',
  border: 'none',
  borderRadius: '0.25rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const title = style({
  fontSize: '2.25rem',
  fontWeight: 800,
  color: '#0f172a',
  lineHeight: 1.2,
  marginBottom: '1rem',
  letterSpacing: '-0.02em',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '3rem',
    },
  },
});

export const excerpt = style({
  fontSize: '1.0625rem',
  color: '#64748b',
  lineHeight: 1.7,
  marginBottom: '1.5rem',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.125rem',
    },
  },
});

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  paddingTop: '1.5rem',
  borderTop: '1px solid #e2e8f0',
});

export const authorInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
});

export const authorDetails = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.125rem',
  alignItems: 'flex-start',
});

export const authorName = style({
  fontWeight: 600,
  color: '#0f172a',
  fontSize: '0.875rem',
});

export const metaDetails = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#64748b',
  fontSize: '0.8125rem',
});

export const metaDot = style({
  color: '#cbd5e1',
});

// Featured Image (removed - now in hero)
export const featuredImageContainer = style({
  display: 'none',
});

export const featuredImage = style({
  display: 'none',
});

// Content
export const content = style({
  marginBottom: '3rem',
  marginTop: '3rem',
});

export const contentCard = style({
  backgroundColor: 'transparent',
  padding: 0,
});

export const markdown = style({
  color: '#475569',
  lineHeight: 1.8,
  fontSize: '1.0625rem',
});

// Typography
export const h1 = style({
  fontSize: '2rem',
  fontWeight: 700,
  color: '#0f172a',
  marginTop: '2.5rem',
  marginBottom: '1rem',
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
});

export const h2 = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#0f172a',
  marginTop: '2rem',
  marginBottom: '0.75rem',
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
  paddingBottom: '0.5rem',
  borderBottom: '2px solid #e2e8f0',
});

export const h3 = style({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1e293b',
  marginTop: '1.5rem',
  marginBottom: '0.5rem',
  lineHeight: 1.4,
});

export const paragraph = style({
  marginBottom: '1.25rem',
  color: '#475569',
});

export const bold = style({
  fontWeight: 600,
  color: '#0f172a',
});

export const link = style({
  color: '#6366f1',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#818cf8',
  },
});

// Lists
export const list = style({
  marginBottom: '1.25rem',
  paddingLeft: '1.5rem',
});

export const listItem = style({
  marginBottom: '0.5rem',
  color: '#475569',
  '::marker': {
    color: '#6366f1',
  },
});

// Code
export const codeBlock = style({
  marginBottom: '1.5rem',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
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
  backgroundColor: '#f1f5f9',
  color: '#6366f1',
  fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
  fontSize: '0.875em',
  border: '1px solid #e2e8f0',
});

// Blockquote
export const blockquote = style({
  marginBottom: '1.5rem',
  paddingLeft: '1.25rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  borderLeft: '4px solid #6366f1',
  fontStyle: 'italic',
  color: '#64748b',
  backgroundColor: '#f8fafc',
  borderRadius: '0 0.5rem 0.5rem 0',
});

// Images
export const figure = style({
  marginBottom: '2rem',
  marginTop: '2rem',
});

export const contentImage = style({
  width: '100%',
  height: 'auto',
  borderRadius: '0.75rem',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
  border: '1px solid #e2e8f0',
});

export const figcaption = style({
  marginTop: '0.75rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: '#64748b',
  fontStyle: 'italic',
});

// Footer
export const footer = style({
  paddingTop: '2rem',
  marginTop: '2rem',
  borderTop: '1px solid #e2e8f0',
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
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontSize: '0.75rem',
  fontWeight: 600,
});

export const footerActions = style({
  display: 'flex',
  gap: '0.75rem',
});

