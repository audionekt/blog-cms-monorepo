import React from 'react';
import * as S from './input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  error?: string | undefined;
  helper?: string | undefined;
  state?: 'default' | 'error' | 'success';
  leftIcon?: React.ReactNode | undefined;
  rightIcon?: React.ReactNode | undefined;
  fullWidth?: boolean | undefined;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      state,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`;
    const inputState = error ? 'error' : state || 'default';

    return (
      <S.InputWrapper $fullWidth={fullWidth}>
        {label && (
          <S.Label htmlFor={inputId}>
            {label}
            {props.required && <S.Required>*</S.Required>}
          </S.Label>
        )}

        <S.InputContainer>
          {leftIcon && (
            <S.Icon $position="left">{leftIcon}</S.Icon>
          )}

          <S.StyledInput
            ref={ref}
            id={inputId}
            $state={inputState}
            $hasLeftIcon={!!leftIcon}
            $hasRightIcon={!!rightIcon}
            className={className}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <S.Icon $position="right">{rightIcon}</S.Icon>
          )}
        </S.InputContainer>

        {error && (
          <S.Message id={`${inputId}-error`} $type="error">
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
          <S.Message id={`${inputId}-helper`} $type="helper">
            {helper}
          </S.Message>
        )}
      </S.InputWrapper>
    );
  }
);

Input.displayName = 'Input';
