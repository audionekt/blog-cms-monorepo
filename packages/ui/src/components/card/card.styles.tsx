import styled, { css } from 'styled-components';

export const StyledCard = styled.article<{
  $variant: 'default' | 'elevated' | 'outlined';
  $padding: 'none' | 'sm' | 'md' | 'lg';
  $interactive?: boolean;
}>`
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: ${({ theme }) => theme.transitions.transitions.default};

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'default':
        return css`
          background-color: ${theme.colors.semantic.background.base};
          border: 1px solid ${theme.colors.semantic.border.default};
        `;
      case 'elevated':
        return css`
          background-color: ${theme.colors.semantic.background.elevated};
          box-shadow: ${theme.shadows.lg};
        `;
      case 'outlined':
        return css`
          background-color: transparent;
          border: 2px solid ${theme.colors.semantic.border.default};
        `;
    }
  }}

  /* Padding variants */
  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'none':
        return css`
          padding: 0;
        `;
      case 'sm':
        return css`
          padding: ${theme.spacing[4]};
        `;
      case 'md':
        return css`
          padding: ${theme.spacing[6]};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing[8]};
        `;
    }
  }}

  /* Interactive state */
  ${({ $interactive, theme }) =>
    $interactive &&
    css`
      cursor: pointer;

      &:hover {
        border-color: ${theme.colors.semantic.border.strong};
      }
    `}
`;

