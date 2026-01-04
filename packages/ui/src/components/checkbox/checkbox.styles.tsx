import styled, { css } from 'styled-components';

export const CheckboxWrapper = styled.label<{ $disabled?: boolean | undefined }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
  user-select: none;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const CheckboxBox = styled.div`
  position: relative;
  width: ${({ theme }) => theme.spacing[5]};
  height: ${({ theme }) => theme.spacing[5]};
  border: 2px solid ${({ theme }) => theme.colors.semantic.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  transition: ${({ theme }) => theme.transitions.transitions.default};
  flex-shrink: 0;

  ${CheckboxInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.semantic.brand.primary};
    border-color: ${({ theme }) => theme.colors.semantic.brand.primary};
  }

  ${CheckboxInput}:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.colors.semantic.brand.primary};
    outline-offset: 2px;
  }

  ${CheckboxInput}:disabled + & {
    background-color: ${({ theme }) => theme.colors.semantic.background.muted};
    border-color: ${({ theme }) => theme.colors.semantic.border.subtle};
  }

  ${CheckboxWrapper}:hover ${CheckboxInput}:not(:disabled) + & {
    border-color: ${({ theme }) => theme.colors.semantic.brand.primary};
  }
`;

export const CheckboxIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ theme }) => theme.spacing[3]};
  height: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.semantic.foreground.onBrand};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.inOut};

  ${CheckboxInput}:checked ~ ${CheckboxBox} & {
    opacity: 1;
  }
`;

export const CheckboxLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.semantic.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

export const HelperMessage = styled.p`
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

