import React from 'react';
import * as S from './textarea.styles';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | undefined;
  error?: string | undefined;
  helper?: string | undefined;
  state?: 'default' | 'error' | 'success';
  fullWidth?: boolean | undefined;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | undefined;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helper,
      state,
      fullWidth,
      resize = 'vertical',
      className,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textAreaId = id || `textarea-${React.useId()}`;
    const textAreaState = error ? 'error' : state || 'default';

    return (
      <S.TextAreaWrapper $fullWidth={fullWidth}>
        {label && (
          <S.Label htmlFor={textAreaId}>
            {label}
            {props.required && <S.Required>*</S.Required>}
          </S.Label>
        )}

        <S.StyledTextArea
          ref={ref}
          id={textAreaId}
          rows={rows}
          $state={textAreaState}
          $resize={resize}
          className={className}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${textAreaId}-error` : helper ? `${textAreaId}-helper` : undefined
          }
          {...props}
        />

        {error && (
          <S.Message id={`${textAreaId}-error`} $type="error">
            <S.ErrorIcon
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </S.ErrorIcon>
            {error}
          </S.Message>
        )}

        {helper && !error && (
          <S.Message id={`${textAreaId}-helper`} $type="helper">
            {helper}
          </S.Message>
        )}
      </S.TextAreaWrapper>
    );
  }
);

TextArea.displayName = 'TextArea';
