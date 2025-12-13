'use client';

import { Typography, Button, Card } from "aurigami";
import { useBlogPosts } from "@repo/api";
import { useRouter } from 'next/navigation';
import { Plus, AlertCircle, FileText, CheckCircle, FilePen, Star } from 'lucide-react';
import { PostsTable } from '../components/posts-table';
import * as styles from './page.css';

export default function PostsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useBlogPosts({
    page: 0,
    size: 100,
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerTop}>
            <div className={styles.headerTitles}>
              <Typography variant="h1">
                Content Management
              </Typography>
              <Typography variant="p">
                Manage your blog posts and content
              </Typography>
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className={styles.svgIcon} />}
              onClick={() => router.push('/posts/new')}
            >
              New Post
            </Button>
          </div>

          {/* Stats Bar */}
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <FileText size={16} className={styles.statItemIconBlue} />
              <span className={styles.statItemValue}>{data?.totalElements || 0}</span>
              <span className={styles.statItemLabel}>Total</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <CheckCircle size={16} className={styles.statItemIconGreen} />
              <span className={styles.statItemValue}>{data?.content.filter(p => p.status === 'PUBLISHED').length || 0}</span>
              <span className={styles.statItemLabel}>Published</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <FilePen size={16} className={styles.statItemIconGray} />
              <span className={styles.statItemValue}>{data?.content.filter(p => p.status === 'DRAFT').length || 0}</span>
              <span className={styles.statItemLabel}>Drafts</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <Star size={16} className={styles.statItemIconYellow} />
              <span className={styles.statItemValue}>{data?.content.filter(p => p.featured).length || 0}</span>
              <span className={styles.statItemLabel}>Featured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingInner}>
              <div className={styles.spinner}></div>
              <Typography variant="p">
                Loading posts...
              </Typography>
            </div>
          </div>
        )}

        {error && (
          <Card padding="md">
            <div className={styles.errorContent}>
              <AlertCircle className={styles.errorIcon} />
              <div>
                <Typography variant="h3">
                  Error loading posts
                </Typography>
                <Typography variant="p">
                  {error.message}
                </Typography>
              </div>
            </div>
          </Card>
        )}

        {data && data.content.length === 0 && !isLoading && (
          <Card padding="lg">
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrapper}>
                <FileText size={32} />
              </div>
              <Typography variant="h2">
                No posts yet
              </Typography>
              <Typography variant="p" style={{ margin: '1rem 0 1.5rem' }}>
                Get started by creating your first blog post. Share your thoughts, ideas, and stories with the world.
              </Typography>
              <Button
                size="lg"
                onClick={() => router.push('/posts/new')}
                leftIcon={<Plus className={styles.svgIcon} />}
              >
                Create Your First Post
              </Button>
            </div>
          </Card>
        )}

        {data && data.content.length > 0 && (
          <PostsTable posts={data.content} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
