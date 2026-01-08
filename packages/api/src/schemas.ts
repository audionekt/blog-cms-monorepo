import { z } from 'zod';

// Enum Schemas
export const PostStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED']);
export const UserRoleSchema = z.enum(['ADMIN', 'AUTHOR', 'EDITOR']);
export const MediaTypeSchema = z.enum(['IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO']);

// User Schemas
export const UserSummaryResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.string().optional(),
});

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  role: UserRoleSchema,
  active: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3).max(30),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  role: UserRoleSchema.optional(),
});

export const UpdateUserRequestSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  role: UserRoleSchema.optional(),
  active: z.boolean().optional(),
});

// Tag Schemas
export const TagSummaryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export const TagResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  postCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateTagRequestSchema = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export const UpdateTagRequestSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
});

// Media Schemas
export const MediaSummaryResponseSchema = z.object({
  id: z.number(),
  fileName: z.string(),
  fileUrl: z.string(),
  contentType: z.string(),
  mediaType: MediaTypeSchema,
});

export const MediaResponseSchema = z.object({
  id: z.number(),
  fileName: z.string(),
  originalFileName: z.string(),
  fileUrl: z.string(),
  contentType: z.string(),
  fileSize: z.number(),
  mediaType: MediaTypeSchema,
  width: z.number().optional(),
  height: z.number().optional(),
  altText: z.string().optional(),
  caption: z.string().optional(),
  uploadedBy: UserSummaryResponseSchema.optional(),
  uploadedAt: z.string(),
  updatedAt: z.string(),
});

export const UpdateMediaRequestSchema = z.object({
  altText: z.string().optional(),
  caption: z.string().optional(),
});

// Blog Post Schemas
export const BlogPostSummaryResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  author: UserSummaryResponseSchema,
  tags: z.array(TagSummaryResponseSchema),
  status: PostStatusSchema,
  publishedAt: z.string().optional(),
  viewCount: z.number(),
  readingTimeMinutes: z.number().optional(),
  featured: z.boolean(),
  createdAt: z.string(),
});

export const BlogPostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  mdxContent: z.string(),
  author: UserSummaryResponseSchema,
  tags: z.array(TagSummaryResponseSchema),
  status: PostStatusSchema,
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  publishedAt: z.string().optional(),
  scheduledAt: z.string().optional(),
  viewCount: z.number(),
  readingTimeMinutes: z.number().optional(),
  allowComments: z.boolean(),
  featured: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateBlogPostRequestSchema = z.object({
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().max(500).optional(),
  mdxContent: z.string().min(1),
  tagIds: z.array(z.number()).optional(),
  status: PostStatusSchema.optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.string().optional(),
  scheduledAt: z.string().optional(),
  readingTimeMinutes: z.number().positive().optional(),
  allowComments: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export const UpdateBlogPostRequestSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  slug: z.string().min(3).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  excerpt: z.string().max(500).optional(),
  mdxContent: z.string().min(1).optional(),
  tagIds: z.array(z.number()).optional(),
  status: PostStatusSchema.optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.string().optional(),
  scheduledAt: z.string().optional(),
  readingTimeMinutes: z.number().positive().optional(),
  allowComments: z.boolean().optional(),
  featured: z.boolean().optional(),
});

// Page Response Schema
export const PageResponseSchema = <T extends z.ZodTypeAny>(contentSchema: T) =>
  z.object({
    content: z.array(contentSchema),
    totalElements: z.number(),
    totalPages: z.number(),
    size: z.number(),
    number: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  });
