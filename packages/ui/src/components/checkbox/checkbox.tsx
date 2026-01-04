'use client';

import React from 'react';
import { Check } from 'lucide-react';
import * as S from './checkbox.styles';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helper, className, disabled, ...props }, ref) => {
    const checkboxId = props.id || `checkbox-${React.useId()}`;

    return (
      <div>
        <S.CheckboxWrapper htmlFor={checkboxId} $disabled={disabled} className={className}>
          <S.CheckboxInput
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${checkboxId}-error` : helper ? `${checkboxId}-helper` : undefined}
            {...props}
          />
          <S.CheckboxBox>
            <S.CheckboxIcon as={Check} strokeWidth={3} />
          </S.CheckboxBox>
          {label && <S.CheckboxLabel>{label}</S.CheckboxLabel>}
        </S.CheckboxWrapper>

        {error && (
          <S.ErrorMessage id={`${checkboxId}-error`}>
            {error}
          </S.ErrorMessage>
        )}

        {helper && !error && (
          <S.HelperMessage id={`${checkboxId}-helper`}>
            {helper}
          </S.HelperMessage>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

