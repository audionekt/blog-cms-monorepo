import styled, { css } from 'styled-components';

export const AvatarBase = styled.div<{
  $size: 'sm' | 'md' | 'lg';
  $shape: 'circle' | 'square' | 'rounded';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  user-select: none;
  overflow: hidden;

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          width: ${theme.spacing[6]};
          height: ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.xs};
        `;
      case 'md':
        return css`
          width: ${theme.spacing[10]};
          height: ${theme.spacing[10]};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return css`
          width: ${theme.spacing[16]};
          height: ${theme.spacing[16]};
          font-size: ${theme.typography.fontSize.base};
        `;
    }
  }}

  /* Shape variants */
  ${({ $shape, theme }) => {
    switch ($shape) {
      case 'circle':
        return css`
          border-radius: ${theme.radii.full};
        `;
      case 'square':
        return css`
          border-radius: ${theme.radii.none};
        `;
      case 'rounded':
        return css`
          border-radius: ${theme.radii.lg};
        `;
    }
  }}
`;

export const AvatarWrapper = styled.div<{
  $shape: 'circle' | 'square' | 'rounded';
}>`
  display: inline-flex;
  border: 2px solid ${({ theme }) => theme.colors.semantic.border.default};
  box-sizing: border-box;
  overflow: hidden;

  /* Shape variants */
  ${({ $shape, theme }) => {
    switch ($shape) {
      case 'circle':
        return css`
          border-radius: ${theme.radii.full};
        `;
      case 'square':
        return css`
          border-radius: ${theme.radii.none};
        `;
      case 'rounded':
        return css`
          border-radius: ${theme.radii.lg};
        `;
    }
  }}
`;

export const AvatarImage = styled(AvatarBase).attrs({ as: 'img' })`
  display: block;
  object-fit: cover;
`;

export const AvatarFallback = styled(AvatarBase)`
  background-color: ${({ theme }) => theme.colors.semantic.background.muted};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

