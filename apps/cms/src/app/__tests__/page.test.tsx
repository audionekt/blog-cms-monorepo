import React from 'react';
import { render, screen } from '../../test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsPage from '../page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock the API hooks
jest.mock('@repo/api', () => ({
  useBlogPosts: jest.fn(),
  useDeleteBlogPost: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
  PostStatus: {
    PUBLISHED: 'PUBLISHED',
    DRAFT: 'DRAFT',
    ARCHIVED: 'ARCHIVED',
  },
}));

// Mock PostsTable component
jest.mock('../../components/posts-table', () => ({
  PostsTable: ({ posts }: { posts: any[] }) => (
    <div data-testid="posts-table">
      {posts.map((post: any) => (
        <div key={post.id} data-testid={`post-row-${post.id}`}>
          <span>{post.title}</span>
          <span>{post.excerpt}</span>
          <span>{post.author.firstName} {post.author.lastName}</span>
          <span>{post.viewCount} views</span>
          {post.readingTimeMinutes && <span>{post.readingTimeMinutes} min read</span>}
          {post.tags.map((tag: any) => <span key={tag.id}>{tag.name}</span>)}
        </div>
      ))}
    </div>
  ),
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
  // render from test-utils already wraps with ThemeProvider
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('CMS Posts Page', () => {
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

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useBlogPosts.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Failed to fetch posts' },
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText(/error loading posts/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch posts/i)).toBeInTheDocument();
  });

  it('renders empty state when no posts', () => {
    useBlogPosts.mockReturnValue({
      data: { content: [], totalElements: 0, totalPages: 0, number: 0 },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
  });

  it('renders posts table when data is loaded', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Test Post',
            excerpt: 'Test excerpt',
            status: 'PUBLISHED',
            featured: true,
            viewCount: 100,
            readingTimeMinutes: 5,
            author: {
              firstName: 'John',
              lastName: 'Doe',
              avatarUrl: 'https://example.com/avatar.jpg',
            },
            tags: [{ id: 1, name: 'Tech' }],
          },
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
      },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByTestId('posts-table')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt')).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/100 views/i)).toBeInTheDocument();
    expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
  });

  it('displays stats correctly', () => {
    useBlogPosts.mockReturnValue({
      data: {
        content: [
          {
            id: 1,
            title: 'Post 1',
            status: 'PUBLISHED',
            featured: true,
            viewCount: 100,
            author: { firstName: 'John', lastName: 'Doe' },
            tags: [],
          },
          {
            id: 2,
            title: 'Post 2',
            status: 'DRAFT',
            featured: false,
            viewCount: 50,
            author: { firstName: 'Jane', lastName: 'Smith' },
            tags: [],
          },
        ],
        totalElements: 2,
        totalPages: 1,
        number: 0,
      },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Drafts')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders New Post button', () => {
    useBlogPosts.mockReturnValue({
      data: { content: [], totalElements: 0, totalPages: 0, number: 0 },
      isLoading: false,
      error: null,
    });

    renderWithQueryClient(<PostsPage />);
    expect(screen.getByText(/new post/i)).toBeInTheDocument();
  });
});
