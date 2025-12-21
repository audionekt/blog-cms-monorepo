import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type {
  BlogPostResponse,
  BlogPostSummaryResponse,
  PageResponse,
  FetchBlogPostsParams,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
} from '@repo/api';

// Query keys for cache management
export const blogPostKeys = {
  all: ['blog-posts'] as const,
  lists: () => [...blogPostKeys.all, 'list'] as const,
  list: (params?: FetchBlogPostsParams) => [...blogPostKeys.lists(), params] as const,
  details: () => [...blogPostKeys.all, 'detail'] as const,
  detail: (id: number) => [...blogPostKeys.details(), id] as const,
  detailBySlug: (slug: string) => [...blogPostKeys.details(), 'slug', slug] as const,
};

/**
 * Fetch paginated blog posts with optional filtering
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useBlogPosts({
 *   status: PostStatus.PUBLISHED,
 *   page: 0,
 *   size: 10,
 * });
 * ```
 */
export function useBlogPosts(params?: FetchBlogPostsParams) {
  return useQuery({
    queryKey: blogPostKeys.list(params),
    queryFn: async () => {
      const response = await apiClient.get<PageResponse<BlogPostSummaryResponse>>(
        '/api/v1/posts',
        { params }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch a single blog post by ID
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useBlogPost(1);
 * ```
 */
export function useBlogPost(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: blogPostKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<BlogPostResponse>(
        `/api/v1/posts/${id}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Fetch a single blog post by slug
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useBlogPostBySlug('my-post-slug');
 * ```
 */
export function useBlogPostBySlug(slug: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: blogPostKeys.detailBySlug(slug),
    queryFn: async () => {
      const response = await apiClient.get<BlogPostResponse>(
        `/api/v1/posts/slug/${slug}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Create a new blog post
 * 
 * @example
 * ```tsx
 * const { mutate, isPending } = useCreateBlogPost();
 * 
 * const handleCreate = () => {
 *   mutate({
 *     title: 'New Post',
 *     slug: 'new-post',
 *     mdxContent: '# Content',
 *     status: PostStatus.DRAFT,
 *   });
 * };
 * ```
 */
export function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, authorId }: { data: CreateBlogPostRequest; authorId: number }) => {
      const response = await apiClient.post<BlogPostResponse>(
        `/api/v1/posts?authorId=${authorId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch blog posts list
      queryClient.invalidateQueries({ queryKey: blogPostKeys.lists() });
    },
  });
}

/**
 * Update an existing blog post
 * 
 * @example
 * ```tsx
 * const { mutate } = useUpdateBlogPost();
 * 
 * const handleUpdate = () => {
 *   mutate({
 *     id: 1,
 *     data: { title: 'Updated Title' }
 *   });
 * };
 * ```
 */
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateBlogPostRequest }) => {
      const response = await apiClient.put<BlogPostResponse>(
        `/api/v1/posts/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (updatedPost) => {
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: blogPostKeys.lists() });
      // Update the specific post in cache
      queryClient.setQueryData(
        blogPostKeys.detail(updatedPost.id),
        updatedPost
      );
      // Also invalidate slug-based query if slug changed
      if (updatedPost.slug) {
        queryClient.invalidateQueries({
          queryKey: blogPostKeys.detailBySlug(updatedPost.slug),
        });
      }
    },
  });
}

/**
 * Delete a blog post
 * 
 * @example
 * ```tsx
 * const { mutate, isPending } = useDeleteBlogPost();
 * 
 * const handleDelete = () => {
 *   mutate(1); // Delete post with ID 1
 * };
 * ```
 */
export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      console.log('[useDeleteBlogPost] Deleting post with id:', id, typeof id);
      await apiClient.delete(`/api/v1/posts/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: blogPostKeys.lists() });
      // Remove from cache
      queryClient.removeQueries({ queryKey: blogPostKeys.detail(deletedId) });
    },
  });
}

