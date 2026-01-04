import styled, { css, keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bgFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const testimonialFadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const testimonialFadeOutAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

// Page wrapper with fixed background
export const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
`;

// Background layers
export const BackgroundBlur = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(/clouds-blur.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(20px);
  transform: scale(1.1);
  z-index: 0;
`;

export const BackgroundImage = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(/clouds-optimized.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  animation: ${bgFadeIn} 0.5s ease-out;
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.96) 50%,
    rgba(255, 255, 255, 0.94) 100%
  );
  z-index: 1;
`;

export const ContentLayer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Hero Section
export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 6rem 1.5rem 4rem;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10rem 3rem 6rem;
    gap: 5rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  flex: 1;
  max-width: 42rem;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 1023px) {
    align-items: center;
    text-align: center;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 4rem;
  }
`;

export const HeroTitleAccent = styled.span`
  font-style: italic;
  color: #64748b;
  font-weight: 400;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.0625rem;
  color: #475569;
  line-height: 1.7;
  font-weight: 400;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

// Portrait Image
export const HeroImageContainer = styled.div`
  position: relative;
  width: 100%;
  // max-width: 22rem;
  height: 28rem;
  flex-shrink: 0;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (min-width: 768px) {
    max-width: 24rem;
    height: 32rem;
  }

  @media (min-width: 1024px) {
    max-width: 26rem;
    height: 34rem;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center 20%;

  @media (min-width: 768px) {
    border-radius: 1.25rem;
  }
`;

// CTA Buttons
export const CtaButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 1023px) {
    justify-content: center;
  }
`;

export const PrimaryCta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SecondaryCta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SvgIcon = styled.svg`
  display: block;
`;

// Social Links
export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 1023px) {
    justify-content: center;
  }
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: #64748b;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: #0f172a;
    background-color: #ffffff;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

// Methodology Section
export const MethodologySection = styled.section`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  @media (min-width: 1024px) {
    padding: 6rem 3rem;
  }
`;

export const MethodologyHeader = styled.div`
  margin-bottom: 3rem;
`;

export const SectionLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #6366f1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const MethodologyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
`;

export const MethodologyCard = styled.div`
  animation: ${fadeInUp} 0.6s ease-out both;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
`;

export const MethodologyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: #0f172a;
  color: #ffffff;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const MethodologyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
`;

export const MethodologyDescription = styled.p`
  font-size: 0.9375rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
`;

// Testimonials Section
export const TestimonialsSection = styled.section`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  @media (min-width: 1024px) {
    padding: 6rem 3rem;
  }
`;

export const TestimonialsHeader = styled.div`
  margin-bottom: 3rem;
`;

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const TestimonialCard = styled.div<{ $isTransitioning?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  animation: ${({ $isTransitioning }) =>
    $isTransitioning
      ? css`${testimonialFadeOutAnimation} 0.5s ease-out forwards`
      : css`${testimonialFadeInAnimation} 0.5s ease-out forwards`};
`;

export const TestimonialQuote = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #475569;
  margin: 0;
  font-style: italic;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
`;

export const AuthorAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #6366f1;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;
`;

export const AuthorName = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.4;
`;

export const AuthorTitle = styled.div`
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.4;
`;

export const CarouselIndicators = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Indicator = styled.button<{ $isActive?: boolean }>`
  width: ${({ $isActive }) => ($isActive ? '2rem' : '0.5rem')};
  height: 0.5rem;
  border-radius: ${({ $isActive }) => ($isActive ? '0.25rem' : '50%')};
  background-color: ${({ $isActive }) => ($isActive ? '#6366f1' : '#cbd5e1')};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? '#6366f1' : '#94a3b8')};
    transform: ${({ $isActive }) => ($isActive ? 'none' : 'scale(1.2)')};
  }
`;

// Writings Section
export const WritingsSection = styled.section`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;

  @media (min-width: 1024px) {
    padding: 6rem 3rem 8rem;
  }
`;

export const WritingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #6366f1;
    gap: 0.75rem;
  }
`;

export const WritingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const WritingCard = styled.a`
  display: block;
  text-decoration: none;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease-out both;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
  }
`;

export const WritingImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 12rem;
  overflow: hidden;
  background-color: #f1f5f9;
`;

export const WritingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${WritingCard}:hover & {
    transform: scale(1.05);
  }
`;

export const WritingContent = styled.div`
  padding: 1.5rem;
`;

export const WritingDate = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.75rem;
`;

export const WritingTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin: 0 0 0.75rem 0;
  transition: color 0.2s ease;

  ${WritingCard}:hover & {
    color: #6366f1;
  }
`;

export const WritingExcerpt = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

