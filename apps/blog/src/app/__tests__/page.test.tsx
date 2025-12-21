import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../page';

// Mock the aurigami components
jest.mock('aurigami', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Chip: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Avatar: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

// Mock the API hooks
jest.mock('@repo/api', () => ({
  useBlogPosts: jest.fn(),
  PostStatus: {
    PUBLISHED: 'PUBLISHED',
  },
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
  });

  it('renders loading state', () => {
    useBlogPosts.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderWithQueryClient(<Home />);
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useBlogPosts.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch' },
    });

    renderWithQueryClient(<Home />);
    expect(screen.getByText(/error loading posts/i)).toBeInTheDocument();
  });

  it('renders blog posts when data is loaded', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Test Post',
            slug: 'test-post',
            excerpt: 'Test excerpt',
            featured: false,
            viewCount: 100,
            readingTimeMinutes: 5,
            author: {
              firstName: 'John',
              lastName: 'Doe',
              avatarUrl: 'https://example.com/avatar.jpg',
            },
            tags: [],
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
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt')).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  it('handles search input', () => {
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

    renderWithQueryClient(<Home />);
    const searchInput = screen.getByPlaceholderText(/search articles/i);
    
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    expect(searchInput).toHaveValue('test query');
  });

  it('renders featured posts section', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Featured Post',
            slug: 'featured-post',
            excerpt: 'Featured excerpt',
            featured: true,
            viewCount: 200,
            readingTimeMinutes: 10,
            author: {
              firstName: 'Jane',
              lastName: 'Smith',
              avatarUrl: 'https://example.com/avatar2.jpg',
            },
            tags: [{ id: 1, name: 'React', slug: 'react' }],
            publishedAt: '2024-01-01T00:00:00Z',
            featuredImageUrl: 'https://example.com/featured.jpg',
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
    expect(screen.getByText('Featured Post')).toBeInTheDocument();
    expect(screen.getByText('Featured excerpt')).toBeInTheDocument();
  });

  it('renders post with metadata', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Post with Metadata',
            slug: 'post-with-metadata',
            excerpt: 'Excerpt with details',
            featured: false,
            viewCount: 50,
            readingTimeMinutes: 3,
            author: {
              firstName: 'Bob',
              lastName: 'Johnson',
            },
            tags: [
              { id: 1, name: 'React', slug: 'react' },
              { id: 2, name: 'TypeScript', slug: 'typescript' },
            ],
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
    expect(screen.getByText('Post with Metadata')).toBeInTheDocument();
    expect(screen.getByText('Excerpt with details')).toBeInTheDocument();
    expect(screen.getByText(/bob johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/3 min read/i)).toBeInTheDocument();
  });

  it('renders empty state when no posts', () => {
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

    renderWithQueryClient(<Home />);
    // The page should still render the header and search
    expect(screen.getByPlaceholderText(/search articles/i)).toBeInTheDocument();
  });

  it('renders multiple posts', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'First Post',
            slug: 'first-post',
            excerpt: 'First excerpt',
            featured: false,
            viewCount: 100,
            readingTimeMinutes: 5,
            author: {
              firstName: 'John',
              lastName: 'Doe',
            },
            tags: [],
            publishedAt: '2024-01-01T00:00:00Z',
          },
          {
            id: 2,
            title: 'Second Post',
            slug: 'second-post',
            excerpt: 'Second excerpt',
            featured: false,
            viewCount: 150,
            readingTimeMinutes: 7,
            author: {
              firstName: 'Jane',
              lastName: 'Smith',
            },
            tags: [],
            publishedAt: '2024-01-02T00:00:00Z',
          },
        ],
        totalElements: 2,
        totalPages: 1,
        number: 0,
      },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<Home />);
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });
});

