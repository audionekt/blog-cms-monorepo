import { style, keyframes } from '@vanilla-extract/css';

// Animations
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

// Background layers
export const backgroundBlur = style({
  position: 'fixed',
  inset: 0,
  backgroundImage: 'url(/clouds-blur.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  filter: 'blur(20px)',
  transform: 'scale(1.1)',
  zIndex: 0,
});

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
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.96) 50%,
      rgba(255, 255, 255, 0.94) 100%
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

// Hero Section
export const heroSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
  padding: '6rem 1.5rem 4rem',
  width: '100%',
  maxWidth: '80rem',
  margin: '0 auto',
  '@media': {
    '(min-width: 1024px)': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10rem 3rem 6rem',
      gap: '5rem',
    },
  },
});

export const heroContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.5rem',
  flex: 1,
  maxWidth: '42rem',
  animation: `${fadeIn} 0.8s ease-out`,
  '@media': {
    '(max-width: 1023px)': {
      alignItems: 'center',
      textAlign: 'center',
    },
  },
});

export const heroTitle = style({
  fontSize: '2.5rem',
  fontWeight: 900,
  color: '#0f172a',
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  margin: 0,
  '@media': {
    '(min-width: 768px)': {
      fontSize: '3.5rem',
    },
    '(min-width: 1024px)': {
      fontSize: '4rem',
    },
  },
});

export const heroTitleAccent = style({
  fontStyle: 'italic',
  color: '#64748b',
  fontWeight: 400,
});

export const heroSubtitle = style({
  fontSize: '1.0625rem',
  color: '#475569',
  lineHeight: 1.7,
  fontWeight: 400,
  margin: 0,
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.125rem',
    },
  },
});

// Portrait Image
export const heroImageContainer = style({
  position: 'relative',
  width: '100%',
  maxWidth: '22rem',
  height: '28rem',
  flexShrink: 0,
  animation: `${fadeIn} 0.8s ease-out 0.2s both`,
  '@media': {
    '(min-width: 768px)': {
      maxWidth: '24rem',
      height: '32rem',
    },
    '(min-width: 1024px)': {
      maxWidth: '26rem',
      height: '34rem',
    },
  },
});

export const heroImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center 20%',
  borderRadius: '1rem',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  '@media': {
    '(min-width: 768px)': {
      borderRadius: '1.25rem',
    },
  },
});

// CTA Buttons
export const ctaButtons = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
  flexWrap: 'wrap',
  '@media': {
    '(max-width: 1023px)': {
      justifyContent: 'center',
    },
  },
});

export const primaryCta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const secondaryCta = style({});

// Social Links
export const socialLinks = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1.5rem',
  '@media': {
    '(max-width: 1023px)': {
      justifyContent: 'center',
    },
  },
});

export const socialLink = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  color: '#64748b',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid #e2e8f0',
  borderRadius: '0.5rem',
  transition: 'all 0.2s ease',
  ':hover': {
    color: '#0f172a',
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
});

// Methodology Section
export const methodologySection = style({
  width: '100%',
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '4rem 1.5rem',
  '@media': {
    '(min-width: 1024px)': {
      padding: '6rem 3rem',
    },
  },
});

export const methodologyHeader = style({
  marginBottom: '3rem',
});

export const sectionLabel = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#6366f1',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '0.75rem',
});

export const sectionTitle = style({
  fontSize: '2rem',
  fontWeight: 800,
  color: '#0f172a',
  letterSpacing: '-0.02em',
  margin: 0,
  '@media': {
    '(min-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
});

export const methodologyGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '3rem',
    },
  },
});

export const methodologyCard = style({
  animation: `${fadeInUp} 0.6s ease-out both`,
  selectors: {
    '&:nth-child(1)': { animationDelay: '0.1s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
  },
});

export const methodologyIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3rem',
  height: '3rem',
  backgroundColor: '#0f172a',
  color: '#ffffff',
  borderRadius: '0.75rem',
  marginBottom: '1.5rem',
});

