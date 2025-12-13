'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Typography } from '../typography';
import * as styles from './image-upload.css';

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

  const dropzoneClasses = [
    styles.dropzone,
    isDragging && styles.dropzoneActive,
    disabled && styles.dropzoneDisabled,
  ].filter(Boolean).join(' ');

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {label && (
        <Typography variant="caption" weight="medium">{label}</Typography>
      )}

      {value ? (
        // Preview mode
        <div className={styles.preview}>
          <img
            src={value}
            alt="Preview"
            className={styles.previewImage}
          />
          
          {isUploading && (
            <div className={styles.uploadingOverlay}>
              <div className={styles.spinner} />
              <Typography variant="caption">Uploading...</Typography>
            </div>
          )}

          {!isUploading && !disabled && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={handleRemove}
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        // Dropzone mode
        <div
          className={dropzoneClasses}
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
              <div className={styles.spinner} />
              <Typography variant="p" className={styles.text}>
                Uploading...
              </Typography>
            </>
          ) : (
            <>
              <Upload className={styles.icon} />
              <div className={styles.text}>
                <Typography variant="p" style={{ fontWeight: 500 }}>
                  Click to upload or drag and drop
                </Typography>
                <Typography variant="caption">
                  PNG, JPG, GIF up to {Math.round(maxSize / 1024 / 1024)}MB
                </Typography>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className={styles.hiddenInput}
        disabled={disabled || isUploading}
      />

      {helper && !displayError && (
        <Typography variant="caption">{helper}</Typography>
      )}

      {displayError && (
        <div className={styles.error}>{displayError}</div>
      )}
    </div>
  );
}

