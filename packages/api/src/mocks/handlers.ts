import { http, HttpResponse } from 'msw';
import {
  mockBlogPosts,
  mockTags,
  mockUsers,
  mockMedia,
} from './data';
import {
  PostStatus,
  UserRole,
  MediaType,
  PageResponse,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  CreateTagRequest,
  UpdateTagRequest,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateMediaRequest,
  BlogPostResponse,
  TagResponse,
  UserResponse,
  UserSummaryResponse,
  MediaResponse,
} from '../types';

// Helper function to create paginated response
function createPageResponse<T>(
  content: T[],
  page: number = 0,
  size: number = 20
): PageResponse<T> {
  const start = page * size;
  const end = start + size;
  const paginatedContent = content.slice(start, end);
  const totalElements = content.length;
  const totalPages = Math.ceil(totalElements / size);

  return {
    content: paginatedContent,
    totalElements,
    totalPages,
    size,
    number: page,
    first: page === 0,
    last: page >= totalPages - 1,
    empty: totalElements === 0,
  };
}

// Blog Post Handlers
export const blogPostHandlers = [
  // GET /api/v1/posts - Get all blog posts with filtering and pagination
  http.get('/api/v1/posts', ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') as PostStatus | null;
    const tagId = url.searchParams.get('tagId');
    const featured = url.searchParams.get('featured');
    const authorId = url.searchParams.get('authorId');
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '20');

    let filteredPosts = [...mockBlogPosts];

    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status);
    }

    if (tagId) {
      const tagIdNum = parseInt(tagId);
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag => tag.id === tagIdNum)
      );
    }

    if (featured !== null) {
      const isFeatured = featured === 'true';
      filteredPosts = filteredPosts.filter(post => post.featured === isFeatured);
    }

    if (authorId) {
      const authorIdNum = parseInt(authorId);
      filteredPosts = filteredPosts.filter(post => post.author.id === authorIdNum);
    }

    // Sort by createdAt descending
    filteredPosts.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return HttpResponse.json(createPageResponse(filteredPosts, page, size));
  }),

  // GET /api/v1/posts/:id - Get blog post by ID
  http.get('/api/v1/posts/:id', ({ params }) => {
    const { id } = params;
    const post = mockBlogPosts.find(p => p.id === parseInt(id as string));

    if (!post) {
      return HttpResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(post);
  }),

  // GET /api/v1/posts/slug/:slug - Get blog post by slug
  http.get('/api/v1/posts/slug/:slug', ({ params }) => {
    const { slug } = params;
    const post = mockBlogPosts.find(p => p.slug === slug);

    if (!post) {
      return HttpResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    post.viewCount++;

    return HttpResponse.json(post);
  }),

  // POST /api/v1/posts - Create new blog post
  http.post('/api/v1/posts', async ({ request }) => {
    const data = await request.json() as CreateBlogPostRequest;

    const author = mockUsers[0]; // Default to first user
    if (!author) {
      return HttpResponse.json(
        { error: 'No authors found' },
        { status: 500 }
      );
    }

    const tags = data.tagIds
      ? mockTags.filter(tag => data.tagIds!.includes(tag.id))
      : [];
    const featuredMedia = data.featuredMediaId
      ? mockMedia.find(m => m.id === data.featuredMediaId)
      : undefined;

    const newPost = {
      id: mockBlogPosts.length + 1,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      mdxContent: data.mdxContent,
      featuredImageUrl: data.featuredImageUrl,
      featuredMedia: featuredMedia ? {
        id: featuredMedia.id,
        fileName: featuredMedia.fileName,
        fileUrl: featuredMedia.fileUrl,
        contentType: featuredMedia.contentType,
        mediaType: featuredMedia.mediaType,
      } : undefined,
      author: {
        id: author.id,
        username: author.username,
        firstName: author.firstName,
        lastName: author.lastName,
        ...(author.avatarUrl && { avatarUrl: author.avatarUrl }),
      } as UserSummaryResponse,
      tags: tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })),
      status: data.status || PostStatus.DRAFT,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords,
      publishedAt: data.status === PostStatus.PUBLISHED ? new Date().toISOString() : undefined,
      scheduledAt: data.scheduledAt,
      viewCount: 0,
      readingTimeMinutes: data.readingTimeMinutes,
      allowComments: data.allowComments ?? true,
      featured: data.featured ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockBlogPosts.unshift(newPost as unknown as BlogPostResponse);
    return HttpResponse.json(newPost, { status: 201 });
  }),

  // PUT /api/v1/posts/:id - Update blog post
  http.put('/api/v1/posts/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json() as UpdateBlogPostRequest;
    const index = mockBlogPosts.findIndex(p => p.id === parseInt(id as string));
    
    if (index === -1) {
      return HttpResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const post = mockBlogPosts[index];
    if (!post) {
      return HttpResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Update tags if provided
    const tags = data.tagIds
      ? mockTags.filter(tag => data.tagIds!.includes(tag.id))
      : post.tags;

    // Update featured media if provided
    const featuredMedia = data.featuredMediaId
      ? mockMedia.find(m => m.id === data.featuredMediaId)
      : post.featuredMedia;

    const updatedPost = {
      ...post,
      ...data,
      id: post.id,
      mdxContent: data.mdxContent ?? post.mdxContent,
      author: post.author,
      tags: tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })),
      featuredMedia: featuredMedia ? {
        id: featuredMedia.id,
        fileName: featuredMedia.fileName,
        fileUrl: featuredMedia.fileUrl,
        contentType: featuredMedia.contentType,
        mediaType: featuredMedia.mediaType,
      } : post.featuredMedia,
      viewCount: post.viewCount,
      allowComments: data.allowComments ?? post.allowComments,
      featured: data.featured ?? post.featured,
      createdAt: post.createdAt,
      updatedAt: new Date().toISOString(),
    };

    mockBlogPosts[index] = updatedPost as unknown as BlogPostResponse;
    return HttpResponse.json(updatedPost);
  }),

  // DELETE /api/v1/posts/:id - Delete blog post
  http.delete('/api/v1/posts/:id', ({ params }) => {
    const { id } = params;
    const index = mockBlogPosts.findIndex(p => p.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    mockBlogPosts.splice(index, 1);
    return HttpResponse.json({ message: 'Blog post deleted successfully' });
  }),
];

