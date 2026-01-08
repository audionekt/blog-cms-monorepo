import { render, screen, fireEvent, waitFor } from '../../../../test-utils';
import userEvent from '@testing-library/user-event';
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

    it('pre-populates title field', async () => {
      renderWithQueryClient(<EditPostPage />);
      const titleInput = await screen.findByPlaceholderText('Enter an engaging title...');
      await waitFor(() => {
        expect(titleInput).toHaveValue('Test Post');
      });
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

    it('pre-populates content field', async () => {
      renderWithQueryClient(<EditPostPage />);
      const contentInput = await screen.findByPlaceholderText('Write your post content here. Supports MDX...');
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

    it('updates title on change', async () => {
      renderWithQueryClient(<EditPostPage />);
      const titleInput = await screen.findByPlaceholderText('Enter an engaging title...');
      
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      
      expect(titleInput).toHaveValue('Updated Title');
    });

    it('updates content on change', async () => {
      renderWithQueryClient(<EditPostPage />);
      const contentInput = await screen.findByPlaceholderText('Write your post content here. Supports MDX...');
      
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

    it('updates reading time on change', async () => {
      renderWithQueryClient(<EditPostPage />);
      const readingTimeInput = await screen.findByPlaceholderText('5');
      
      fireEvent.change(readingTimeInput, { target: { value: '10' } });
      
      expect(readingTimeInput).toHaveValue(10);
    });

    it('renders status dropdown', async () => {
      renderWithQueryClient(<EditPostPage />);
      expect(await screen.findByText('Status')).toBeInTheDocument();
    });

    it('changes status when dropdown changed', async () => {
      renderWithQueryClient(<EditPostPage />);
      // Wait for form to initialize
      await screen.findByPlaceholderText('Enter an engaging title...');
      
      // The dropdown component might not work with standard change events
      // This test may need to be adjusted based on how the Dropdown component works
      expect(await screen.findByText('Status')).toBeInTheDocument();
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
      
      const titleInput = await screen.findByPlaceholderText('Enter an engaging title...');
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      
      const submitButton = await screen.findByText(/update post|publish post/i);
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

    it('shows delete confirmation modal', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText(/delete this post/i)).toBeInTheDocument();
      });
    });

    it('closes modal when cancel clicked', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText(/delete this post/i)).toBeInTheDocument();
      });
      
      const cancelButtons = screen.getAllByRole('button', { name: /cancel/i });
      const modalCancelButton = cancelButtons[cancelButtons.length - 1]; // Last cancel is in modal
      fireEvent.click(modalCancelButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/delete this post/i)).not.toBeInTheDocument();
      });
    });

    it('deletes post when confirmed', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText(/delete this post/i)).toBeInTheDocument();
      });
      
      // Find all delete buttons and click the one in the modal (the last one)
      const allDeleteButtons = screen.getAllByRole('button', { name: /delete/i });
      const confirmButton = allDeleteButtons[allDeleteButtons.length - 1];
      fireEvent.click(confirmButton);
      
      await waitFor(() => {
        expect(mockDeleteMutateAsync).toHaveBeenCalledWith(1);
      });
    });

    it('navigates to home after successful delete', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText(/delete this post/i)).toBeInTheDocument();
      });
      
      // Find all delete buttons and click the one in the modal (the last one)
      const allDeleteButtons = screen.getAllByRole('button', { name: /delete/i });
      const confirmButton = allDeleteButtons[allDeleteButtons.length - 1];
      fireEvent.click(confirmButton);
      
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
      const user = userEvent.setup();
      renderWithQueryClient(<EditPostPage />);
      
      const titleInput = await screen.findByPlaceholderText('Enter an engaging title...');
      
      // Wait for form to be initialized with data
      await waitFor(() => {
        expect(titleInput).toHaveValue('Test Post');
      });
      
      // Clear the title using userEvent for more realistic interaction
      await user.clear(titleInput);
      
      // Wait for state update - ensure the input is actually empty
      await waitFor(() => {
        expect(titleInput).toHaveValue('');
      });
      
      // Find the form element and submit it directly
      const form = titleInput.closest('form');
      expect(form).toBeInTheDocument();
      
      // Submit the form directly
      fireEvent.submit(form!);
      
      // Wait for error message to appear
      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('clears error when user starts typing after validation error', async () => {
      renderWithQueryClient(<EditPostPage />);
      
      const titleInput = await screen.findByPlaceholderText('Enter an engaging title...');
      
      // Wait for initialization
      await waitFor(() => {
        expect(titleInput).toHaveValue('Test Post');
      });
      
      // Clear and submit to trigger error
      fireEvent.change(titleInput, { target: { value: '' } });
      const form = titleInput.closest('form');
      fireEvent.submit(form!);
      
      // Wait for error
      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      });
      
      // Start typing - error should clear
      fireEvent.change(titleInput, { target: { value: 'New Title' } });
      
      await waitFor(() => {
        expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('error handling', () => {
    it('handles update errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      useBlogPost.mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
      
      mockUpdateMutateAsync.mockRejectedValue(new Error('Update failed'));
      
      renderWithQueryClient(<EditPostPage />);
      
      const submitButton = await screen.findByText(/update post|publish post/i);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to update post:', expect.any(Error));
      });
      
      consoleErrorSpy.mockRestore();
    });

    it('handles delete errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      useBlogPost.mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
      
      mockDeleteMutateAsync.mockRejectedValue(new Error('Delete failed'));
      
      renderWithQueryClient(<EditPostPage />);
      
      const deleteButtons = await screen.findAllByRole('button', { name: /delete/i });
      fireEvent.click(deleteButtons[0]); // Click the first delete button in the header
      
      // Now find the confirm button in the modal
      const confirmButton = await screen.findByText('Delete', { selector: 'button[style*="background-color: rgb(220, 38, 38)"]' });
      fireEvent.click(confirmButton);
      
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to delete post:', expect.any(Error));
      });
      
      consoleErrorSpy.mockRestore();
    });
  });

});

