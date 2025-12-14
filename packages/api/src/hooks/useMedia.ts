import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import type {
  MediaResponse,
  PageResponse,
  UpdateMediaRequest,
} from '@repo/api';

export const mediaKeys = {
  all: ['media'] as const,
  lists: () => [...mediaKeys.all, 'list'] as const,
  list: (params?: { page?: number; size?: number; mediaType?: string }) => 
    [...mediaKeys.lists(), params] as const,
  details: () => [...mediaKeys.all, 'detail'] as const,
  detail: (id: number) => [...mediaKeys.details(), id] as const,
};

/**
 * Fetch paginated media
 */
export function useMedia(params?: { page?: number; size?: number; mediaType?: string }) {
  return useQuery({
    queryKey: mediaKeys.list(params),
    queryFn: async () => {
      const response = await apiClient.get<PageResponse<MediaResponse>>(
        '/api/v1/media',
        { params }
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Fetch a single media by ID
 */
export function useMediaById(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: mediaKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<MediaResponse>(`/api/v1/media/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Upload a media file
 * 
 * @example
 * ```tsx
 * const { mutate, isPending } = useUploadMedia();
 * 
 * const handleUpload = (file: File) => {
 *   mutate({ file, altText: 'My image' });
 * };
 * ```
 */
export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      file, 
      altText, 
      caption 
    }: { 
      file: File; 
      altText?: string; 
      caption?: string;
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      if (altText) formData.append('altText', altText);
      if (caption) formData.append('caption', caption);

      const response = await apiClient.post<MediaResponse>(
        '/api/v1/media/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
    },
  });
}

/**
 * Update media metadata
 */
export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateMediaRequest }) => {
      const response = await apiClient.put<MediaResponse>(
        `/api/v1/media/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (updatedMedia) => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      queryClient.setQueryData(mediaKeys.detail(updatedMedia.id), updatedMedia);
    },
  });
}

/**
 * Delete media
 */
export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/v1/media/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: mediaKeys.lists() });
      queryClient.removeQueries({ queryKey: mediaKeys.detail(deletedId) });
    },
  });
}

