import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PostsTable } from '../posts-table';
import type { BlogPostSummaryResponse } from '@repo/api';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
  }),
}));

// Mock aurigami components
jest.mock('aurigami', () => ({
  Typography: ({ children, variant }: any) => <span data-variant={variant}>{children}</span>,
  Button: ({ children, onClick, disabled, leftIcon, rightIcon, size, variant }: any) => (
    <button onClick={onClick} disabled={disabled} data-size={size} data-variant={variant}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  ),
  Avatar: ({ alt, size }: any) => <div data-testid="avatar" data-size={size}>{alt}</div>,
  Chip: ({ children, size, variant }: any) => <span data-size={size} data-variant={variant}>{children}</span>,
  Checkbox: ({ checked, onChange, disabled, 'aria-label': ariaLabel }: any) => (
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      disabled={disabled}
      aria-label={ariaLabel}
    />
  ),
}));

// Mock the delete hook
const mockDeleteMutateAsync = jest.fn();
jest.mock('@repo/api', () => ({
  useDeleteBlogPost: () => ({
    mutateAsync: mockDeleteMutateAsync,
    isPending: false,
  }),
  PostStatus: {
    PUBLISHED: 'PUBLISHED',
    DRAFT: 'DRAFT',
    SCHEDULED: 'SCHEDULED',
    ARCHIVED: 'ARCHIVED',
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
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

const mockPosts: BlogPostSummaryResponse[] = [
  {
    id: 1,
    title: 'First Post',
    slug: 'first-post',
    excerpt: 'This is the first post',
    featuredImageUrl: 'https://example.com/image1.jpg',
    author: {
      id: 1,
      username: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'https://example.com/avatar.jpg',
    },
    tags: [{ id: 1, name: 'Tech', slug: 'tech' }],
    status: 'PUBLISHED' as const,
    publishedAt: '2024-01-15T10:00:00Z',
    viewCount: 100,
    readingTimeMinutes: 5,
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Second Post',
    slug: 'second-post',
    excerpt: 'This is the second post',
    author: {
      id: 2,
      username: 'janesmith',
      firstName: 'Jane',
      lastName: 'Smith',
    },
    tags: [
      { id: 1, name: 'Tech', slug: 'tech' },
      { id: 2, name: 'News', slug: 'news' },
      { id: 3, name: 'Tutorial', slug: 'tutorial' },
    ],
    status: 'DRAFT' as const,
    viewCount: 50,
    featured: false,
    createdAt: '2024-01-14T10:00:00Z',
  },
];

describe('PostsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders empty state when no posts', () => {
      renderWithQueryClient(<PostsTable posts={[]} />);
      expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
    });

    it('renders table with posts', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
    });

    it('renders post titles with slugs', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      expect(screen.getByText('/first-post')).toBeInTheDocument();
      expect(screen.getByText('/second-post')).toBeInTheDocument();
    });

    it('renders author names', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      // Author names appear in avatar and as text - just check they exist
      const johnElements = screen.getAllByText(/John/);
      const janeElements = screen.getAllByText(/Jane/);
      expect(johnElements.length).toBeGreaterThan(0);
      expect(janeElements.length).toBeGreaterThan(0);
    });

    it('renders status badges', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      expect(screen.getByText(/PUBLISHED/)).toBeInTheDocument();
      expect(screen.getByText(/DRAFT/)).toBeInTheDocument();
    });

    it('renders tags', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      expect(screen.getAllByText('Tech').length).toBeGreaterThan(0);
    });

    it('renders view counts', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('renders featured image when available', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      // The image has alt="" for decorative purposes, so we query by tag name
      const images = document.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('renders pagination info', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      expect(screen.getByText(/showing 1 to 2 of 2 posts/i)).toBeInTheDocument();
    });
  });

  describe('selection', () => {
    it('renders checkboxes for each row', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      const checkboxes = screen.getAllByRole('checkbox');
      // Header checkbox + row checkboxes
      expect(checkboxes.length).toBe(3);
    });

    it('selects individual row when checkbox clicked', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Click the first row checkbox (index 1, since 0 is header)
      fireEvent.click(checkboxes[1]!);
      
      expect(screen.getByText(/1 post selected/i)).toBeInTheDocument();
    });

    it('selects all rows when header checkbox clicked', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Click header checkbox
      fireEvent.click(checkboxes[0]!);
      
      expect(screen.getByText(/2 posts selected/i)).toBeInTheDocument();
    });

    it('shows bulk delete button when rows selected', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      fireEvent.click(checkboxes[1]!);
      
      expect(screen.getByText(/delete selected/i)).toBeInTheDocument();
    });

    it('clears selection when clear button clicked', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      fireEvent.click(checkboxes[1]!);
      expect(screen.getByText(/1 post selected/i)).toBeInTheDocument();
      
      const clearButton = screen.getByText('Clear');
      fireEvent.click(clearButton);
      
      expect(screen.queryByText(/1 post selected/i)).not.toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('navigates to edit page when row clicked', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      const firstRow = screen.getByText('First Post').closest('tr');
      fireEvent.click(firstRow!);
      
      expect(mockPush).toHaveBeenCalledWith('/posts/1');
    });

    it('navigates to edit page when edit button clicked', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      // Find edit buttons (there should be one per row)
      const editButtons = screen.getAllByTitle('Edit');
      fireEvent.click(editButtons[0]!);
      
      expect(mockPush).toHaveBeenCalledWith('/posts/1');
    });
  });

  describe('delete functionality', () => {
    it('shows delete confirmation modal when delete button clicked', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      const deleteButtons = screen.getAllByTitle('Delete');
      fireEvent.click(deleteButtons[0]!);
      
      expect(screen.getByText(/delete 1 post/i)).toBeInTheDocument();
    });

    it('closes modal when cancel clicked', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      const deleteButtons = screen.getAllByTitle('Delete');
      fireEvent.click(deleteButtons[0]!);
      
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      
      expect(screen.queryByText(/delete 1 post/i)).not.toBeInTheDocument();
    });

    it('calls delete mutation when confirmed', async () => {
      mockDeleteMutateAsync.mockResolvedValue(undefined);
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      const deleteButtons = screen.getAllByTitle('Delete');
      fireEvent.click(deleteButtons[0]!);
      
      // Find the Delete button in the modal (not the Cancel button)
      const modalButtons = screen.getAllByRole('button');
      const confirmButton = modalButtons.find(btn => 
        btn.textContent === 'Delete' && btn.getAttribute('data-variant') === 'secondary'
      );
      fireEvent.click(confirmButton!);
      
      await waitFor(() => {
        expect(mockDeleteMutateAsync).toHaveBeenCalledWith(1);
      });
    });

    it('shows bulk delete modal when multiple selected', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      // Select all
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]!);
      
      const bulkDeleteButton = screen.getByText(/delete selected/i);
      fireEvent.click(bulkDeleteButton);
      
      expect(screen.getByText(/delete 2 posts/i)).toBeInTheDocument();
    });
  });

  describe('pagination', () => {
    it('renders previous and next buttons', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      const prevButton = screen.getByText('Previous').closest('button');
      expect(prevButton).toBeDisabled();
    });
  });

  describe('sorting', () => {
    it('renders sortable column headers', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      expect(screen.getByText('Post')).toBeInTheDocument();
      expect(screen.getByText('Author')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Views')).toBeInTheDocument();
      expect(screen.getByText('Created')).toBeInTheDocument();
    });
  });

  describe('toolbar', () => {
    it('shows total post count', () => {
      renderWithQueryClient(<PostsTable posts={mockPosts} />);
      
      expect(screen.getByText(/2 posts total/i)).toBeInTheDocument();
    });
  });
});

