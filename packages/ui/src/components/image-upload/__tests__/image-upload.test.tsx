import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageUpload } from '../image-upload';

describe('ImageUpload', () => {
  const mockOnFileSelect = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('dropzone mode (no value)', () => {
    it('renders upload dropzone', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      expect(screen.getByRole('button', { name: /upload image/i })).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<ImageUpload label="Featured Image" onFileSelect={mockOnFileSelect} />);
      expect(screen.getByText('Featured Image')).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(<ImageUpload helper="Upload a cover image" onFileSelect={mockOnFileSelect} />);
      expect(screen.getByText('Upload a cover image')).toBeInTheDocument();
    });

    it('shows upload instructions', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      expect(screen.getByText(/click to upload or drag and drop/i)).toBeInTheDocument();
    });

    it('shows file size limit', () => {
      render(<ImageUpload maxSize={5 * 1024 * 1024} onFileSelect={mockOnFileSelect} />);
      expect(screen.getByText(/up to 5MB/i)).toBeInTheDocument();
    });

    it('shows uploading state', () => {
      render(<ImageUpload isUploading onFileSelect={mockOnFileSelect} />);
      expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });

    it('shows error message', () => {
      render(<ImageUpload error="Upload failed" onFileSelect={mockOnFileSelect} />);
      expect(screen.getByText('Upload failed')).toBeInTheDocument();
    });

    it('does not show helper when error is present', () => {
      render(
        <ImageUpload 
          helper="This should be hidden" 
          error="Error message" 
          onFileSelect={mockOnFileSelect} 
        />
      );
      expect(screen.queryByText('This should be hidden')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('handles file selection via input', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(mockOnFileSelect).toHaveBeenCalledWith(file);
    });

    it('validates file type', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(mockOnFileSelect).not.toHaveBeenCalled();
      expect(screen.getByText('Please select an image file')).toBeInTheDocument();
    });

    it('validates file size', () => {
      render(<ImageUpload maxSize={1024} onFileSelect={mockOnFileSelect} />);
      
      // Create a file larger than maxSize
      const largeContent = new Array(2000).fill('a').join('');
      const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      fireEvent.change(input, { target: { files: [file] } });
      
      expect(mockOnFileSelect).not.toHaveBeenCalled();
      expect(screen.getByText(/file size must be less than/i)).toBeInTheDocument();
    });

    it('opens file dialog on click', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = jest.spyOn(input, 'click');
      
      fireEvent.click(dropzone);
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('does not open file dialog when disabled', () => {
      render(<ImageUpload disabled onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = jest.spyOn(input, 'click');
      
      fireEvent.click(dropzone);
      
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('does not open file dialog when uploading', () => {
      render(<ImageUpload isUploading onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = jest.spyOn(input, 'click');
      
      fireEvent.click(dropzone);
      
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('handles drag events', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      
      fireEvent.dragEnter(dropzone);
      fireEvent.dragOver(dropzone);
      fireEvent.dragLeave(dropzone);
    });

    it('handles file drop', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      });
      
      expect(mockOnFileSelect).toHaveBeenCalledWith(file);
    });

    it('ignores drop when disabled', () => {
      render(<ImageUpload disabled onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file],
        },
      });
      
      expect(mockOnFileSelect).not.toHaveBeenCalled();
    });

    it('ignores drag enter when disabled', () => {
      render(<ImageUpload disabled onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      
      // Should not throw or change state
      fireEvent.dragEnter(dropzone);
    });
  });

  describe('preview mode (with value)', () => {
    it('renders image preview', () => {
      render(
        <ImageUpload 
          value="https://example.com/image.jpg" 
          onFileSelect={mockOnFileSelect} 
          onRemove={mockOnRemove}
        />
      );
      
      const img = screen.getByAltText('Preview');
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders remove button', () => {
      render(
        <ImageUpload 
          value="https://example.com/image.jpg" 
          onFileSelect={mockOnFileSelect} 
          onRemove={mockOnRemove}
        />
      );
      
      expect(screen.getByRole('button', { name: /remove image/i })).toBeInTheDocument();
    });

    it('calls onRemove when remove button clicked', () => {
      render(
        <ImageUpload 
          value="https://example.com/image.jpg" 
          onFileSelect={mockOnFileSelect} 
          onRemove={mockOnRemove}
        />
      );
      
      fireEvent.click(screen.getByRole('button', { name: /remove image/i }));
      
      expect(mockOnRemove).toHaveBeenCalled();
    });

    it('does not show remove button when disabled', () => {
      render(
        <ImageUpload 
          value="https://example.com/image.jpg" 
          disabled
          onFileSelect={mockOnFileSelect} 
          onRemove={mockOnRemove}
        />
      );
      
      expect(screen.queryByRole('button', { name: /remove image/i })).not.toBeInTheDocument();
    });

    it('does not show remove button when uploading', () => {
      render(
        <ImageUpload 
          value="https://example.com/image.jpg" 
          isUploading
          onFileSelect={mockOnFileSelect} 
          onRemove={mockOnRemove}
        />
      );
      
      expect(screen.queryByRole('button', { name: /remove image/i })).not.toBeInTheDocument();
    });

    it('shows uploading overlay when uploading with value', () => {
      render(
        <ImageUpload 
          value="https://example.com/image.jpg" 
          isUploading
          onFileSelect={mockOnFileSelect} 
        />
      );
      
      expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has accessible dropzone', () => {
      render(<ImageUpload onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      expect(dropzone).toHaveAttribute('tabIndex', '0');
    });

    it('has negative tabIndex when disabled', () => {
      render(<ImageUpload disabled onFileSelect={mockOnFileSelect} />);
      
      const dropzone = screen.getByRole('button', { name: /upload image/i });
      expect(dropzone).toHaveAttribute('tabIndex', '-1');
    });

    it('remove button has accessible label', () => {
      render(
        <ImageUpload 
          value="https://example.com/image.jpg" 
          onFileSelect={mockOnFileSelect} 
          onRemove={mockOnRemove}
        />
      );
      
      expect(screen.getByRole('button', { name: /remove image/i })).toBeInTheDocument();
    });
  });

  describe('custom className', () => {
    it('applies custom className', () => {
      const { container } = render(
        <ImageUpload className="custom-class" onFileSelect={mockOnFileSelect} />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('accept prop', () => {
    it('passes accept to input', () => {
      render(<ImageUpload accept=".png,.jpg" onFileSelect={mockOnFileSelect} />);
      
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('accept', '.png,.jpg');
    });
  });
});


