import styled, { css } from 'styled-components';

export const InputWrapper = styled.div<{ $fullWidth?: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.semantic.status.error};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{
  $state: 'default' | 'error' | 'success';
  $hasLeftIcon?: boolean;
  $hasRightIcon?: boolean;
}>`
  width: 100%;
  height: ${({ theme }) => theme.spacing[10]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: ${({ theme }) => theme.transitions.transitions.default};
  outline: none;

  ${({ $hasLeftIcon, theme }) =>
    $hasLeftIcon &&
    css`
      padding-left: ${theme.spacing[10]};
    `}

  ${({ $hasRightIcon, theme }) =>
    $hasRightIcon &&
    css`
      padding-right: ${theme.spacing[10]};
    `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.semantic.foreground.tertiary};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.semantic.border.strong};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.semantic.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.semantic.brand.primary}33;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.semantic.background.muted};
    color: ${({ theme }) => theme.colors.semantic.foreground.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $state, theme }) => {
    switch ($state) {
      case 'error':
        return css`
          border-color: ${theme.colors.semantic.status.error};
          &:focus {
            border-color: ${theme.colors.semantic.status.error};
            box-shadow: 0 0 0 3px ${theme.colors.semantic.status.error}33;
          }
        `;
      case 'success':
        return css`
          border-color: ${theme.colors.semantic.status.success};
          &:focus {
            border-color: ${theme.colors.semantic.status.success};
            box-shadow: 0 0 0 3px ${theme.colors.semantic.status.success}33;
          }
        `;
      default:
        return '';
    }
  }}
`;

export const Icon = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position, theme }) =>
    $position === 'left'
      ? css`
          left: ${theme.spacing[3]};
        `
      : css`
          right: ${theme.spacing[3]};
        `}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  pointer-events: none;

  svg {
    width: ${({ theme }) => theme.spacing[5]};
    height: ${({ theme }) => theme.spacing[5]};
  }
`;

export const Message = styled.p<{ $type: 'error' | 'helper' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing[1]};

  ${({ $type, theme }) =>
    $type === 'error'
      ? css`
          color: ${theme.colors.semantic.status.error};
        `
      : css`
          color: ${theme.colors.semantic.foreground.secondary};
        `}
`;

export const ErrorIcon = styled.svg`
  width: ${({ theme }) => theme.spacing[4]};
  height: ${({ theme }) => theme.spacing[4]};
  flex-shrink: 0;
`;

