
import styled, { css } from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const FormSectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const FormSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.semantic.foreground.primary};
  margin: 0;
`;

export const FormSectionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.semantic.foreground.secondary};
  margin: 0;
`;

export const FormSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const FormGrid = styled.div<{ $columns: 1 | 2 | 3 | 4 }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};

  ${({ $columns }) => {
    switch ($columns) {
      case 1:
        return css`
          grid-template-columns: 1fr;
        `;
      case 2:
        return css`
          grid-template-columns: 1fr;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
        `;
      case 3:
        return css`
          grid-template-columns: 1fr;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
          }
        `;
      case 4:
        return css`
          grid-template-columns: 1fr;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
          }
        `;
    }
  }}
`;

export const FormActions = styled.div<{
  $align: 'left' | 'center' | 'right' | 'between';
}>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[2]};

  ${({ $align }) => {
    switch ($align) {
      case 'left':
        return css`
          justify-content: flex-start;
        `;
      case 'center':
        return css`
          justify-content: center;
        `;
      case 'right':
        return css`
          justify-content: flex-end;
        `;
      case 'between':
        return css`
          justify-content: space-between;
        `;
    }
  }}
`;

