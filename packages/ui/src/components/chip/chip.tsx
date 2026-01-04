import React from 'react';
import { cn } from '../../styles';
import * as styles from './chip.css';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'featured' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  color?: 'violet' | 'emerald' | 'rose' | 'amber' | 'slate';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Chip({ 
  variant = 'default',
  size = 'md',
  color,
  className,
  children,
  dismissible = false,
  onDismiss,
  onClick,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        styles.chip,
        color ? styles.colors[color] : styles.variants[variant],
        styles.sizes[size],
        (onClick || dismissible) && styles.clickable,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      {dismissible && onDismiss && (
        <button
          className={styles.dismissButton}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
