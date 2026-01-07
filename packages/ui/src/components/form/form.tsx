import React from 'react';
import * as S from './form.styles';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, onSubmit, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(e);
    };

    return (
      <S.StyledForm
        ref={ref}
        onSubmit={handleSubmit}
        className={className}
        {...props}
      >
        {children}
      </S.StyledForm>
    );
  }
);

Form.displayName = 'Form';

// Form Section component for grouping form fields
export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <S.FormSection className={className}>
      {(title || description) && (
        <S.FormSectionHeader>
          {title && <S.FormSectionTitle>{title}</S.FormSectionTitle>}
          {description && <S.FormSectionDescription>{description}</S.FormSectionDescription>}
        </S.FormSectionHeader>
      )}
      <S.FormSectionContent>{children}</S.FormSectionContent>
    </S.FormSection>
  );
};

// Form Grid component for creating responsive layouts
export interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export const FormGrid: React.FC<FormGridProps> = ({
  children,
  columns = 2,
  className,
}) => {
  return (
    <S.FormGrid $columns={columns} className={className}>
      {children}
    </S.FormGrid>
  );
};

// Form Actions component for submit/cancel buttons
export interface FormActionsProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  align = 'right',
  className,
}) => {
  return (
    <S.FormActions $align={align} className={className}>
      {children}
    </S.FormActions>
  );
};
