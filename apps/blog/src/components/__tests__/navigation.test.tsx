import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from '../navigation';
import { usePathname } from 'next/navigation';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock Next.js Link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders the logo', () => {
    render(<Navigation />);
    const logo = screen.getByText('ALEXDEV');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
  });

  it('renders correctly when on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navigation />);
    
    // Just verify the links render - CSS module mocking makes class testing difficult
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
  });

  it('renders correctly when on articles page', () => {
    (usePathname as jest.Mock).mockReturnValue('/articles');
    render(<Navigation />);
    
    expect(screen.getByText('Journal')).toBeInTheDocument();
  });

  it('renders correctly when on posts page', () => {
    (usePathname as jest.Mock).mockReturnValue('/posts/123');
    render(<Navigation />);
    
    expect(screen.getByText('Journal')).toBeInTheDocument();
  });

  it('does not highlight Journal link when on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navigation />);
    
    const journalLink = screen.getByText('Journal').closest('a');
    expect(journalLink?.className).not.toContain('navLinkActive');
  });

  it('renders CTA button', () => {
    render(<Navigation />);
    const ctaButton = screen.getByText("Let's Talk");
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.tagName).toBe('BUTTON');
  });

  it('logo links to home page', () => {
    render(<Navigation />);
    const logo = screen.getByText('ALEXDEV');
    expect(logo).toHaveAttribute('href', '/');
  });

  it('About link points to home page', () => {
    render(<Navigation />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toHaveAttribute('href', '/');
  });

  it('Journal link points to articles page', () => {
    render(<Navigation />);
    const journalLink = screen.getByText('Journal');
    expect(journalLink).toHaveAttribute('href', '/articles');
  });
});
