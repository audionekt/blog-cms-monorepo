import { render, screen } from '@testing-library/react';
import { useBlogPostBySlug } from '@repo/api';
import PostPage from '../page';
import { use } from 'react';

// Mock React's use hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock the API hook
jest.mock('@repo/api', () => ({
  useBlogPostBySlug: jest.fn(),
}));

// Mock the aurigami components
jest.mock('aurigami', () => ({
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Chip: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Avatar: ({ alt, ...props }: any) => <div {...props}>{alt}</div>,
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

const mockPost = {
  id: 1,
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  content: '<p>This is test content</p>',
  mdxContent: 'This is test content',
  excerpt: 'Test excerpt',
  featuredImageUrl: 'https://example.com/image.jpg',
  status: 'PUBLISHED' as const,
  featured: false,
  readingTimeMinutes: 5,
  viewCount: 100,
  author: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    profilePictureUrl: 'https://example.com/avatar.jpg',
    avatarUrl: 'https://example.com/avatar.jpg',
  },
  tags: [
    { id: 1, name: 'React', slug: 'react' },
    { id: 2, name: 'TypeScript', slug: 'typescript' },
  ],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-02T00:00:00Z',
  publishedAt: '2024-01-01T12:00:00Z',
  metaTitle: 'Test Meta Title',
  metaDescription: 'Test meta description',
};

describe('PostPage', () => {
  const mockParams = Promise.resolve({ slug: 'test-blog-post' });

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the use hook to return the slug directly
    (use as jest.Mock).mockReturnValue({ slug: 'test-blog-post' });
  });

  describe('loading state', () => {
    it('shows loading state while fetching post', () => {
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('shows error message when post fails to load', () => {
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: new Error('Failed to fetch'),
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText(/post not found/i)).toBeInTheDocument();
    });

    it('shows not found message when post is not found', () => {
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText(/post not found/i)).toBeInTheDocument();
    });
  });

  describe('post content', () => {
    beforeEach(() => {
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
    });

    it('renders post title', () => {
      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });

    it('renders post excerpt', () => {
      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Test excerpt')).toBeInTheDocument();
    });

    it('renders author information', () => {
      render(<PostPage params={mockParams} />);

      // Check for author name parts since "John Doe" appears in multiple places
      expect(screen.getAllByText(/john/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/doe/i).length).toBeGreaterThan(0);
    });

    it('renders reading time', () => {
      render(<PostPage params={mockParams} />);

      expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
    });

    it('renders published date', () => {
      render(<PostPage params={mockParams} />);

      // The date formatting might vary, so just check for presence
      expect(screen.getByText(/jan/i)).toBeInTheDocument();
    });

    it('renders post tags', () => {
      render(<PostPage params={mockParams} />);

      // Tags appear in both header and footer, so use getAllByText
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    });

    it('renders post content', () => {
      render(<PostPage params={mockParams} />);

      // Content is rendered as HTML
      expect(screen.getByText(/this is test content/i)).toBeInTheDocument();
    });
  });

  describe('post without optional fields', () => {
    it('renders post without featured image', () => {
      const postWithoutImage = { ...mockPost, featuredImageUrl: null };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithoutImage,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.queryByAltText('Test Blog Post')).not.toBeInTheDocument();
    });

    it('renders post without tags', () => {
      const postWithoutTags = { ...mockPost, tags: [] };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithoutTags,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });

    it('renders post without excerpt', () => {
      const postWithoutExcerpt = { ...mockPost, excerpt: null };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithoutExcerpt,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });
  });

  describe('slug parameter', () => {
    it('uses slug from URL params', () => {
      const customParams = Promise.resolve({ slug: 'custom-slug' });
      (use as jest.Mock).mockReturnValue({ slug: 'custom-slug' });
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={customParams} />);

      expect(useBlogPostBySlug).toHaveBeenCalledWith('custom-slug');
    });
  });

  describe('MarkdownRenderer', () => {
    beforeEach(() => {
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: mockPost,
        isLoading: false,
        error: null,
      });
    });

    it('renders headings (h1, h2, h3)', () => {
      const postWithHeadings = {
        ...mockPost,
        mdxContent: '# Heading 1\n## Heading 2\n### Heading 3',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithHeadings,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Heading 1')).toBeInTheDocument();
      expect(screen.getByText('Heading 2')).toBeInTheDocument();
      expect(screen.getByText('Heading 3')).toBeInTheDocument();
    });

    it('renders paragraphs', () => {
      const postWithParagraph = {
        ...mockPost,
        mdxContent: 'This is a paragraph of text.',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithParagraph,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('This is a paragraph of text.')).toBeInTheDocument();
    });

    it('renders bold text', () => {
      const postWithBold = {
        ...mockPost,
        mdxContent: 'This is **bold text** in a sentence.',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithBold,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      const boldElement = screen.getByText('bold text');
      expect(boldElement).toBeInTheDocument();
      expect(boldElement.tagName).toBe('STRONG');
    });

    it('renders inline code', () => {
      const postWithCode = {
        ...mockPost,
        mdxContent: 'Use `console.log()` to debug.',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithCode,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      const codeElement = screen.getByText('console.log()');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.tagName).toBe('CODE');
    });

    it('renders links', () => {
      const postWithLink = {
        ...mockPost,
        mdxContent: 'Check out [Google](https://google.com) for more info.',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithLink,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      const linkElement = screen.getByText('Google');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.tagName).toBe('A');
      expect(linkElement).toHaveAttribute('href', 'https://google.com');
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders code blocks', () => {
      const postWithCodeBlock = {
        ...mockPost,
        mdxContent: '```javascript\nconst x = 10;\nconsole.log(x);\n```',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithCodeBlock,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText(/const x = 10/)).toBeInTheDocument();
      expect(screen.getByText(/console\.log\(x\)/)).toBeInTheDocument();
    });

    it('renders unordered lists', () => {
      const postWithList = {
        ...mockPost,
        mdxContent: '- Item 1\n- Item 2\n- Item 3',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithList,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders ordered lists', () => {
      const postWithOrderedList = {
        ...mockPost,
        mdxContent: '1. First item\n2. Second item\n3. Third item',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithOrderedList,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('First item')).toBeInTheDocument();
      expect(screen.getByText('Second item')).toBeInTheDocument();
      expect(screen.getByText('Third item')).toBeInTheDocument();
    });

    it('renders blockquotes', () => {
      const postWithBlockquote = {
        ...mockPost,
        mdxContent: '> This is a quote',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithBlockquote,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      const quoteText = screen.getByText('This is a quote');
      expect(quoteText).toBeInTheDocument();
      // The text is wrapped in a span inside a blockquote
      expect(quoteText.parentElement?.tagName).toBe('BLOCKQUOTE');
    });

    it('renders images with alt text', () => {
      const postWithImage = {
        ...mockPost,
        mdxContent: '![Alt text](https://example.com/image.jpg)',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithImage,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      const imageElement = screen.getByAltText('Alt text');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders images with caption', () => {
      const postWithImageCaption = {
        ...mockPost,
        mdxContent: '![Image caption](https://example.com/photo.jpg)',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithImageCaption,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Image caption')).toBeInTheDocument();
    });

    it('handles empty lines correctly', () => {
      const postWithEmptyLines = {
        ...mockPost,
        mdxContent: 'Paragraph 1\n\nParagraph 2',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithEmptyLines,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });

    it('renders mixed markdown content', () => {
      const postWithMixedContent = {
        ...mockPost,
        mdxContent:
          '# Title\n\nThis is a paragraph with **bold** and `code`.\n\n- List item 1\n- List item 2',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithMixedContent,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('code')).toBeInTheDocument();
      expect(screen.getByText('List item 1')).toBeInTheDocument();
      expect(screen.getByText('List item 2')).toBeInTheDocument();
    });

    it('handles code blocks with language specification', () => {
      const postWithLanguageCode = {
        ...mockPost,
        mdxContent: '```typescript\ninterface User {\n  name: string;\n}\n```',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithLanguageCode,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText(/interface User/)).toBeInTheDocument();
      expect(screen.getByText(/name: string/)).toBeInTheDocument();
    });

    it('handles asterisk-style lists', () => {
      const postWithAsteriskList = {
        ...mockPost,
        mdxContent: '* First\n* Second\n* Third',
      };
      (useBlogPostBySlug as jest.Mock).mockReturnValue({
        data: postWithAsteriskList,
        isLoading: false,
        error: null,
      });

      render(<PostPage params={mockParams} />);

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });
  });
});

