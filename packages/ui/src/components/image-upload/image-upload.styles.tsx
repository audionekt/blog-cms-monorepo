import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Dropzone = styled.div<{
  $isDragging?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[8]};
  border: 2px dashed ${({ theme }) => theme.colors.semantic.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.semantic.background.base};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.transitions.default};
  min-height: 200px;

  &:hover:not([disabled]) {
    border-color: ${({ theme }) => theme.colors.semantic.brand.primary};
    background-color: ${({ theme }) => theme.colors.semantic.background.muted};
  }

  ${({ $isDragging, theme }) =>
    $isDragging &&
    css`
      border-color: ${theme.colors.semantic.brand.primary};
      background-color: ${theme.colors.semantic.brand.primary}11;
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

export const Icon = styled.svg`
  width: ${({ theme }) => theme.spacing[12]};
  height: ${({ theme }) => theme.spacing[12]};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
`;

export const Text = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const Preview = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.semantic.border.default};
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  display: block;
`;

export const UploadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: white;
`;

export const Spinner = styled.div`
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${spin} 1s linear infinite;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.transitions.default};
  backdrop-filter: blur(4px);

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.status.error};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.semantic.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

