import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EditPostPage from '../page';

// Mock Next.js navigation
const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
  useParams: () => ({
    id: '1',
  }),
}));

// Mock the post data
const mockPost = {
  id: 1,
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'Test excerpt',
  mdxContent: '# Test Content',
  featuredImageUrl: 'https://example.com/image.jpg',
  featuredMedia: { id: 1 },
  author: {
    id: 1,
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
  },
  tags: [{ id: 1, name: 'Tech', slug: 'tech' }],
  status: 'DRAFT',
  metaTitle: 'SEO Title',
  metaDescription: 'SEO Description',
  readingTimeMinutes: 5,
  allowComments: true,
  featured: false,
  viewCount: 100,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-16T10:00:00Z',
  publishedAt: null,
};

const mockTagsData = {
  content: [
    { id: 1, name: 'Tech', slug: 'tech', postCount: 5 },
    { id: 2, name: 'News', slug: 'news', postCount: 3 },
  ],
  totalElements: 2,
  totalPages: 1,
  page: 0,
  size: 100,
};

const mockUpdateMutateAsync = jest.fn();
const mockDeleteMutateAsync = jest.fn();
const mockUploadMutateAsync = jest.fn();

jest.mock('@repo/api', () => ({
  useBlogPost: jest.fn(),
  useUpdateBlogPost: () => ({
    mutateAsync: mockUpdateMutateAsync,
    isPending: false,
  }),
  useDeleteBlogPost: () => ({
    mutateAsync: mockDeleteMutateAsync,
    isPending: false,
  }),
  useTags: () => ({ data: mockTagsData }),
  useUploadMedia: () => ({
    mutateAsync: mockUploadMutateAsync,
    isPending: false,
    isError: false,
  }),
  PostStatus: {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
  },
}));

