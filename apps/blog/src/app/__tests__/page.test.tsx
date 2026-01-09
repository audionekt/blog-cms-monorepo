import React from 'react';
import { render, screen } from '../../test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../page';

// Mock Next.js Link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock the API hooks
jest.mock('@repo/api', () => ({
  useBlogPosts: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('Blog Home Page', () => {
  const { useBlogPosts } = require('@repo/api');

  beforeEach(() => {
    jest.clearAllMocks();
    useBlogPosts.mockReturnValue({
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },
      isLoading: false,
      error: null,
    });
  });

  it('renders hero section with title', () => {
    renderWithQueryClient(<Home />);
    expect(screen.getByText(/Crafting digital/i)).toBeInTheDocument();
    expect(screen.getByText(/experiences/i)).toBeInTheDocument();
  });

  it('renders hero description', () => {
    renderWithQueryClient(<Home />);
    expect(screen.getByText(/freelance web developer/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    renderWithQueryClient(<Home />);
    expect(screen.getByText("Read My Journal")).toBeInTheDocument();
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
  });

  it('renders methodology section', () => {
    renderWithQueryClient(<Home />);
    expect(screen.getByText('MY METHODOLOGY')).toBeInTheDocument();
    expect(screen.getByText('How I Work')).toBeInTheDocument();
    expect(screen.getByText('Collaborative')).toBeInTheDocument();
    expect(screen.getByText('Iterative')).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    renderWithQueryClient(<Home />);
    expect(screen.getByText('TESTIMONIALS')).toBeInTheDocument();
    expect(screen.getByText('What People Say')).toBeInTheDocument();
  });

  it('renders social links', () => {
    renderWithQueryClient(<Home />);
    const githubLink = screen.getByLabelText('GitHub');
    const twitterLink = screen.getByLabelText('Twitter');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const emailLink = screen.getByLabelText('Email');
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('renders testimonial indicators', () => {
    renderWithQueryClient(<Home />);
    const indicators = screen.getAllByRole('button', { name: /Go to testimonial/i });
    expect(indicators).toHaveLength(8);
  });

  it('renders latest posts when available', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Latest Post',
            slug: 'latest-post',
            excerpt: 'Latest excerpt',
            readingTimeMinutes: 5,
            author: { firstName: 'John', lastName: 'Doe' },
            tags: [{ id: 1, name: 'React' }],
            publishedAt: '2024-01-01T00:00:00Z',
          },
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
      },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<Home />);
    expect(screen.getByText('Latest Post')).toBeInTheDocument();
  });
});