export const methodologyTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '1rem',
  letterSpacing: '-0.01em',
});

export const methodologyDescription = style({
  fontSize: '0.9375rem',
  color: '#64748b',
  lineHeight: 1.7,
  margin: 0,
});

// Testimonials Section
export const testimonialsSection = style({
  width: '100%',
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '4rem 1.5rem',
  '@media': {
    '(min-width: 1024px)': {
      padding: '6rem 3rem',
    },
  },
});

export const testimonialsHeader = style({
  marginBottom: '3rem',
});

// Carousel Container
export const carouselContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

// Fade animations
const testimonialFadeInAnimation = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const testimonialFadeOutAnimation = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(-10px)' },
});

export const testimonialCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
});

export const testimonialFadeIn = style({
  animation: `${testimonialFadeInAnimation} 0.5s ease-out forwards`,
});

export const testimonialFadeOut = style({
  animation: `${testimonialFadeOutAnimation} 0.5s ease-out forwards`,
});

export const testimonialQuote = style({
  fontSize: '1.125rem',
  lineHeight: 1.8,
  color: '#475569',
  margin: 0,
  fontStyle: 'italic',
  '@media': {
    '(min-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
});

export const testimonialAuthor = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginTop: 'auto',
});

export const authorAvatar = style({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  backgroundColor: '#6366f1',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875rem',
  fontWeight: 600,
  flexShrink: 0,
});

export const authorName = style({
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: '#0f172a',
  lineHeight: 1.4,
});

export const authorTitle = style({
  fontSize: '0.8125rem',
  color: '#64748b',
  lineHeight: 1.4,
});

// Carousel Indicators
export const carouselIndicators = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

export const indicator = style({
  width: '0.5rem',
  height: '0.5rem',
  borderRadius: '50%',
  backgroundColor: '#cbd5e1',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: 0,
  ':hover': {
    backgroundColor: '#94a3b8',
    transform: 'scale(1.2)',
  },
});

export const indicatorActive = style({
  width: '2rem',
  borderRadius: '0.25rem',
  backgroundColor: '#6366f1',
  ':hover': {
    backgroundColor: '#6366f1',
  },
});

// Writings Section
export const writingsSection = style({
  width: '100%',
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '4rem 1.5rem 6rem',
  '@media': {
    '(min-width: 1024px)': {
      padding: '6rem 3rem 8rem',
    },
  },
});

export const writingsHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  gap: '1.5rem',
});

export const viewAllLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: '#0f172a',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  ':hover': {
    color: '#6366f1',
    gap: '0.75rem',
  },
});

export const writingsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
  '@media': {
    '(min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const writingCard = style({
  display: 'block',
  textDecoration: 'none',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  animation: `${fadeInUp} 0.6s ease-out both`,
  selectors: {
    '&:nth-child(1)': { animationDelay: '0.1s' },
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.3s' },
  },
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
    borderColor: '#cbd5e1',
  },
});

export const writingImageContainer = style({
  position: 'relative',
  width: '100%',
  height: '12rem',
  overflow: 'hidden',
  backgroundColor: '#f1f5f9',
});

export const writingImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
  selectors: {
    [`${writingCard}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const writingContent = style({
  padding: '1.5rem',
});

export const writingDate = style({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#6366f1',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  display: 'block',
  marginBottom: '0.75rem',
});

export const writingTitle = style({
  fontSize: '1.125rem',
  fontWeight: 700,
  color: '#0f172a',
  lineHeight: 1.4,
  margin: '0 0 0.75rem 0',
  transition: 'color 0.2s ease',
  selectors: {
    [`${writingCard}:hover &`]: {
      color: '#6366f1',
    },
  },
});

export const writingExcerpt = style({
  fontSize: '0.875rem',
  color: '#64748b',
  lineHeight: 1.6,
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});






