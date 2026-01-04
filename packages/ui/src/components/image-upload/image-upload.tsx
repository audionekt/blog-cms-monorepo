'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Typography } from '../typography';
import * as S from './image-upload.styles';

export interface ImageUploadProps {
  /** Current image URL (for preview) */
  value?: string;
  /** Callback when image is selected */
  onFileSelect?: (file: File) => void;
  /** Callback when image is removed */
  onRemove?: () => void;
  /** Whether upload is in progress */
  isUploading?: boolean;
  /** Error message */
  error?: string;
  /** Accepted file types */
  accept?: string;
  /** Max file size in bytes */
  maxSize?: number;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Helper text */
  helper?: string;
  /** Custom class name */
  className?: string;
}

export function ImageUpload({
  value,
  onFileSelect,
  onRemove,
  isUploading = false,
  error,
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  label,
  helper,
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const displayError = error || localError;

  const validateFile = (file: File): boolean => {
    setLocalError(null);

    // Check file type
    if (!file.type.startsWith('image/')) {
      setLocalError('Please select an image file');
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / 1024 / 1024);
      setLocalError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (file: File) => {
    if (validateFile(file)) {
      onFileSelect?.(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  }, [disabled]);

  const handleClick = () => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalError(null);
    onRemove?.();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <S.Container className={className}>
      {label && (
        <Typography variant="caption" weight="medium">{label}</Typography>
      )}

      {value ? (
        // Preview mode
        <S.Preview>
          <S.PreviewImage
            src={value}
            alt="Preview"
          />
          
          {isUploading && (
            <S.UploadingOverlay>
              <S.Spinner />
              <Typography variant="caption">Uploading...</Typography>
            </S.UploadingOverlay>
          )}

          {!isUploading && !disabled && (
            <S.RemoveButton
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
            >
              <X size={16} />
            </S.RemoveButton>
          )}
        </S.Preview>
      ) : (
        // Dropzone mode
        <S.Dropzone
          $isDragging={isDragging}
          $disabled={disabled}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload image"
        >
          {isUploading ? (
            <>
              <S.Spinner />
              <Typography variant="p">
                Uploading...
              </Typography>
            </>
          ) : (
            <>
              <S.Icon as={Upload} />
              <S.Text>
                <Typography variant="p" style={{ fontWeight: 500 }}>
                  Click to upload or drag and drop
                </Typography>
                <Typography variant="caption">
                  PNG, JPG, GIF up to {Math.round(maxSize / 1024 / 1024)}MB
                </Typography>
              </S.Text>
            </>
          )}
        </S.Dropzone>
      )}

      <S.HiddenInput
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        disabled={disabled || isUploading}
      />

      {helper && !displayError && (
        <Typography variant="caption">{helper}</Typography>
      )}

      {displayError && (
        <S.ErrorMessage>{displayError}</S.ErrorMessage>
      )}
    </S.Container>
  );
}

