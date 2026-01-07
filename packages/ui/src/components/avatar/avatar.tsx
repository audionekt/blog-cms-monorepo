import React from 'react';
import { AvatarWrapper, AvatarImage, AvatarFallback } from './avatar.styles';

export interface AvatarProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square' | 'rounded';
  fallback?: string;
}

export function Avatar({ 
  src,
  alt,
  size = 'md',
  shape = 'circle',
  fallback,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  
  const showFallback = !src || imageError;
  const initials = fallback || alt?.substring(0, 2).toUpperCase();

  if (showFallback) {
    return (
      <AvatarFallback
        $size={size}
        $shape={shape}
        className={className}
        aria-label={alt}
      >
        {initials}
      </AvatarFallback>
    );
  }

  return (
    <AvatarWrapper $shape={shape}>
      <AvatarImage
        $size={size}
        $shape={shape}
        src={src}
        alt={alt}
        onError={() => setImageError(true)}
        className={className}
        {...props}
      />
    </AvatarWrapper>
  );
}
