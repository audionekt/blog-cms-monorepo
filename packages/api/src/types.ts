// Enums matching Spring Boot backend
export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SCHEDULED = 'SCHEDULED',
  ARCHIVED = 'ARCHIVED'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  EDITOR = 'EDITOR'
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  AUDIO = 'AUDIO'
}

// User DTOs
export interface UserSummaryResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  role?: UserRole;
  active?: boolean;
}

// Tag DTOs
export interface TagSummaryResponse {
  id: number;
  name: string;
  slug: string;
}

export interface TagResponse {
  id: number;
  name: string;
  slug: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTagRequest {
  name: string;
  slug: string;
}

export interface UpdateTagRequest {
  name?: string;
  slug?: string;
}

// Media DTOs
export interface MediaSummaryResponse {
  id: number;
  fileName: string;
  fileUrl: string;
  contentType: string;
  mediaType: MediaType;
}

export interface MediaResponse {
  id: number;
  fileName: string;
  originalFileName: string;
  fileUrl: string;
  contentType: string;
  fileSize: number;
  mediaType: MediaType;
  width?: number;
  height?: number;
  altText?: string;
  caption?: string;
  uploadedBy?: UserSummaryResponse;
  uploadedAt: string;
  updatedAt: string;
}

export interface UpdateMediaRequest {
  altText?: string;
  caption?: string;
}

// Blog Post DTOs
export interface BlogPostSummaryResponse {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  author: UserSummaryResponse;
  tags: TagSummaryResponse[];
  status: PostStatus;
  publishedAt?: string;
  viewCount: number;
  readingTimeMinutes?: number;
  featured: boolean;
  createdAt: string;
}

export interface BlogPostResponse {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  mdxContent: string;
  author: UserSummaryResponse;
  tags: TagSummaryResponse[];
  status: PostStatus;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  publishedAt?: string;
  scheduledAt?: string;
  viewCount: number;
  readingTimeMinutes?: number;
  allowComments: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  excerpt?: string;
  mdxContent: string;
  tagIds?: number[];
  status?: PostStatus;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  scheduledAt?: string;
  readingTimeMinutes?: number;
  allowComments?: boolean;
  featured?: boolean;
}

export interface UpdateBlogPostRequest {
  title?: string;
  slug?: string;
  excerpt?: string;
  mdxContent?: string;
  tagIds?: number[];
  status?: PostStatus;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  scheduledAt?: string;
  readingTimeMinutes?: number;
  allowComments?: boolean;
  featured?: boolean;
}

// Query Parameters
export interface FetchBlogPostsParams {
  status?: PostStatus;
  tagId?: number;
  featured?: boolean;
  authorId?: number;
  page?: number;
  size?: number;
  sort?: string;
}

export interface FetchTagsParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface FetchUsersParams {
  role?: UserRole;
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export interface FetchMediaParams {
  mediaType?: MediaType;
  uploadedBy?: number;
  page?: number;
  size?: number;
  sort?: string;
}

// Paginated Response
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
