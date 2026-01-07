import styled, { css } from 'styled-components';

export const StyledTypography = styled.span<{
  $variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'small';
  $weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  $align?: 'left' | 'center' | 'right' | 'justify';
}>`
  margin: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'h1':
        return css`
          font-size: ${theme.typography.fontSize['4xl']};
          font-weight: ${theme.typography.fontWeight.bold};
          line-height: ${theme.typography.lineHeight.tight};
          letter-spacing: ${theme.typography.letterSpacing.tight};
        `;
      case 'h2':
        return css`
          font-size: ${theme.typography.fontSize['3xl']};
          font-weight: ${theme.typography.fontWeight.bold};
          line-height: ${theme.typography.lineHeight.tight};
        `;
      case 'h3':
        return css`
          font-size: ${theme.typography.fontSize['2xl']};
          font-weight: ${theme.typography.fontWeight.semibold};
          line-height: ${theme.typography.lineHeight.snug};
        `;
      case 'h4':
        return css`
          font-size: ${theme.typography.fontSize.xl};
          font-weight: ${theme.typography.fontWeight.semibold};
          line-height: ${theme.typography.lineHeight.snug};
        `;
      case 'h5':
        return css`
          font-size: ${theme.typography.fontSize.lg};
          font-weight: ${theme.typography.fontWeight.semibold};
          line-height: ${theme.typography.lineHeight.normal};
        `;
      case 'h6':
        return css`
          font-size: ${theme.typography.fontSize.base};
          font-weight: ${theme.typography.fontWeight.semibold};
          line-height: ${theme.typography.lineHeight.normal};
        `;
      case 'p':
        return css`
          font-size: ${theme.typography.fontSize.base};
          font-weight: ${theme.typography.fontWeight.normal};
          line-height: ${theme.typography.lineHeight.relaxed};
        `;
      case 'caption':
        return css`
          font-size: ${theme.typography.fontSize.sm};
          font-weight: ${theme.typography.fontWeight.normal};
          line-height: ${theme.typography.lineHeight.normal};
          color: ${theme.colors.semantic.foreground.secondary};
        `;
      case 'small':
        return css`
          font-size: ${theme.typography.fontSize.xs};
          font-weight: ${theme.typography.fontWeight.normal};
          line-height: ${theme.typography.lineHeight.normal};
        `;
      default:
        return '';
    }
  }}

  /* Weight override */
  ${({ $weight, theme }) => {
    if (!$weight) return '';
    
    const weightMap: Record<string, string> = {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: theme.typography.fontWeight.normal,
      medium: theme.typography.fontWeight.medium,
      semibold: theme.typography.fontWeight.semibold,
      bold: theme.typography.fontWeight.bold,
      extrabold: '800',
      black: '900',
    };

    return css`
      font-weight: ${weightMap[$weight]};
    `;
  }}

  /* Text alignment */
  ${({ $align }) =>
    $align &&
    css`
      text-align: ${$align};
    `}
`;

