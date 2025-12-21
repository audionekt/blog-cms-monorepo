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
    linear-gradient(180deg,
      rgba(10, 10, 20, 0.1) 0%,
      rgba(10, 10, 20, 0.3) 30%,
      rgba(10, 10, 20, 0.6) 50%,
      rgba(10, 10, 20, 0.85) 70%,
      rgba(10, 10, 20, 0.95) 100%
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

// Hero Section - Split Layout
export const heroSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  padding: '4rem 1.5rem',
  width: '100%',
  maxWidth: '80rem',
  margin: '0 auto',
  '@media': {
    '(min-width: 1024px)': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6rem 3rem',
      gap: '4rem',
    },
  },
});

export const heroLeft = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  maxWidth: '32rem',
  animation: `${fadeIn} 0.8s ease-out`,
});

export const heroTitle = style({
  fontSize: '3.5rem',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #a78bfa 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  letterSpacing: '-0.05em',
  lineHeight: 0.95,
  filter: 'drop-shadow(0 4px 24px rgba(167, 139, 250, 0.5))',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '5rem',
    },
    '(min-width: 1024px)': {
      fontSize: '6.5rem',
    },
  },
});

export const heroSubtitle = style({
  fontSize: '1.25rem',
  color: 'rgba(255, 255, 255, 0.9)',
  lineHeight: 1.5,
  fontWeight: 500,
  textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.5rem',
    },
  },
});

// Search - Large underline style
export const searchContainer = style({
  position: 'relative',
  width: '100%',
  maxWidth: '32rem',
  marginTop: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.25rem 1.75rem',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '2px solid rgba(167, 139, 250, 0.3)',
  borderRadius: '2rem',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  ':focus-within': {
    borderColor: 'rgba(167, 139, 250, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 12px 40px rgba(167, 139, 250, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  },
  '@media': {
    '(min-width: 768px)': {
      marginTop: '2.5rem',
      padding: '1.5rem 2rem',
    },
  },
});

export const searchIcon = style({
  color: 'rgba(167, 139, 250, 0.7)',
  flexShrink: 0,
  transition: 'color 0.3s ease',
  selectors: {
    [`${searchContainer}:focus-within &`]: {
      color: '#c4b5fd',
    },
  },
});

export const searchInput = style({
  flex: 1,
  padding: '0',
  fontSize: '1.125rem',
  fontWeight: 500,
  color: '#fff',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  '::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
});

// Hero Right - Featured Card
export const heroRight = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  animation: `${fadeIn} 0.8s ease-out 0.2s both`,
  '@media': {
    '(min-width: 1024px)': {
      justifyContent: 'flex-end',
    },
  },
});

export const featuredCardLink = style({
  textDecoration: 'none',
  display: 'block',
  width: '100%',
  maxWidth: '24rem',
});

export const featuredCard = style({
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(30px) saturate(180%)',
  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '1.25rem',
  overflow: 'hidden',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
  },
});

export const featuredImageContainer = style({
  position: 'relative',
  width: '100%',
  height: '14rem',
  overflow: 'hidden',
});

export const featuredImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
  selectors: {
    [`${featuredCardLink}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const featuredBadge = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
});

export const featuredContent = style({
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const featuredTitle = style({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: 1.3,
  margin: 0,
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
});

export const featuredExcerpt = style({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.85)',
  lineHeight: 1.6,
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
});

export const featuredMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
  marginTop: '0.5rem',
});

export const featuredAuthor = style({
  fontSize: '0.8125rem',
  color: 'rgba(255, 255, 255, 0.75)',
  fontWeight: 500,
  textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
});

export const featuredPlaceholder = style({
  width: '100%',
  maxWidth: '24rem',
  height: '20rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '1rem',
  border: '1px dashed rgba(255, 255, 255, 0.2)',
});

// Divider
export const divider = style({
  width: '100%',
  maxWidth: '80rem',
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
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
  },
});

// Main Content
export const mainContent = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '3rem 1.5rem 4rem',
  '@media': {
    '(min-width: 1024px)': {
      padding: '4rem 3rem 6rem',
    },
  },
});

export const sectionTitle = style({
  fontSize: '1rem',
  position: 'relative',
  top: '-1rem',
  fontWeight: 700,
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  marginBottom: '2rem',
  padding: '0.875rem 2rem',
  background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(196, 181, 253, 0.3))',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '9999px',
  border: '2px solid rgba(167, 139, 250, 0.6)',
  width: 'fit-content',
  boxShadow: '0 8px 24px rgba(167, 139, 250, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
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
  backgroundColor: 'rgba(25, 25, 40, 0.8)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '1rem',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  ':hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    borderColor: 'rgba(167, 139, 250, 0.3)',
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
  background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
});

export const postImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
  selectors: {
    [`${postCardLink}:hover &`]: {
      transform: 'scale(1.08)',
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
  color: 'rgba(167, 139, 250, 0.9)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const postTitle = style({
  fontSize: '1.0625rem',
  fontWeight: 700,
  color: '#f0f0f5',
  lineHeight: 1.4,
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transition: 'color 0.2s ease',
  selectors: {
    [`${postCardLink}:hover &`]: {
      color: '#c4b5fd',
    },
  },
});

export const postExcerpt = style({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.5)',
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
});

export const authorName = style({
  fontSize: '0.8125rem',
  color: 'rgba(255, 255, 255, 0.6)',
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
  border: '3px solid rgba(255, 255, 255, 0.1)',
  borderTopColor: '#a78bfa',
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,
});

export const errorBox = style({
  padding: '1.5rem',
  backgroundColor: 'rgba(239, 68, 68, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '0.75rem',
  textAlign: 'center',
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
  color: 'rgba(255, 255, 255, 0.7)',
  backgroundColor: 'rgba(20, 20, 35, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '1rem',
});

// Pagination
export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.5rem 0',
  marginTop: '2rem',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});

export const paginationButtons = style({
  display: 'flex',
  gap: '0.75rem',
});

// Legacy exports (kept for backwards compatibility)
export const outerContainer = style({});
export const header = style({});
export const heroOverlay = style({});
export const heroContent = style({});
export const featuredSection = style({});
export const featuredLink = style({});
export const featuredOverlay = style({});
export const metaDot = style({});
export const postsSection = style({});
export const tagsContainer = style({});
export const metaItem = style({});
export const postHeader = style({});
export const featuredChip = style({});
export const postsContainer = style({});
export const postsColumn = style({});
export const authorInfo = style({});
export const publishDate = style({});
