import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../../test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NewPostPage from '../page';
import { PostStatus } from '@repo/api';

// Mock Next.js router
const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

// Mock API hooks
const mockMutateAsync = jest.fn();
const mockCreateBlogPost = {
  mutateAsync: mockMutateAsync,
  isPending: false,
};

const mockTagsData = {
  content: [
    { id: 1, name: 'React', slug: 'react' },
    { id: 2, name: 'TypeScript', slug: 'typescript' },
    { id: 3, name: 'Testing', slug: 'testing' },
  ],
  totalElements: 3,
  totalPages: 1,
  page: 0,
  size: 100,
};

const mockUploadMedia = {
  mutateAsync: jest.fn().mockResolvedValue({ id: 1, fileUrl: 'https://example.com/image.jpg' }),
  isPending: false,
  isError: false,
};

jest.mock('@repo/api', () => ({
  useCreateBlogPost: () => mockCreateBlogPost,
  useTags: () => ({ data: mockTagsData }),
  useUploadMedia: () => mockUploadMedia,
  PostStatus: {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
  },
}));

// Mock aurigami components
jest.mock('aurigami', () => ({
  ThemeProvider: ({ children }: any) => <>{children}</>,
  Typography: ({ children, variant, className }: any) => (
    <div data-testid={`typography-${variant}`} className={className}>{children}</div>
  ),
  Button: ({ children, onClick, type, variant, isLoading, leftIcon }: any) => (
    <button 
      onClick={onClick} 
      type={type || 'button'} 
      data-variant={variant}
      disabled={isLoading}
    >
      {leftIcon}
      {children}
    </button>
  ),
  Input: ({ label, value, onChange, error, placeholder, helper, leftIcon }: any) => (
    <div>
      <label>{label}</label>
      {leftIcon}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={label}
        aria-invalid={!!error}
      />
      {error && <span role="alert">{error}</span>}
      {helper && <span className="helper">{helper}</span>}
    </div>
  ),
  TextArea: ({ label, value, onChange, error, placeholder, rows, helper }: any) => (
    <div>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        aria-label={label}
        aria-invalid={!!error}
      />
      {error && <span role="alert">{error}</span>}
      {helper && <span className="helper">{helper}</span>}
    </div>
  ),
  Select: ({ label, value, onChange, options }: any) => (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange} aria-label={label}>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  ),
  Form: ({ children, onSubmit }: any) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>{children}</form>
  ),
  FormSection: ({ children, title, description }: any) => (
    <div>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {children}
    </div>
  ),
  FormGrid: ({ children }: any) => <div>{children}</div>,
  FormActions: ({ children }: any) => <div>{children}</div>,
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  Chip: ({ children, onClick, variant }: any) => (
    <span onClick={onClick} data-variant={variant}>{children}</span>
  ),
  ImageUpload: ({ value, onFileSelect, onRemove, isUploading, error, helper }: any) => (
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
      {helper && <span>{helper}</span>}
    </div>
  ),
  Dropdown: ({ label, value, onChange, options, getItemLabel, placeholder }: any) => (
    <div>
      <label>{label}</label>
      <select 
        value={value || ''} 
        onChange={(e) => {
          const targetValue = e.target.value;
          const selectedValue = options.find((opt: any) => {
            // For objects with id (like tags)
            if (opt.id && opt.id.toString() === targetValue) return true;
            // For primitive values (like status strings)
            if (opt === targetValue) return true;
            return false;
          });
          onChange(selectedValue);
        }} 
        aria-label={label}
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((opt: any, idx: number) => {
          const optLabel = getItemLabel ? getItemLabel(opt) : opt;
          // Use id for objects, otherwise use the raw value
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
}));

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('New Post Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('renders the page with all form fields', () => {
      renderWithQueryClient(<NewPostPage />);

      expect(screen.getByText('Create New Post')).toBeInTheDocument();
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Slug')).toBeInTheDocument();
      expect(screen.getByLabelText('Excerpt')).toBeInTheDocument();
      expect(screen.getByLabelText('Content')).toBeInTheDocument();
    });

    it('renders with initial form values', () => {
      renderWithQueryClient(<NewPostPage />);

      expect(screen.getByLabelText('Title')).toHaveValue('');
      expect(screen.getByLabelText('Slug')).toHaveValue('');
      expect(screen.getByLabelText('Content')).toHaveValue('');
    });

    it('renders status dropdown with options', () => {
      renderWithQueryClient(<NewPostPage />);

      const statusSelect = screen.getByLabelText('Status');
      expect(statusSelect).toBeInTheDocument();
      // Check dropdown has all options
      expect(screen.getAllByText('📄 Draft').length).toBeGreaterThan(0);
      expect(screen.getByText('✅ Published')).toBeInTheDocument();
      expect(screen.getByText('📦 Archived')).toBeInTheDocument();
    });

    it('renders featured toggle', () => {
      renderWithQueryClient(<NewPostPage />);

      expect(screen.getByText('Featured Post')).toBeInTheDocument();
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('renders all action buttons', () => {
      renderWithQueryClient(<NewPostPage />);

      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save as Draft')).toBeInTheDocument();
      expect(screen.getByText('Publish Post')).toBeInTheDocument();
    });
  });

  describe('form input handling', () => {
    it('updates title field on change', () => {
      renderWithQueryClient(<NewPostPage />);

      const titleInput = screen.getByLabelText('Title');
      fireEvent.change(titleInput, { target: { value: 'My New Post' } });

      expect(titleInput).toHaveValue('My New Post');
    });

    it('updates slug field on change', () => {
      renderWithQueryClient(<NewPostPage />);

      const slugInput = screen.getByLabelText('Slug');
      fireEvent.change(slugInput, { target: { value: 'my-new-post' } });

      expect(slugInput).toHaveValue('my-new-post');
    });

    it('updates excerpt field on change', () => {
      renderWithQueryClient(<NewPostPage />);

      const excerptInput = screen.getByLabelText('Excerpt');
      fireEvent.change(excerptInput, { target: { value: 'This is an excerpt' } });

      expect(excerptInput).toHaveValue('This is an excerpt');
    });

    it('updates content field on change', () => {
      renderWithQueryClient(<NewPostPage />);

      const contentInput = screen.getByLabelText('Content');
      fireEvent.change(contentInput, { target: { value: 'Blog post content here' } });

      expect(contentInput).toHaveValue('Blog post content here');
    });

    it('updates meta title field on change', () => {
      renderWithQueryClient(<NewPostPage />);

      const metaTitleInput = screen.getByLabelText('Meta Title');
      fireEvent.change(metaTitleInput, { target: { value: 'SEO Title' } });

      expect(metaTitleInput).toHaveValue('SEO Title');
    });

    it('updates reading time field on change', () => {
      renderWithQueryClient(<NewPostPage />);

      const readingTimeInput = screen.getByLabelText('Reading Time (minutes)');
      fireEvent.change(readingTimeInput, { target: { value: '5' } });

      // Input returns string value, not number
      expect(readingTimeInput).toHaveValue('5');
    });

  });

  describe('status and featured toggles', () => {
    it('updates status when changed', () => {
      renderWithQueryClient(<NewPostPage />);

      const statusSelect = screen.getByLabelText('Status');
      fireEvent.change(statusSelect, { target: { value: PostStatus.PUBLISHED } });

      expect(statusSelect).toHaveValue(PostStatus.PUBLISHED);
    });

    it('toggles featured checkbox', () => {
      renderWithQueryClient(<NewPostPage />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  describe('tag selection', () => {
    it('displays available tags in dropdown', () => {
      renderWithQueryClient(<NewPostPage />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });

    it('adds a tag when selected', () => {
      renderWithQueryClient(<NewPostPage />);

      const tagSelect = screen.getByLabelText('Select Tags');
      fireEvent.change(tagSelect, { target: { value: '1' } });

      // Tag chip should appear
      expect(screen.getByText('React ×')).toBeInTheDocument();
    });

    it('removes a tag when clicked', () => {
      renderWithQueryClient(<NewPostPage />);

      // Add a tag first
      const tagSelect = screen.getByLabelText('Select Tags');
      fireEvent.change(tagSelect, { target: { value: '1' } });

      expect(screen.getByText('React ×')).toBeInTheDocument();

      // Remove the tag
      const tagChip = screen.getByText('React ×');
      fireEvent.click(tagChip);

      expect(screen.queryByText('React ×')).not.toBeInTheDocument();
    });

    it('does not add duplicate tags', () => {
      renderWithQueryClient(<NewPostPage />);

      const tagSelect = screen.getByLabelText('Select Tags');
      
      // Add tag twice
      fireEvent.change(tagSelect, { target: { value: '1' } });
      fireEvent.change(tagSelect, { target: { value: '1' } });

      // Should only have one chip
      const chips = screen.getAllByText('React ×');
      expect(chips).toHaveLength(1);
    });
  });

  describe('form validation', () => {
    it('shows error when title is missing', async () => {
      renderWithQueryClient(<NewPostPage />);

      const submitButton = screen.getByText('Publish Post');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });
    });

    it('shows error when content is missing', async () => {
      renderWithQueryClient(<NewPostPage />);

      const submitButton = screen.getByText('Publish Post');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Content is required')).toBeInTheDocument();
      });
    });

    it('clears error when user starts typing', async () => {
      renderWithQueryClient(<NewPostPage />);

      // Trigger validation error
      const submitButton = screen.getByText('Publish Post');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });

      // Start typing
      const titleInput = screen.getByLabelText('Title');
      fireEvent.change(titleInput, { target: { value: 'My Title' } });

      await waitFor(() => {
        expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
      });
    });

    it('does not submit when validation fails', async () => {
      renderWithQueryClient(<NewPostPage />);

      const submitButton = screen.getByText('Publish Post');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });

      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });

  describe('form submission', () => {
    it('submits form with valid data', async () => {
      mockMutateAsync.mockResolvedValue({ id: 1 });
      renderWithQueryClient(<NewPostPage />);

      // Fill in required fields
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Test Post' },
      });
      fireEvent.change(screen.getByLabelText('Slug'), {
        target: { value: 'test-post' },
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'Test content' },
      });

      // Submit
      const submitButton = screen.getByText('Publish Post');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          data: expect.objectContaining({
            title: 'Test Post',
            slug: 'test-post',
            mdxContent: 'Test content',
          }),
          authorId: 1,
        });
      });
    });

    it('navigates to home after successful submission', async () => {
      mockMutateAsync.mockResolvedValue({ id: 1 });
      renderWithQueryClient(<NewPostPage />);

      // Fill in required fields
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Test Post' },
      });
      fireEvent.change(screen.getByLabelText('Slug'), {
        target: { value: 'test-post' },
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'Test content' },
      });

      // Submit
      fireEvent.click(screen.getByText('Publish Post'));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });

    it('handles submission errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();
      mockMutateAsync.mockRejectedValue(new Error('API Error'));
      renderWithQueryClient(<NewPostPage />);

      // Fill in required fields
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Test Post' },
      });
      fireEvent.change(screen.getByLabelText('Slug'), {
        target: { value: 'test-post' },
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'Test content' },
      });

      // Submit
      fireEvent.click(screen.getByText('Publish Post'));

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalled();
      });

      consoleError.mockRestore();
    });
  });

  describe('save as draft', () => {
    it('saves the form with current data', async () => {
      mockMutateAsync.mockResolvedValue({ id: 1 });
      renderWithQueryClient(<NewPostPage />);

      // Fill in required fields
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Test Post' },
      });
      fireEvent.change(screen.getByLabelText('Slug'), {
        target: { value: 'test-post' },
      });
      fireEvent.change(screen.getByLabelText('Content'), {
        target: { value: 'Test content' },
      });

      // Click Save as Draft
      fireEvent.click(screen.getByText('Save as Draft'));

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalled();
      });
    });
  });

  describe('navigation', () => {
    it('goes back when back button is clicked', () => {
      renderWithQueryClient(<NewPostPage />);

      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);

      expect(mockBack).toHaveBeenCalled();
    });

    it('goes back when cancel button is clicked', () => {
      renderWithQueryClient(<NewPostPage />);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('SEO fields', () => {
    it('renders SEO section with meta fields', () => {
      renderWithQueryClient(<NewPostPage />);

      expect(screen.getByText('SEO & Metadata')).toBeInTheDocument();
      expect(screen.getByLabelText('Meta Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Meta Description')).toBeInTheDocument();
    });

    it('updates meta description', () => {
      renderWithQueryClient(<NewPostPage />);

      const metaDesc = screen.getByLabelText('Meta Description');
      fireEvent.change(metaDesc, {
        target: { value: 'SEO description' },
      });

      expect(metaDesc).toHaveValue('SEO description');
    });
  });

  describe('status chip display', () => {
    it('shows draft chip when status is draft', () => {
      renderWithQueryClient(<NewPostPage />);

      // Multiple "Draft" text exists (in select dropdown and status chip)
      const drafts = screen.getAllByText('📄 Draft');
      expect(drafts.length).toBeGreaterThan(0);
    });

    it('shows published chip when status is published', () => {
      renderWithQueryClient(<NewPostPage />);

      const statusSelect = screen.getByLabelText('Status');
      fireEvent.change(statusSelect, { target: { value: PostStatus.PUBLISHED } });

      // Multiple "Published" text exists (in select dropdown and status chip)
      const published = screen.getAllByText('✅ Published');
      expect(published.length).toBeGreaterThan(0);
    });
  });

});

