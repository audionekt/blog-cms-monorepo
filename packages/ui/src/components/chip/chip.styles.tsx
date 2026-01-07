import styled, { css } from 'styled-components';

export const StyledChip = styled.span<{
  $variant?: 'default' | 'outlined' | 'featured' | 'success' | 'warning' | 'error';
  $size: 'sm' | 'md' | 'lg';
  $color?: 'violet' | 'emerald' | 'rose' | 'amber' | 'slate' | undefined;
  $clickable?: boolean | undefined;
}>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
  transition: ${({ theme }) => theme.transitions.transitions.default};
  border: 1px solid transparent;

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: ${theme.spacing[5]};
          padding-left: ${theme.spacing[2]};
          padding-right: ${theme.spacing[2]};
          font-size: ${theme.typography.fontSize.xs};
        `;
      case 'md':
        return css`
          height: ${theme.spacing[6]};
          padding-left: ${theme.spacing[3]};
          padding-right: ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return css`
          height: ${theme.spacing[8]};
          padding-left: ${theme.spacing[4]};
          padding-right: ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.base};
        `;
    }
  }}

  /* Color variants (takes precedence over variant) */
  ${({ $color, theme }) => {
    if (!$color) return '';
    
    switch ($color) {
      case 'violet':
        return css`
          background-color: ${theme.colors.primitive.violet[100]};
          color: ${theme.colors.primitive.violet[700]};
        `;
      case 'emerald':
        return css`
          background-color: ${theme.colors.primitive.emerald[100]};
          color: ${theme.colors.primitive.emerald[600]};
        `;
      case 'rose':
        return css`
          background-color: ${theme.colors.primitive.rose[50]};
          color: ${theme.colors.primitive.rose[600]};
        `;
      case 'amber':
        return css`
          background-color: ${theme.colors.primitive.amber[100]};
          color: ${theme.colors.primitive.amber[700]};
        `;
      case 'slate':
        return css`
          background-color: ${theme.colors.primitive.slate[200]};
          color: ${theme.colors.primitive.slate[700]};
        `;
    }
  }}

  /* Variant styles (only if no color is specified) */
  ${({ $variant, $color, theme }) => {
    if ($color) return '';
    
    switch ($variant) {
      case 'default':
        return css`
          background-color: ${theme.colors.semantic.background.muted};
          color: ${theme.colors.semantic.foreground.primary};
        `;
      case 'outlined':
        return css`
          background-color: transparent;
          border-color: ${theme.colors.semantic.border.default};
          color: ${theme.colors.semantic.foreground.secondary};
        `;
      case 'featured':
        return css`
          background-color: ${theme.colors.primitive.amber[100]};
          color: ${theme.colors.primitive.amber[700]};
        `;
      case 'success':
        return css`
          background-color: ${theme.colors.semantic.success.subtle};
          color: ${theme.colors.semantic.success.text};
        `;
      case 'warning':
        return css`
          background-color: ${theme.colors.semantic.warning.subtle};
          color: ${theme.colors.semantic.warning.text};
        `;
      case 'error':
        return css`
          background-color: ${theme.colors.semantic.error.subtle};
          color: ${theme.colors.semantic.error.text};
        `;
      default:
        return '';
    }
  }}

  /* Clickable state */
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `}
`;

export const DismissButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${({ theme }) => theme.spacing[1]};
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.full};
  opacity: 0.6;
  transition: opacity ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.inOut};

  &:hover {
    opacity: 1;
  }
`;

