import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../styles';
import * as styles from './button.css';

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
    <button 
      className={cn(
        styles.button,
        styles.variants[variant],
        styles.sizes[size],
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className={styles.loadingSpinner} />
          Loading...
        </>
      ) : (
        <>
          {finalLeftIcon && (
            <span className={styles.iconWrapper}>{finalLeftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className={styles.iconWrapper}>{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
}
