import React from 'react';
import { Loader2 } from 'lucide-react';
import { StyledButton, LoadingSpinner, IconWrapper } from './button.styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  loading,
  icon,
  leftIcon,
  rightIcon,
  fullWidth,
  disabled,
  ...props 
}: ButtonProps) {
  // If 'icon' is provided, use it as leftIcon for simplicity
  const finalLeftIcon = icon || leftIcon;
  
  return (
    <StyledButton 
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      className={className}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner>
            <Loader2 />
          </LoadingSpinner>
          Loading...
        </>
      ) : (
        <>
          {finalLeftIcon && (
            <IconWrapper>{finalLeftIcon}</IconWrapper>
          )}
          {children}
          {rightIcon && (
            <IconWrapper>{rightIcon}</IconWrapper>
          )}
        </>
      )}
    </StyledButton>
  );
}
