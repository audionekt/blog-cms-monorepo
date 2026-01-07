import styled, { keyframes } from 'styled-components';

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

const bgFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
  gap: 2rem;
  padding: 6rem 1.5rem 4rem;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;

  @media (min-width: 1024px) {
    padding: 10rem 3rem 6rem;
    gap: 3rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  max-width: 42rem;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 1023px) {
    align-items: center;
    text-align: center;
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 32rem;
  margin-top: 1rem;
`;

export const PopularSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  width: 100%;
`;

export const PopularLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
`;

export const PopularTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PopularTag = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
    color: #334155;
  }
`;

// Divider
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #e2e8f0 20%,
    #e2e8f0 80%,
    transparent 100%
  );
  margin: 2rem 0;
`;

// Main Content
export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1.5rem 4rem;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;

  @media (min-width: 1024px) {
    padding: 4rem 3rem 6rem;
  }
`;

export const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ArticleCard = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

export const ArticleImageContainer = styled.div`
  width: 100%;
  height: 12rem;
  background-color: #f1f5f9;
  overflow: hidden;
  position: relative;
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ArticleImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArticleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
`;

export const ArticleMeta = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
`;

export const ArticleTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  line-height: 1.4;
`;

export const ArticleExcerpt = styled.p`
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
`;

export const ArticleAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const ArticleAuthorName = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

// Loading and Error States
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
`;

export const LoadingSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
  text-align: center;
`;

// Pagination
export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

export const PaginationInfo = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

