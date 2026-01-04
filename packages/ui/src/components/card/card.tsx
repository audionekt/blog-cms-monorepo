import React from 'react';
import { StyledCard } from './card.styles';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  as?: React.ElementType;
}

export function Card({ 
  variant = 'default', 
  padding = 'md',
  interactive = false,
  className,
  children,
  as = 'article',
  ...props
}: CardProps) {
  return (
    <StyledCard
      as={as}
      $variant={variant}
      $padding={padding}
      $interactive={interactive}
      className={className}
      {...props}
    >
      {children}
    </StyledCard>
  );
}