// Mock aurigami components
jest.mock('aurigami', () => ({
  Typography: ({ children, variant }: any) => <div data-variant={variant}>{children}</div>,
  Button: ({ children, onClick, type, variant, loading, leftIcon, style }: any) => (
    <button onClick={onClick} type={type || 'button'} data-variant={variant} disabled={loading} style={style}>
      {leftIcon}
      {children}
    </button>
  ),
  Input: ({ label, value, onChange, error, placeholder }: any) => (
    <div>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        aria-label={label}
        aria-invalid={!!error}
      />
      {error && <span role="alert">{error}</span>}
    </div>
  ),
  TextArea: ({ label, value, onChange, error, placeholder, rows }: any) => (
    <div>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        aria-label={label}
        rows={rows}
      />
      {error && <span role="alert">{error}</span>}
    </div>
  ),
  Dropdown: ({ label, value, onChange, options, getItemLabel, placeholder }: any) => (
    <div>
      <label>{label}</label>
      <select 
        value={value || ''} 
        onChange={(e) => {
          const selectedValue = options.find((opt: any) => 
            opt.id ? opt.id.toString() === e.target.value : opt === e.target.value
          );
          onChange(selectedValue);
        }} 
        aria-label={label}
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((opt: any, idx: number) => {
          const optLabel = getItemLabel ? getItemLabel(opt) : opt;
          const optValue = opt.id ? opt.id.toString() : opt;
          return (
            <option key={idx} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
    </div>
  ),
  Form: ({ children, onSubmit }: any) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>{children}</form>
  ),
  FormSection: ({ children, title }: any) => (
    <div>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  ),
  FormGrid: ({ children }: any) => <div>{children}</div>,
  FormActions: ({ children }: any) => <div>{children}</div>,
  Card: ({ children }: any) => <div>{children}</div>,
  Chip: ({ children, onClick, variant }: any) => (
    <span onClick={onClick} data-variant={variant}>{children}</span>
  ),
  ImageUpload: ({ value, onFileSelect, onRemove, isUploading, error }: any) => (
    <div data-testid="image-upload">
      {value && <img src={value} alt="preview" />}
      <input 
        type="file" 
        data-testid="image-upload-input"
        onChange={(e) => e.target.files?.[0] && onFileSelect?.(e.target.files[0])}
      />
      {value && <button onClick={onRemove} data-testid="image-remove">Remove</button>}
      {isUploading && <span>Uploading...</span>}
      {error && <span role="alert">{error}</span>}
    </div>
  ),
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

describe('Edit Post Page', () => {
  const { useBlogPost } = require('@repo/api');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loading state', () => {
    it('shows loading state while fetching post', () => {
      useBlogPost.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
      });

      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByText(/loading post/i)).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('shows error state when post not found', () => {
      useBlogPost.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Post not found' },
      });

      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByText(/post not found/i)).toBeInTheDocument();
    });

    it('shows go back button on error', () => {
      useBlogPost.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: { message: 'Post not found' },
      });

      renderWithQueryClient(<EditPostPage />);
      const goBackButton = screen.getByText(/go back/i);
      fireEvent.click(goBackButton);
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('form rendering', () => {
    beforeEach(() => {
      useBlogPost.mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
    });

    it('renders edit post header', () => {
      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByText(/edit post/i)).toBeInTheDocument();
    });

    it('pre-populates title field', () => {
      renderWithQueryClient(<EditPostPage />);
      const titleInput = screen.getByLabelText('Title');
      expect(titleInput).toHaveValue('Test Post');
    });

    it('pre-populates slug field', () => {
      renderWithQueryClient(<EditPostPage />);
      const slugInput = screen.getByLabelText('Slug');
      expect(slugInput).toHaveValue('test-post');
    });

    it('pre-populates excerpt field', () => {
      renderWithQueryClient(<EditPostPage />);
      const excerptInput = screen.getByLabelText('Excerpt');
      expect(excerptInput).toHaveValue('Test excerpt');
    });

    it('pre-populates content field', () => {
      renderWithQueryClient(<EditPostPage />);
      const contentInput = screen.getByLabelText('Content');
      expect(contentInput).toHaveValue('# Test Content');
    });

    it('pre-populates meta title field', () => {
      renderWithQueryClient(<EditPostPage />);
      const metaTitleInput = screen.getByLabelText('Meta Title');
      expect(metaTitleInput).toHaveValue('SEO Title');
    });

    it('renders delete button', () => {
      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByText(/delete/i)).toBeInTheDocument();
    });

    it('renders back button', () => {
      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByText(/back/i)).toBeInTheDocument();
    });

    it('renders post information section', () => {
      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByText(/post information/i)).toBeInTheDocument();
    });

    it('shows view count', () => {
      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('form interactions', () => {
    beforeEach(() => {
      useBlogPost.mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
    });

    it('updates title on change', () => {
      renderWithQueryClient(<EditPostPage />);
      const titleInput = screen.getByLabelText('Title');
      
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      
      expect(titleInput).toHaveValue('Updated Title');
    });

    it('updates content on change', () => {
      renderWithQueryClient(<EditPostPage />);
      const contentInput = screen.getByLabelText('Content');
      
      fireEvent.change(contentInput, { target: { value: '# New Content' } });
      
      expect(contentInput).toHaveValue('# New Content');
    });

    it('navigates back when back button clicked', () => {
      renderWithQueryClient(<EditPostPage />);
      const backButton = screen.getByText(/back/i);
      
      fireEvent.click(backButton);
      
      expect(mockBack).toHaveBeenCalled();
    });

    it('navigates back when cancel clicked', () => {
      renderWithQueryClient(<EditPostPage />);
      const cancelButton = screen.getByText(/cancel/i);
      
      fireEvent.click(cancelButton);
      
      expect(mockBack).toHaveBeenCalled();
    });

    it('updates slug on change', () => {
      renderWithQueryClient(<EditPostPage />);
      const slugInput = screen.getByLabelText('Slug');
      
      fireEvent.change(slugInput, { target: { value: 'new-slug' } });
      
      expect(slugInput).toHaveValue('new-slug');
    });

    it('updates excerpt on change', () => {
      renderWithQueryClient(<EditPostPage />);
      const excerptInput = screen.getByLabelText('Excerpt');
      
      fireEvent.change(excerptInput, { target: { value: 'New excerpt' } });
      
      expect(excerptInput).toHaveValue('New excerpt');
    });

    it('updates meta description on change', () => {
      renderWithQueryClient(<EditPostPage />);
      const metaDescInput = screen.getByLabelText('Meta Description');
      
      fireEvent.change(metaDescInput, { target: { value: 'New meta desc' } });
      
      expect(metaDescInput).toHaveValue('New meta desc');
    });

    it('updates reading time on change', () => {
      renderWithQueryClient(<EditPostPage />);
      const readingTimeInput = screen.getByLabelText('Reading Time (minutes)');
      
      fireEvent.change(readingTimeInput, { target: { value: '10' } });
      
      expect(readingTimeInput).toHaveValue('10');
    });

    it('renders image upload component', () => {
      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByTestId('image-upload')).toBeInTheDocument();
    });

    it('shows existing featured image in upload', () => {
      renderWithQueryClient(<EditPostPage />);
      const preview = screen.getByAltText('preview');
      expect(preview).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('can remove featured image', () => {
      renderWithQueryClient(<EditPostPage />);
      const removeButton = screen.getByTestId('image-remove');
      
      fireEvent.click(removeButton);
      
      expect(screen.queryByAltText('preview')).not.toBeInTheDocument();
    });

    it('renders status dropdown', () => {
      renderWithQueryClient(<EditPostPage />);
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    it('changes status when dropdown changed', () => {
      renderWithQueryClient(<EditPostPage />);
      const statusSelect = screen.getByLabelText('Status');
      
      fireEvent.change(statusSelect, { target: { value: 'PUBLISHED' } });
      
      expect(statusSelect).toHaveValue('PUBLISHED');
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      useBlogPost.mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
      mockUpdateMutateAsync.mockResolvedValue({ id: 1 });
    });

    it('submits form with updated data', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const titleInput = screen.getByLabelText('Title');
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      
      const submitButton = screen.getByText(/update post|publish post/i);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockUpdateMutateAsync).toHaveBeenCalled();
      });
    });

    it('navigates to home after successful update', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const submitButton = screen.getByText(/update post|publish post/i);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('delete functionality', () => {
    beforeEach(() => {
      useBlogPost.mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
      mockDeleteMutateAsync.mockResolvedValue(undefined);
    });

    it('shows delete confirmation modal', () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByText(/delete/i);
      fireEvent.click(deleteButton);
      
      expect(screen.getByText(/delete this post/i)).toBeInTheDocument();
    });

    it('closes modal when cancel clicked', () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByText(/delete/i);
      fireEvent.click(deleteButton);
      
      const cancelButton = screen.getAllByText(/cancel/i)[1]; // Second cancel is in modal
      fireEvent.click(cancelButton);
      
      expect(screen.queryByText(/delete this post/i)).not.toBeInTheDocument();
    });

    it('deletes post when confirmed', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByText(/delete/i);
      fireEvent.click(deleteButton);
      
      // Find the delete button in the modal
      const confirmDeleteButtons = screen.getAllByRole('button');
      const confirmButton = confirmDeleteButtons.find(btn => 
        btn.textContent === 'Delete' && btn.getAttribute('data-variant') === 'secondary'
      );
      fireEvent.click(confirmButton!);
      
      await waitFor(() => {
        expect(mockDeleteMutateAsync).toHaveBeenCalledWith(1);
      });
    });

    it('navigates to home after successful delete', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByText(/delete/i);
      fireEvent.click(deleteButton);
      
      const confirmDeleteButtons = screen.getAllByRole('button');
      const confirmButton = confirmDeleteButtons.find(btn => 
        btn.textContent === 'Delete' && btn.getAttribute('data-variant') === 'secondary'
      );
      fireEvent.click(confirmButton!);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('validation', () => {
    beforeEach(() => {
      useBlogPost.mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
    });

    it('shows error when title is cleared', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const titleInput = screen.getByLabelText('Title');
      fireEvent.change(titleInput, { target: { value: '' } });
      
      const submitButton = screen.getByText(/update post|publish post/i);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      });
    });
  });

});

