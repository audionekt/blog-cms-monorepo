import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border-bottom: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
`;

export const HeaderInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[6]};
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex: 1;
  justify-content: center;
`;

export const StatItemIconBlue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.semantic.brand.primary};
  line-height: 1;
`;

export const StatItemIconGreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.semantic.status.success};
  line-height: 1;
`;

export const StatItemIconGray = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  line-height: 1;
`;

export const StatItemIconYellow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primitive.amber['500']};
  line-height: 1;
`;

export const StatItemValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
  line-height: 1;
`;

export const StatItemLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  line-height: 1;
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.semantic.border.default};
  flex-shrink: 0;
`;

export const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const LoadingInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.semantic.border.default};
  border-top-color: ${({ theme }) => theme.colors.semantic.brand.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const ErrorContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: flex-start;
`;

export const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.colors.semantic.status.error};
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[8]};
`;

export const EmptyIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const SvgIcon = styled.svg`
  display: block;
`;

