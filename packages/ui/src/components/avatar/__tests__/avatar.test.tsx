import { render, screen, fireEvent } from '../../../test-utils';
import { Avatar } from '../avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders as img element', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img.tagName).toBe('IMG');
  });

  it('shows fallback when src is not provided', () => {
    render(<Avatar alt="John Doe" />);
    const fallback = screen.getByText('JO');
    expect(fallback).toBeInTheDocument();
  });

  it('shows fallback when image fails to load', () => {
    render(<Avatar src="https://invalid-url.com/image.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    
    fireEvent.error(img);
    
    const fallback = screen.getByText('US');
    expect(fallback).toBeInTheDocument();
  });

  it('uses first 2 characters of alt text for initials', () => {
    render(<Avatar alt="Mike Johnson" />);
    expect(screen.getByText('MI')).toBeInTheDocument();
  });

  it('converts initials to uppercase', () => {
    render(<Avatar alt="sarah williams" />);
    expect(screen.getByText('SA')).toBeInTheDocument();
  });

  it('uses custom fallback text when provided', () => {
    render(<Avatar alt="John Doe" fallback="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('forwards HTML attributes to image element', () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="User"
        data-testid="custom-avatar"
        title="User Avatar"
      />
    );
    const img = screen.getByTestId('custom-avatar');
    expect(img).toHaveAttribute('title', 'User Avatar');
  });

  it('sets aria-label on fallback', () => {
    render(<Avatar alt="John Doe" />);
    const fallback = screen.getByText('JO');
    expect(fallback).toHaveAttribute('aria-label', 'John Doe');
  });

  it('handles single character alt text', () => {
    render(<Avatar alt="A" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('handles special characters in alt text', () => {
    render(<Avatar alt="@John#123" />);
    expect(screen.getByText('@J')).toBeInTheDocument();
  });
});
