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
import * as S from './page.styles';

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
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.slug) newErrors.slug = 'Slug is required';
    if (!formData.mdxContent) newErrors.mdxContent = 'Content is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
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
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.HeaderInner>
          <S.HeaderContent>
            <S.HeaderLeft>
              <Button
                variant="ghost"
                size="md"
                onClick={() => router.back()}
                leftIcon={<ChevronLeft size={18} />}
              >
                Back
              </Button>
              <S.HeaderTitles>
                <Typography variant="h2">Create New Post</Typography>
                <Typography variant="caption">
                  Fill in the details below to publish your blog post
                </Typography>
              </S.HeaderTitles>
            </S.HeaderLeft>

            <S.HeaderRight>
              <Chip variant={formData.status === PostStatus.PUBLISHED ? 'default' : 'outlined'}>
                {formData.status === PostStatus.PUBLISHED ? '✅ Published' : '📄 Draft'}
              </Chip>
            </S.HeaderRight>
          </S.HeaderContent>
        </S.HeaderInner>
      </S.Header>

      {/* Form */}
      <S.FormContainer>
        <Form onSubmit={handleSubmit}>
          <S.FormGrid>
            {/* Main Content - 2/3 width */}
            <S.MainColumn>
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
                    leftIcon={<MessageSquare size={16} />}
                  />

                  <Input
                    label="Slug"
                    placeholder="post-url-slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    helper="URL-friendly version of the title (auto-generated if left empty)"
                    fullWidth
                    leftIcon={<LinkIcon size={16} />}
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
            </S.MainColumn>

            {/* Sidebar - 1/3 width */}
            <S.Sidebar>
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

                  <S.FeaturedToggle>
                    <S.ToggleText>
                      <Typography variant="p" style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                        Featured Post
                      </Typography>
                      <Typography variant="caption">
                        Show on homepage
                      </Typography>
                    </S.ToggleText>
                    <S.ToggleSwitch>
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                      />
                      <span />
                    </S.ToggleSwitch>
                  </S.FeaturedToggle>
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
                    <S.TagsContainer>
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
                    </S.TagsContainer>
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
            </S.Sidebar>
          </S.FormGrid>

          {/* Form Actions */}
          <S.FormActionsCard>
            <Card padding="md">
              <FormActions align="between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                
                <S.FormActionsButtons>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      handleInputChange('status', PostStatus.DRAFT);
                      setTimeout(handleSubmit, 0);
                    }}
                    loading={createPost.isPending}
                    leftIcon={<Check size={16} />}
                  >
                    Save as Draft
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="success"
                    loading={createPost.isPending}
                    leftIcon={<Bell size={16} />}
                  >
                    Publish Post
                  </Button>
                </S.FormActionsButtons>
              </FormActions>
            </Card>
          </S.FormActionsCard>
        </Form>
      </S.FormContainer>
    </S.Container>
  );
}
