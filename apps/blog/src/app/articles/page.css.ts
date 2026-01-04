import { style, keyframes } from '@vanilla-extract/css';

// Animations
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeInUp = keyframes({
  from: { opacity: 0, transform: 'translateY(30px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const bgFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

// Page wrapper with fixed background
export const pageWrapper = style({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
});

// Blur placeholder - loads instantly (1KB)
export const backgroundBlur = style({
  position: 'fixed',
  inset: 0,
  backgroundImage: 'url(/clouds-blur.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  filter: 'blur(20px)',
  transform: 'scale(1.1)', // Prevent blur edges showing
  zIndex: 0,
});

// Full image - fades in after load (110KB)
export const backgroundImage = style({
  position: 'fixed',
  inset: 0,
  backgroundImage: 'url(/clouds-optimized.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: 0,
  animation: `${bgFadeIn} 0.5s ease-out`,
});

export const backgroundOverlay = style({
  position: 'fixed',
  inset: 0,
  background: `
    radial-gradient(circle at 20% 30%, rgba(167, 139, 250, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 40% 70%, rgba(196, 181, 253, 0.03) 0%, transparent 50%),
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.97) 0%,
      rgba(255, 255, 255, 0.95) 50%,
      rgba(255, 255, 255, 0.93) 100%
    )
  `,
  zIndex: 1,
});

export const contentLayer = style({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

// Hero Section - Centered Layout
export const heroSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  padding: '5rem 1.5rem 3rem',
  width: '100%',
  maxWidth: '90rem',
  margin: '0 auto',
  '@media': {
    '(min-width: 1024px)': {
      padding: '8rem 3rem 4rem',
      gap: '4rem',
    },
  },
});

export const heroContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  maxWidth: '56rem',
  textAlign: 'center',
  animation: `${fadeIn} 0.8s ease-out`,
});

export const heroTitle = style({
  fontSize: '2.5rem',
  fontWeight: 900,
  color: '#0f172a',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  margin: 0,
  '@media': {
    '(min-width: 768px)': {
      fontSize: '3.5rem',
    },
    '(min-width: 1024px)': {
      fontSize: '4.5rem',
    },
  },
});

export const heroSubtitle = style({
  fontSize: '1.125rem',
  color: '#475569',
  lineHeight: 1.6,
  fontWeight: 400,
  margin: 0,
  maxWidth: '48rem',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
});

// Search - Clean design system style
export const searchWrapper = style({
  width: '100%',
  maxWidth: '48rem',
  marginTop: '2rem',
  '@media': {
    '(min-width: 768px)': {
      marginTop: '2.5rem',
    },
  },
});

export const searchInput = style({
  fontSize: '1rem !important',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.0625rem !important',
    },
  },
});

// Popular categories section
export const popularSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '1.5rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const popularLabel = style({
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: '#64748b',
});

export const popularTags = style({
  display: 'flex',
  gap: '0.625rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const popularTag = style({
  padding: '0.5rem 1rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#475569',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    color: '#1e293b',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

// Divider
export const divider = style({
  width: '100%',
  maxWidth: '90rem',
  margin: '0 auto',
  padding: '0 1.5rem',
  '@media': {
    '(min-width: 1024px)': {
      padding: '0 3rem',
    },
  },
  '::after': {
    content: '""',
    display: 'block',
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
  },
});

// Main Content
export const mainContent = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '90rem',
  margin: '0 auto',
  padding: '3rem 1.5rem 4rem',
  '@media': {
    '(min-width: 1024px)': {
      padding: '4rem 3rem 6rem',
    },
  },
});

export const sectionTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '2.5rem',
  letterSpacing: '-0.01em',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.75rem',
    },
  },
});

// Posts Grid
export const postsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem',
  '@media': {
    '(min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const postCardLink = style({
  textDecoration: 'none',
  display: 'block',
  animation: `${fadeInUp} 0.6s ease-out both`,
  selectors: {
    '&:nth-child(1)': { animationDelay: '0.1s' },
    '&:nth-child(2)': { animationDelay: '0.15s' },
    '&:nth-child(3)': { animationDelay: '0.2s' },
    '&:nth-child(4)': { animationDelay: '0.25s' },
    '&:nth-child(5)': { animationDelay: '0.3s' },
    '&:nth-child(6)': { animationDelay: '0.35s' },
  },
});

export const postCard = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
    borderColor: '#cbd5e1',
  },
});

export const postImageContainer = style({
  position: 'relative',
  width: '100%',
  height: '10rem',
  overflow: 'hidden',
});

export const postImagePlaceholder = style({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
});

export const postImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
  selectors: {
    [`${postCardLink}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const postCardContent = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
  padding: '1.25rem',
});

export const readingTime = style({
  fontSize: '0.75rem',
  color: '#6366f1',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const postTitle = style({
  fontSize: '1.0625rem',
  fontWeight: 700,
  color: '#1e293b',
  lineHeight: 1.4,
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transition: 'color 0.2s ease',
  selectors: {
    [`${postCardLink}:hover &`]: {
      color: '#6366f1',
    },
  },
});

export const postExcerpt = style({
  fontSize: '0.875rem',
  color: '#64748b',
  lineHeight: 1.6,
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const postMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: 'auto',
  paddingTop: '0.75rem',
  borderTop: '1px solid #f1f5f9',
});

export const authorName = style({
  fontSize: '0.8125rem',
  color: '#64748b',
  fontWeight: 500,
});

// Loading & Error States
export const loadingContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '4rem 0',
});

export const loadingSpinner = style({
  width: '2.5rem',
  height: '2.5rem',
  border: '3px solid #e2e8f0',
  borderTopColor: '#6366f1',
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

export const errorBox = style({
  padding: '1.5rem',
  backgroundColor: '#fff1f2',
  border: '1px solid #fda4af',
  borderRadius: '0.75rem',
  textAlign: 'center',
  color: '#e11d48',
});

// Empty State
export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '4rem 2rem',
  textAlign: 'center',
  color: '#64748b',
  backgroundColor: '#f8fafc',
  borderRadius: '1rem',
  border: '1px solid #e2e8f0',
});

// Pagination
export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.5rem 0',
  marginTop: '2rem',
  borderTop: '1px solid #e2e8f0',
});

export const paginationButtons = style({
  display: 'flex',
  gap: '0.75rem',
});
