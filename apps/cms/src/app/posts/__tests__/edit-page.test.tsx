import React from 'react';
import { render, screen } from '../../../test-utils';
import EditPostPage from '../[id]/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
  useParams: () => ({
    id: '123',
  }),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronLeft: (props: any) => <svg {...props} data-testid="chevron-left-icon" />,
  MessageSquare: (props: any) => <svg {...props} data-testid="message-square-icon" />,
  Link: (props: any) => <svg {...props} data-testid="link-icon" />,
  Check: (props: any) => <svg {...props} data-testid="check-icon" />,
  Bell: (props: any) => <svg {...props} data-testid="bell-icon" />,
  Trash2: (props: any) => <svg {...props} data-testid="trash2-icon" />,
}));

// Mock aurigami components
jest.mock('aurigami', () => ({
  ThemeProvider: ({ children }: any) => <>{children}</>,
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, leftIcon }: any) => <button onClick={onClick}>{leftIcon}{children}</button>,
  Input: ({ label, ...props }: any) => <div><label>{label}</label><input {...props} /></div>,
  TextArea: ({ label, ...props }: any) => <div><label>{label}</label><textarea {...props} /></div>,
  Dropdown: ({ label, ...props }: any) => <div><label>{label}</label><select {...props} /></div>,
  Form: ({ children, onSubmit }: any) => <form onSubmit={onSubmit}>{children}</form>,
  FormSection: ({ title, description, children }: any) => <div><h3>{title}</h3>{description && <p>{description}</p>}{children}</div>,
  FormGrid: ({ children }: any) => <div>{children}</div>,
  FormActions: ({ children }: any) => <div>{children}</div>,
  Card: ({ children }: any) => <div>{children}</div>,
  Chip: ({ children }: any) => <span>{children}</span>,
  ImageUpload: () => <div>Image Upload</div>,
  FocusLock: ({ children }: any) => <>{children}</>,
}));

// Mock the API hooks
jest.mock('@repo/api', () => ({
  useBlogPost: jest.fn(() => ({
    data: {
      id: 123,
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'Test excerpt',
      mdxContent: 'Test content',
      tags: [],
      status: 'DRAFT',
      metaTitle: '',
      metaDescription: '',
      allowComments: true,
      featured: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      viewCount: 0,
    },
    isLoading: false,
    error: null,
  })),
  useUpdateBlogPost: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useDeleteBlogPost: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
  })),
  useTags: jest.fn(() => ({
    data: { content: [] },
  })),
  useUploadMedia: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false,
    isError: false,
  })),
  PostStatus: {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
  },
}));

describe('Edit Post Page', () => {
  it('renders the edit post page', () => {
    render(<EditPostPage />);
    
    expect(screen.getByText('Edit Post')).toBeInTheDocument();
  });

  it('displays back button', () => {
    render(<EditPostPage />);
    
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('shows post content section', () => {
    render(<EditPostPage />);
    
    expect(screen.getByText('Post Content')).toBeInTheDocument();
  });

  it('renders delete button', () => {
    render(<EditPostPage />);
    
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});

