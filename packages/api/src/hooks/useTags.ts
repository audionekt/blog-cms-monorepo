import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type {
  TagResponse,
  PageResponse,
  FetchTagsParams,
  CreateTagRequest,
  UpdateTagRequest,
} from '@repo/api';

export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (params?: FetchTagsParams) => [...tagKeys.lists(), params] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: number) => [...tagKeys.details(), id] as const,
  detailBySlug: (slug: string) => [...tagKeys.details(), 'slug', slug] as const,
};

/**
 * Fetch paginated tags
 */
export function useTags(params?: FetchTagsParams) {
  return useQuery({
    queryKey: tagKeys.list(params),
    queryFn: async () => {
      const response = await apiClient.get<PageResponse<TagResponse>>(
        '/api/v1/tags',
        { params }
      );
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes (tags change less frequently)
  });
}

/**
 * Fetch a single tag by ID
 */
export function useTag(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: tagKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<TagResponse>(`/api/v1/tags/${id}`);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Fetch a single tag by slug
 */
export function useTagBySlug(slug: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: tagKeys.detailBySlug(slug),
    queryFn: async () => {
      const response = await apiClient.get<TagResponse>(`/api/v1/tags/slug/${slug}`);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Create a new tag
 */
export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTagRequest) => {
      const response = await apiClient.post<TagResponse>('/api/v1/tags', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
    },
  });
}

/**
 * Update an existing tag
 */
export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateTagRequest }) => {
      const response = await apiClient.put<TagResponse>(`/api/v1/tags/${id}`, data);
      return response.data;
    },
    onSuccess: (updatedTag) => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      queryClient.setQueryData(tagKeys.detail(updatedTag.id), updatedTag);
    },
  });
}

/**
 * Delete a tag
 */
export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/v1/tags/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      queryClient.removeQueries({ queryKey: tagKeys.detail(deletedId) });
    },
  });
}