// Tag Handlers
export const tagHandlers = [
  // GET /api/tags - Get all tags with pagination
  http.get('/api/v1/tags', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '20');

    const sortedTags = [...mockTags].sort((a, b) => a.name.localeCompare(b.name));
    return HttpResponse.json(createPageResponse(sortedTags, page, size));
  }),

  // GET /api/tags/:id - Get tag by ID
  http.get('/api/tags/:id', ({ params }) => {
    const { id } = params;
    const tag = mockTags.find(t => t.id === parseInt(id as string));

    if (!tag) {
      return HttpResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(tag);
  }),

  // GET /api/tags/slug/:slug - Get tag by slug
  http.get('/api/tags/slug/:slug', ({ params }) => {
    const { slug } = params;
    const tag = mockTags.find(t => t.slug === slug);

    if (!tag) {
      return HttpResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(tag);
  }),

  // POST /api/tags - Create new tag
  http.post('/api/v1/tags', async ({ request }) => {
    const data = await request.json() as CreateTagRequest;

    const newTag: TagResponse = {
      id: mockTags.length + 1,
      name: data.name,
      slug: data.slug,
      postCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTags.push(newTag);
    return HttpResponse.json(newTag, { status: 201 });
  }),

  // PUT /api/tags/:id - Update tag
  http.put('/api/tags/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json() as UpdateTagRequest;
    const index = mockTags.findIndex(t => t.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    const tag = mockTags[index];
    if (!tag) {
      return HttpResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    const updatedTag = {
      id: tag.id,
      name: data.name ?? tag.name,
      slug: data.slug ?? tag.slug,
      postCount: tag.postCount,
      createdAt: tag.createdAt,
      updatedAt: new Date().toISOString(),
    };

    mockTags[index] = updatedTag as unknown as TagResponse;
    return HttpResponse.json(updatedTag);
  }),

  // DELETE /api/tags/:id - Delete tag
  http.delete('/api/tags/:id', ({ params }) => {
    const { id } = params;
    const index = mockTags.findIndex(t => t.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    mockTags.splice(index, 1);
    return HttpResponse.json({ message: 'Tag deleted successfully' });
  }),
];

// User Handlers
export const userHandlers = [
  // GET /api/users - Get all users with filtering and pagination
  http.get('/api/v1/users', ({ request }) => {
    const url = new URL(request.url);
    const role = url.searchParams.get('role') as UserRole | null;
    const active = url.searchParams.get('active');
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '20');

    let filteredUsers = [...mockUsers];

    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (active !== null) {
      const isActive = active === 'true';
      filteredUsers = filteredUsers.filter(user => user.active === isActive);
    }

    return HttpResponse.json(createPageResponse(filteredUsers, page, size));
  }),

  // GET /api/users/:id - Get user by ID
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    const user = mockUsers.find(u => u.id === parseInt(id as string));

    if (!user) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(user);
  }),

  // GET /api/users/username/:username - Get user by username
  http.get('/api/users/username/:username', ({ params }) => {
    const { username } = params;
    const user = mockUsers.find(u => u.username === username);

    if (!user) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(user);
  }),

  // POST /api/users - Create new user
  http.post('/api/v1/users', async ({ request }) => {
    const data = await request.json() as CreateUserRequest;

    const newUser = {
      id: mockUsers.length + 1,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      role: data.role || UserRole.AUTHOR,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser as unknown as UserResponse);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PUT /api/users/:id - Update user
  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json() as UpdateUserRequest;
    const index = mockUsers.findIndex(u => u.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = mockUsers[index];
    if (!user) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = {
      id: user.id,
      email: user.email,
      firstName: data.firstName ?? user.firstName,
      lastName: data.lastName ?? user.lastName,
      username: user.username,
      bio: data.bio !== undefined ? data.bio : user.bio,
      avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : user.avatarUrl,
      role: data.role ?? user.role,
      active: data.active ?? user.active,
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
    };

    mockUsers[index] = updatedUser as unknown as UserResponse;
    return HttpResponse.json(updatedUser);
  }),

  // DELETE /api/users/:id - Delete user
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const index = mockUsers.findIndex(u => u.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    mockUsers.splice(index, 1);
    return HttpResponse.json({ message: 'User deleted successfully' });
  }),
];

// Media Handlers
export const mediaHandlers = [
  // GET /api/media - Get all media with filtering and pagination
  http.get('/api/v1/media', ({ request }) => {
    const url = new URL(request.url);
    const mediaType = url.searchParams.get('mediaType') as MediaType | null;
    const uploadedBy = url.searchParams.get('uploadedBy');
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '20');

    let filteredMedia = [...mockMedia];

    if (mediaType) {
      filteredMedia = filteredMedia.filter(media => media.mediaType === mediaType);
    }

    if (uploadedBy) {
      const uploadedById = parseInt(uploadedBy);
      filteredMedia = filteredMedia.filter(media =>
        media.uploadedBy?.id === uploadedById
      );
    }

    // Sort by uploadedAt descending
    filteredMedia.sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return HttpResponse.json(createPageResponse(filteredMedia, page, size));
  }),

  // GET /api/v1/media/:id - Get media by ID
  http.get('/api/v1/media/:id', ({ params }) => {
    const { id } = params;
    const media = mockMedia.find(m => m.id === parseInt(id as string));

    if (!media) {
      return HttpResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(media);
  }),

  // POST /api/v1/media/upload - Upload media file
  http.post('/api/v1/media/upload', async ({ request }) => {
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return HttpResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Mock uploaded media
    const author = mockUsers[0];
    if (!author) {
      return HttpResponse.json(
        { error: 'No user found' },
        { status: 500 }
      );
    }

    const newMedia = {
      id: mockMedia.length + 1,
      fileName: `${Date.now()}-${file.name}`,
      originalFileName: file.name,
      fileUrl: `https://cdn.example.com/media/${Date.now()}-${file.name}`,
      contentType: file.type,
      fileSize: file.size,
      mediaType: file.type.startsWith('image/') ? MediaType.IMAGE : MediaType.DOCUMENT,
      width: file.type.startsWith('image/') ? 1200 : undefined,
      height: file.type.startsWith('image/') ? 800 : undefined,
      altText: undefined,
      caption: undefined,
      uploadedBy: {
        id: author.id,
        username: author.username,
        firstName: author.firstName,
        lastName: author.lastName,
        ...(author.avatarUrl && { avatarUrl: author.avatarUrl }),
      } as UserSummaryResponse,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockMedia.push(newMedia as unknown as MediaResponse);
    return HttpResponse.json(newMedia, { status: 201 });
  }),

  // PUT /api/v1/media/:id - Update media metadata
  http.put('/api/v1/media/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json() as UpdateMediaRequest;
    const index = mockMedia.findIndex(m => m.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    const media = mockMedia[index];
    if (!media) {
      return HttpResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    const updatedMedia = {
      id: media.id,
      fileName: media.fileName,
      originalFileName: media.originalFileName,
      fileUrl: media.fileUrl,
      contentType: media.contentType,
      fileSize: media.fileSize,
      mediaType: media.mediaType,
      width: media.width,
      height: media.height,
      altText: data.altText ?? media.altText,
      caption: data.caption ?? media.caption,
      uploadedBy: media.uploadedBy,
      uploadedAt: media.uploadedAt,
      updatedAt: new Date().toISOString(),
    };

    mockMedia[index] = updatedMedia as unknown as MediaResponse;
    return HttpResponse.json(updatedMedia);
  }),

  // DELETE /api/v1/media/:id - Delete media
  http.delete('/api/v1/media/:id', ({ params }) => {
    const { id } = params;
    const index = mockMedia.findIndex(m => m.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    mockMedia.splice(index, 1);
    return HttpResponse.json({ message: 'Media deleted successfully' });
  }),
];

// Export all handlers
export const handlers = [
  ...blogPostHandlers,
  ...tagHandlers,
  ...userHandlers,
  ...mediaHandlers,
];
