import styled, { css, keyframes } from 'styled-components';

// Loading spinner animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Base button styles
export const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  $size: 'sm' | 'md' | 'lg' | 'xl';
  $fullWidth?: boolean | undefined;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  transition: ${({ theme }) => theme.transitions.transitions.default};
  cursor: pointer;
  border: none;
  text-decoration: none;
  user-select: none;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: ${theme.spacing[6]};
          padding-left: ${theme.spacing[3]};
          padding-right: ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'md':
        return css`
          height: ${theme.spacing[8]};
          padding-left: ${theme.spacing[3]};
          padding-right: ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return css`
          height: ${theme.spacing[10]};
          padding-left: ${theme.spacing[4]};
          padding-right: ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.base};
        `;
      case 'xl':
        return css`
          height: ${theme.spacing[16]};
          padding-left: ${theme.spacing[8]};
          padding-right: ${theme.spacing[8]};
          font-size: ${theme.typography.fontSize.lg};
        `;
    }
  }}

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.semantic.brand.primary};
          color: ${theme.colors.semantic.foreground.onBrand};
          box-shadow: ${theme.shadows.sm};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.semantic.brand.primaryHover};
            box-shadow: ${theme.shadows.md};
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.semantic.brand.primaryActive};
          }

          &:focus-visible {
            outline: 3px solid ${theme.colors.primitive.violet[400]};
            outline-offset: 2px;
          }
        `;
      case 'secondary':
        return css`
          background-color: transparent;
          color: ${theme.colors.semantic.foreground.primary};
          border: 2px solid ${theme.colors.semantic.border.default};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.semantic.background.subtle};
            border-color: ${theme.colors.semantic.border.strong};
            color: ${theme.colors.semantic.foreground.primary};
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.semantic.background.muted};
            border-color: ${theme.colors.semantic.border.strong};
          }

          &:focus-visible {
            outline: 3px solid ${theme.colors.primitive.violet[400]};
            outline-offset: 2px;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.semantic.foreground.secondary};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.semantic.background.subtle};
            color: ${theme.colors.semantic.foreground.primary};
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.semantic.background.muted};
            color: ${theme.colors.semantic.foreground.primary};
          }

          &:focus-visible {
            outline: 3px solid ${theme.colors.primitive.violet[400]};
            outline-offset: 2px;
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.semantic.error.base};
          color: ${theme.colors.semantic.foreground.onBrand};
          box-shadow: ${theme.shadows.sm};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.semantic.error.hover};
            box-shadow: ${theme.shadows.md};
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.semantic.error.text};
          }

          &:focus-visible {
            outline: 3px solid ${theme.colors.primitive.rose[400]};
            outline-offset: 2px;
          }
        `;
      case 'success':
        return css`
          background-color: ${theme.colors.semantic.success.base};
          color: ${theme.colors.semantic.foreground.onBrand};
          box-shadow: ${theme.shadows.sm};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.semantic.success.hover};
            box-shadow: ${theme.shadows.md};
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.semantic.success.text};
          }

          &:focus-visible {
            outline: 3px solid ${theme.colors.primitive.emerald[400]};
            outline-offset: 2px;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.span`
  animation: ${spin} 1s linear infinite;
  height: 1rem;
  width: 1rem;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

