'use client';

import { Typography, Button, Card } from "aurigami";
import { useBlogPosts } from "@repo/api";
import { useRouter } from 'next/navigation';
import { Plus, AlertCircle, FileText, CheckCircle, FilePen, Star } from 'lucide-react';
import { PostsTable } from '../components/posts-table';
import * as S from './page.styles';

export default function PostsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useBlogPosts({
    page: 0,
    size: 100,
  });

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.HeaderInner>
          <S.HeaderTop>
            <S.HeaderTitles>
              <Typography variant="h1">
                Content Management
              </Typography>
              <Typography variant="p">
                Manage your blog posts and content
              </Typography>
            </S.HeaderTitles>
            <Button
              size="lg"
              leftIcon={<Plus />}
              onClick={() => router.push('/posts/new')}
            >
              New Post
            </Button>
          </S.HeaderTop>

          {/* Stats Bar */}
          <S.StatsBar>
            <S.StatItem>
              <S.StatItemIconBlue as={FileText} size={20} />
              <S.StatItemValue>{data?.totalElements || 0}</S.StatItemValue>
              <S.StatItemLabel>Total</S.StatItemLabel>
            </S.StatItem>
            <S.StatDivider />
            <S.StatItem>
              <S.StatItemIconGreen as={CheckCircle} size={20} />
              <S.StatItemValue>{data?.content.filter(p => p.status === 'PUBLISHED').length || 0}</S.StatItemValue>
              <S.StatItemLabel>Published</S.StatItemLabel>
            </S.StatItem>
            <S.StatDivider />
            <S.StatItem>
              <S.StatItemIconGray as={FilePen} size={20} />
              <S.StatItemValue>{data?.content.filter(p => p.status === 'DRAFT').length || 0}</S.StatItemValue>
              <S.StatItemLabel>Drafts</S.StatItemLabel>
            </S.StatItem>
            <S.StatDivider />
            <S.StatItem>
              <S.StatItemIconYellow as={Star} size={20} />
              <S.StatItemValue>{data?.content.filter(p => p.featured).length || 0}</S.StatItemValue>
              <S.StatItemLabel>Featured</S.StatItemLabel>
            </S.StatItem>
          </S.StatsBar>
        </S.HeaderInner>
      </S.Header>

      {/* Content */}
      <S.Content>
        {isLoading && (
          <S.LoadingContainer>
            <S.LoadingInner>
              <S.Spinner />
              <Typography variant="p">
                Loading posts...
              </Typography>
            </S.LoadingInner>
          </S.LoadingContainer>
        )}

        {error && (
          <Card padding="md">
            <S.ErrorContent>
              <S.ErrorIcon as={AlertCircle} />
              <div>
                <Typography variant="h3">
                  Error loading posts
                </Typography>
                <Typography variant="p">
                  {error.message}
                </Typography>
              </div>
            </S.ErrorContent>
          </Card>
        )}

        {data && data.content.length === 0 && !isLoading && (
          <Card padding="lg">
            <S.EmptyState>
              <S.EmptyIconWrapper>
                <FileText size={32} />
              </S.EmptyIconWrapper>
              <Typography variant="h2">
                No posts yet
              </Typography>
              <Typography variant="p" style={{ margin: '1rem 0 1.5rem' }}>
                Get started by creating your first blog post. Share your thoughts, ideas, and stories with the world.
              </Typography>
              <Button
                size="lg"
                onClick={() => router.push('/posts/new')}
                leftIcon={<Plus />}
              >
                Create Your First Post
              </Button>
            </S.EmptyState>
          </Card>
        )}

        {data && data.content.length > 0 && (
          <PostsTable posts={data.content} isLoading={isLoading} />
        )}
      </S.Content>
    </S.Container>
  );
}
