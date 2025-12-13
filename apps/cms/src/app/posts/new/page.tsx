'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MessageSquare, Link as LinkIcon, Check, Bell } from 'lucide-react';
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
import { useCreateBlogPost, useTags, useUploadMedia, PostStatus } from '@repo/api';
import type { CreateBlogPostRequest } from '@repo/api';
import * as styles from './page.css';

export default function NewPostPage() {
  const router = useRouter();
  const createPost = useCreateBlogPost();
  const uploadMedia = useUploadMedia();
  const { data: tagsData } = useTags({ page: 0, size: 100 });

  const [formData, setFormData] = useState<Partial<CreateBlogPostRequest>>({
    title: '',
    slug: '',
    mdxContent: '',
    excerpt: '',
    status: PostStatus.DRAFT,
    featured: false,
    tagIds: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      // TODO: Get authorId from authenticated user context
      // For now, using authorId 1 (first user)
      await createPost.mutateAsync({ 
        data: formData as CreateBlogPostRequest, 
        authorId: 1 
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleInputChange = (field: keyof CreateBlogPostRequest, value: any) => {
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
                <Typography variant="h2">Create New Post</Typography>
                <Typography variant="caption">
                  Fill in the details below to publish your blog post
                </Typography>
              </div>
            </div>

            <div className={styles.headerRight}>
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
                  description="Write your blog post content here"
                >
                  <Input
                    label="Title"
                    placeholder="Enter an engaging title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={errors.title || ''}
                    required
                    fullWidth
                    leftIcon={<MessageSquare className={styles.svgIcon} />}
                  />

                  <Input
                    label="Slug"
                    placeholder="post-url-slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    helper="URL-friendly version of the title (auto-generated if left empty)"
                    fullWidth
                    leftIcon={<LinkIcon className={styles.svgIcon} />}
                  />

                  <TextArea
                    label="Excerpt"
                    placeholder="A brief summary of your post..."
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    helper="Short description shown in post previews (150-200 characters recommended)"
                    fullWidth
                  />

                  <TextArea
                    label="Content"
                    placeholder="Write your post content here. Supports MDX..."
                    rows={16}
                    value={formData.mdxContent}
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
                      value={formData.metaTitle}
                      onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      helper="Shown in search results"
                      fullWidth
                    />

                    <Input
                      label="Reading Time (minutes)"
                      type="number"
                      placeholder="5"
                      value={formData.readingTimeMinutes}
                      onChange={(e) => handleInputChange('readingTimeMinutes', parseInt(e.target.value))}
                      helper="Estimated reading time"
                      fullWidth
                    />
                  </FormGrid>

                  <TextArea
                    label="Meta Description"
                    placeholder="Description for search engines..."
                    rows={2}
                    value={formData.metaDescription}
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
                        checked={formData.featured}
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
                  loading={createPost.isPending}
                  leftIcon={<Check className={styles.svgIcon} />}
                >
                  Save as Draft
                </Button>
                
                <Button
                  type="submit"
                  variant="success"
                  loading={createPost.isPending}
                  leftIcon={<Bell className={styles.svgIcon} />}
                >
                  Publish Post
                </Button>
              </div>
            </FormActions>
          </Card>
        </Form>
      </div>
    </div>
  );
}

