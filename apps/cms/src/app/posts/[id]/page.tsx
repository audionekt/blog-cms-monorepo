'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, MessageSquare, Link as LinkIcon, Check, Bell, Trash2 } from 'lucide-react';
import {
  Typography,
  Button,
  Input,
  TextArea,
  Dropdown,
  Form,
  FormSection,
  FormGrid,
  FormActions,
  Card,
  Chip,
  ImageUpload,
} from 'aurigami';
import { useBlogPost, useUpdateBlogPost, useDeleteBlogPost, useTags, useUploadMedia, PostStatus } from '@repo/api';
import type { UpdateBlogPostRequest } from '@repo/api';
import * as styles from '../new/page.css';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params.id);

  const { data: post, isLoading: isLoadingPost, error: loadError } = useBlogPost(postId);
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const uploadMedia = useUploadMedia();
  const { data: tagsData } = useTags({ page: 0, size: 100 });

  const [formData, setFormData] = useState<UpdateBlogPostRequest>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Initialize form data when post loads
  useEffect(() => {
    if (post && !isInitialized) {
      const initialData: UpdateBlogPostRequest = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        mdxContent: post.mdxContent,
        tagIds: post.tags.map((t) => t.id),
        status: post.status,
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        allowComments: post.allowComments,
        featured: post.featured,
      };
      // Only set optional fields if they have values
      if (post.featuredImageUrl) initialData.featuredImageUrl = post.featuredImageUrl;
      if (post.featuredMedia?.id) initialData.featuredMediaId = post.featuredMedia.id;
      if (post.readingTimeMinutes) initialData.readingTimeMinutes = post.readingTimeMinutes;
      
      setFormData(initialData);
      setIsInitialized(true);
    }
  }, [post, isInitialized]);

  const handleSubmit = async () => {
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.slug) newErrors.slug = 'Slug is required';
    if (!formData.mdxContent) newErrors.mdxContent = 'Content is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updatePost.mutateAsync({ 
        id: postId,
        data: formData,
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(postId);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleInputChange = (field: keyof UpdateBlogPostRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (isLoadingPost) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <Typography variant="p">Loading post...</Typography>
        </div>
      </div>
    );
  }

  if (loadError || !post) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem' }}>
          <Typography variant="h2">Post not found</Typography>
          <Typography variant="p">The post you're looking for doesn't exist or has been deleted.</Typography>
          <Button onClick={() => router.push('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <Button
                variant="ghost"
                size="md"
                onClick={() => router.back()}
                leftIcon={<ChevronLeft className={styles.svgIcon} />}
              >
                Back
              </Button>
              <div className={styles.headerTitles}>
                <Typography variant="h2">Edit Post</Typography>
                <Typography variant="caption">
                  Update your blog post details
                </Typography>
              </div>
            </div>

            <div className={styles.headerRight}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                leftIcon={<Trash2 className={styles.svgIcon} />}
                style={{ color: '#dc2626' }}
              >
                Delete
              </Button>
              <Chip variant={formData.status === PostStatus.PUBLISHED ? 'default' : 'outlined'}>
                {formData.status === PostStatus.PUBLISHED ? '✅ Published' : '📄 Draft'}
              </Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles.formContainer}>
        <Form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Main Content - 2/3 width */}
            <div className={styles.mainColumn}>
              <Card padding="md">
                <FormSection
                  title="Post Content"
                  description="Edit your blog post content"
                >
                  <Input
                    label="Title"
                    placeholder="Enter an engaging title..."
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={errors.title || ''}
                    required
                    fullWidth
                    leftIcon={<MessageSquare className={styles.svgIcon} />}
                  />

                  <Input
                    label="Slug"
                    placeholder="post-url-slug"
                    value={formData.slug || ''}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    error={errors.slug || ''}
                    helper="URL-friendly version of the title"
                    fullWidth
                    leftIcon={<LinkIcon className={styles.svgIcon} />}
                  />

                  <TextArea
                    label="Excerpt"
                    placeholder="A brief summary of your post..."
                    rows={3}
                    value={formData.excerpt || ''}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    helper="Short description shown in post previews (150-200 characters recommended)"
                    fullWidth
                  />

                  <TextArea
                    label="Content"
                    placeholder="Write your post content here. Supports MDX..."
                    rows={16}
                    value={formData.mdxContent || ''}
                    onChange={(e) => handleInputChange('mdxContent', e.target.value)}
                    error={errors.mdxContent || ''}
                    required
                    fullWidth
                    resize="vertical"
                  />
                </FormSection>
              </Card>

              <Card>
                <FormSection title="SEO & Metadata" description="Optimize your post for search engines">
                  <FormGrid columns={2}>
                    <Input
                      label="Meta Title"
                      placeholder="SEO title..."
                      value={formData.metaTitle || ''}
                      onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      helper="Shown in search results"
                      fullWidth
                    />

                    <Input
                      label="Reading Time (minutes)"
                      type="number"
                      placeholder="5"
                      value={formData.readingTimeMinutes || ''}
                      onChange={(e) => handleInputChange('readingTimeMinutes', parseInt(e.target.value) || undefined)}
                      helper="Estimated reading time"
                      fullWidth
                    />
                  </FormGrid>

                  <TextArea
                    label="Meta Description"
                    placeholder="Description for search engines..."
                    rows={2}
                    value={formData.metaDescription || ''}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    helper="Shown in search engine results (150-160 characters)"
                    fullWidth
                  />
                </FormSection>
              </Card>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className={styles.sidebar}>
              <Card padding="md">
                <FormSection title="Publish Settings">
                  <Dropdown
                    label="Status"
                    value={formData.status}
                    onChange={(value) => handleInputChange('status', value)}
                    options={[PostStatus.DRAFT, PostStatus.PUBLISHED, PostStatus.ARCHIVED]}
                    getItemLabel={(status) => {
                      if (!status) return '';
                      if (status === PostStatus.DRAFT) return '📄 Draft';
                      if (status === PostStatus.PUBLISHED) return '✅ Published';
                      if (status === PostStatus.ARCHIVED) return '📦 Archived';
                      return status;
                    }}
                    fullWidth
                  />

                  <div className={styles.featuredToggle}>
                    <div className={styles.toggleText}>
                      <Typography variant="p" style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                        Featured Post
                      </Typography>
                      <Typography variant="caption">
                        Show on homepage
                      </Typography>
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                        style={{
                          position: 'absolute',
                          width: '1px',
                          height: '1px',
                          padding: 0,
                          margin: '-1px',
                          overflow: 'hidden',
                          clip: 'rect(0, 0, 0, 0)',
                          whiteSpace: 'nowrap',
                          borderWidth: 0,
                        }}
                      />
                      <div style={{
                        width: '2.75rem',
                        height: '1.5rem',
                        backgroundColor: formData.featured ? '#2563eb' : '#d1d5db',
                        borderRadius: '9999px',
                        position: 'relative',
                        transition: 'background-color 0.2s',
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '2px',
                          left: formData.featured ? 'calc(100% - 1.25rem - 2px)' : '2px',
                          width: '1.25rem',
                          height: '1.25rem',
                          backgroundColor: 'white',
                          border: formData.featured ? '1px solid white' : '1px solid #d1d5db',
                          borderRadius: '9999px',
                          transition: 'left 0.2s',
                        }}></div>
                      </div>
                    </label>
                  </div>
                </FormSection>
              </Card>

              <Card padding="md">
                <FormSection title="Tags" description="Categorize your post">
                  <Dropdown
                    label="Select Tags"
                    value={undefined}
                    onChange={(tag) => {
                      if (tag && !Array.isArray(tag) && 'id' in tag && !formData.tagIds?.includes(tag.id)) {
                        handleInputChange('tagIds', [...(formData.tagIds || []), tag.id]);
                      }
                    }}
                    options={tagsData?.content || []}
                    getItemLabel={(tag) => (tag && 'name' in tag) ? tag.name : ''}
                    placeholder="Choose a tag..."
                    fullWidth
                  />

                  {formData.tagIds && formData.tagIds.length > 0 && (
                    <div className={styles.tagsContainer}>
                      {formData.tagIds.map((tagId) => {
                        const tag = tagsData?.content.find((t) => t.id === tagId);
                        return tag ? (
                          <Chip
                            key={tagId}
                            variant="default"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleInputChange(
                                'tagIds',
                                formData.tagIds?.filter((id) => id !== tagId)
                              );
                            }}
                          >
                            {tag.name} ×
                          </Chip>
                        ) : null;
                      })}
                    </div>
                  )}
                </FormSection>
              </Card>

              <Card padding="md">
                <FormSection title="Featured Image">
                  <ImageUpload
                    value={formData.featuredImageUrl || ''}
                    onFileSelect={async (file) => {
                      try {
                        const result = await uploadMedia.mutateAsync({ file });
                        handleInputChange('featuredImageUrl', result.fileUrl);
                        handleInputChange('featuredMediaId', result.id);
                      } catch (error) {
                        console.error('Failed to upload image:', error);
                      }
                    }}
                    onRemove={() => {
                      handleInputChange('featuredImageUrl', undefined);
                      handleInputChange('featuredMediaId', undefined);
                    }}
                    isUploading={uploadMedia.isPending}
                    error={uploadMedia.isError ? 'Failed to upload image' : ''}
                    helper="Upload a featured image for your post"
                  />
                </FormSection>
              </Card>

              {/* Post Info */}
              <Card padding="md">
                <FormSection title="Post Information">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Created:</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Updated:</span>
                      <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Views:</span>
                      <span>{post.viewCount.toLocaleString()}</span>
                    </div>
                    {post.publishedAt && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Published:</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </FormSection>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <Card padding="md" className={styles.formActionsCard}>
            <FormActions align="between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              
              <div className={styles.formActionsButtons}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    handleInputChange('status', PostStatus.DRAFT);
                    setTimeout(handleSubmit, 0);
                  }}
                  loading={updatePost.isPending}
                  leftIcon={<Check className={styles.svgIcon} />}
                >
                  Save as Draft
                </Button>
                
                <Button
                  type="submit"
                  variant="success"
                  loading={updatePost.isPending}
                  leftIcon={<Bell className={styles.svgIcon} />}
                >
                  {formData.status === PostStatus.PUBLISHED ? 'Update Post' : 'Publish Post'}
                </Button>
              </div>
            </FormActions>
          </Card>
        </Form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h3" style={{ marginBottom: '0.5rem' }}>
              Delete this post?
            </Typography>
            <Typography variant="p" style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              This action cannot be undone. "{post.title}" will be permanently deleted.
            </Typography>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <Button
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
                disabled={deletePost.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={handleDelete}
                loading={deletePost.isPending}
                style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
