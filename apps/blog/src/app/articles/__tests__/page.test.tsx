import { render, screen, waitFor } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import { useBlogPosts } from '@repo/api';
import ArticlesPage from '../page';

// Mock the API hook
jest.mock('@repo/api', () => ({
  useBlogPosts: jest.fn(),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('ArticlesPage', () => {
  const mockPosts = [
    {
      id: '1',
      slug: 'test-post-1',
      title: 'Test Post 1',
      excerpt: 'This is a test excerpt for post 1',
      featuredImageUrl: 'https://example.com/image1.jpg',
      readingTimeMinutes: 5,
      author: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
    {
      id: '2',
      slug: 'test-post-2',
      title: 'React Best Practices',
      excerpt: 'Learn about React best practices',
      featuredImageUrl: null,
      readingTimeMinutes: 10,
      author: {
        firstName: 'Jane',
        lastName: 'Smith',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the hero section', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [], totalPages: 0 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('Articles & Insights')).toBeInTheDocument();
    expect(screen.getByText(/Explore articles about web development/)).toBeInTheDocument();
  });

  it('renders search input', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [], totalPages: 0 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument();
  });

  it('renders popular categories', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [], totalPages: 0 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('Popular:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'TypeScript' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Design Systems' })).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('Loading articles...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch posts'),
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText(/Error loading articles/)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch posts/)).toBeInTheDocument();
  });

  it('renders posts when data is available', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('React Best Practices')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt for post 1')).toBeInTheDocument();
  });

  it('displays post metadata correctly', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('10 min read')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders post image when available', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [mockPosts[0]], totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const image = screen.getByAltText('Test Post 1');
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('renders placeholder when post has no image', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [mockPosts[1]], totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    // The placeholder div should be rendered
    const postCard = screen.getByText('React Best Practices').closest('article');
    expect(postCard).toBeInTheDocument();
  });

  it('filters posts based on search query', async () => {
    const user = userEvent.setup();
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    await user.type(searchInput, 'React');

    await waitFor(() => {
      expect(screen.getByText('React Best Practices')).toBeInTheDocument();
      expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument();
    });
  });

  it('filters posts by title and excerpt', async () => {
    const user = userEvent.setup();
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    await user.type(searchInput, 'excerpt');

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.queryByText('React Best Practices')).not.toBeInTheDocument();
    });
  });

  it('shows no results message when search has no matches', async () => {
    const user = userEvent.setup();
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.getByText('Try a different search term')).toBeInTheDocument();
    });
  });

  it('clicking popular category filters posts', async () => {
    const user = userEvent.setup();
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const reactButton = screen.getByRole('button', { name: 'React' });
    await user.click(reactButton);

    await waitFor(() => {
      expect(screen.getByText('React Best Practices')).toBeInTheDocument();
      expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument();
    });
  });

  it('shows empty state when no posts are available', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [], totalPages: 0 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('No articles yet')).toBeInTheDocument();
    expect(screen.getByText('Check back soon for new content!')).toBeInTheDocument();
  });

  it('renders pagination when multiple pages exist', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: {
        content: mockPosts,
        totalPages: 3,
        number: 0,
        first: true,
        last: false,
      },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  it('does not render pagination when only one page exists', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: {
        content: mockPosts,
        totalPages: 1,
        number: 0,
        first: true,
        last: true,
      },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
  });

  it('post cards link to correct slug', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const postLink1 = screen.getByText('Test Post 1').closest('a');
    const postLink2 = screen.getByText('React Best Practices').closest('a');
    
    expect(postLink1).toHaveAttribute('href', '/posts/test-post-1');
    expect(postLink2).toHaveAttribute('href', '/posts/test-post-2');
  });

  it('search is case insensitive', async () => {
    const user = userEvent.setup();
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    await user.type(searchInput, 'REACT');

    await waitFor(() => {
      expect(screen.getByText('React Best Practices')).toBeInTheDocument();
    });
  });

  it('clears search when input is cleared', async () => {
    const user = userEvent.setup();
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    const searchInput = screen.getByPlaceholderText('Search articles...');
    
    // Type search query
    await user.type(searchInput, 'React');
    await waitFor(() => {
      expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument();
    });
    
    // Clear search
    await user.clear(searchInput);
    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('React Best Practices')).toBeInTheDocument();
    });
  });

  it('renders all popular categories', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [], totalPages: 0 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'TypeScript' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Design Systems' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Web Performance' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CSS' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Testing' })).toBeInTheDocument();
  });

  it('handles posts without excerpts', () => {
    const postsWithoutExcerpts = [
      {
        ...mockPosts[0],
        excerpt: null,
      },
    ];
    
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: postsWithoutExcerpts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
  });

  it('handles posts with very long titles', () => {
    const postWithLongTitle = {
      ...mockPosts[0],
      title: 'This is a very long title that should still render correctly without breaking the layout or causing any issues',
    };
    
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [postWithLongTitle], totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText(/This is a very long title/)).toBeInTheDocument();
  });

  it('renders section title', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: mockPosts, totalPages: 1 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('All Articles')).toBeInTheDocument();
  });

  it('handles multiple page navigation buttons', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: {
        content: mockPosts,
        totalPages: 5,
        number: 2,
        first: false,
        last: false,
      },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: {
        content: mockPosts,
        totalPages: 3,
        number: 2,
        first: false,
        last: true,
      },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('renders hero subtitle', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: { content: [], totalPages: 0 },
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    expect(screen.getByText(/Explore articles about web development/)).toBeInTheDocument();
  });

  it('handles undefined data gracefully', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    render(<ArticlesPage />);
    
    // Should still render the page structure
    expect(screen.getByText('Articles & Insights')).toBeInTheDocument();
  });
});

