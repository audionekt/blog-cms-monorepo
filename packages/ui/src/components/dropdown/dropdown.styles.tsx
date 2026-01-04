import styled, { css } from 'styled-components';

export const DropdownWrapper = styled.div<{ $fullWidth?: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  position: relative;
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

export const TriggerWrapper = styled.div`
  position: relative;
`;

export const Trigger = styled.button<{
  $state: 'default' | 'error' | 'success';
  $disabled?: boolean;
}>`
  width: 100%;
  height: ${({ theme }) => theme.spacing[10]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  padding-right: ${({ theme }) => theme.spacing[10]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: ${({ theme }) => theme.transitions.transitions.default};
  outline: none;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;

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

export const TriggerPlaceholder = styled.span`
  color: ${({ theme }) => theme.colors.semantic.foreground.tertiary};
`;

export const DropdownIcon = styled.svg<{ $isOpen?: boolean }>`
  position: absolute;
  right: ${({ theme }) => theme.spacing[3]};
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.spacing[5]};
  height: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  transition: transform ${({ theme }) => theme.transitions.duration.normal} ${({ theme }) => theme.transitions.easing.inOut};
  pointer-events: none;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: translateY(-50%) rotate(180deg);
    `}
`;

export const Menu = styled.div`
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  display: flex;
  flex-direction: column;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.semantic.foreground.tertiary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.semantic.background.muted};
  }
`;

export const MenuList = styled.div`
  overflow-y: auto;
  max-height: inherit;
`;

export const MenuItem = styled.button<{
  $isActive?: boolean;
  $isSelected?: boolean;
  $disabled?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: ${({ theme }) => theme.transitions.transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.semantic.background.muted};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      background-color: ${theme.colors.semantic.background.muted};
    `}

  ${({ $isSelected, theme }) =>
    $isSelected &&
    css`
      background-color: ${theme.colors.semantic.brand.primary}11;
      color: ${theme.colors.semantic.brand.primary};
      font-weight: ${theme.typography.fontWeight.medium};
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[3]}`};
  text-align: center;
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
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

