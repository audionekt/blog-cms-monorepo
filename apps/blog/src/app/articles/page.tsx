'use client';

import Link from 'next/link';
import { Button, Typography, Input } from "aurigami";
import { useBlogPosts } from "@repo/api";
import { Search } from 'lucide-react';
import { useState } from 'react';
import * as styles from './page.css';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useBlogPosts({
    page: 0,
    size: 12,
  });

  const posts = data?.content || [];

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Popular categories for quick search
  const popularCategories = ['React', 'TypeScript', 'Design Systems', 'Web Performance', 'CSS', 'Testing'];

  return (
    <div className={styles.pageWrapper}>
      {/* Background */}
      <div className={styles.backgroundBlur} />
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundOverlay} />

      {/* Content layer */}
      <div className={styles.contentLayer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <Typography variant="h1" className={styles.heroTitle}>
              Articles & Insights
            </Typography>
            <Typography variant="p" className={styles.heroSubtitle}>
              Explore articles about web development, design systems, and best practices.
            </Typography>
            
            {/* Search Bar */}
            <div className={styles.searchWrapper}>
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={20} />}
                fullWidth
                className={styles.searchInput}
              />
            </div>

            {/* Popular Categories */}
            <div className={styles.popularSection}>
              <span className={styles.popularLabel}>Popular:</span>
              <div className={styles.popularTags}>
                {popularCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSearchQuery(category)}
                    className={styles.popularTag}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Main Content - Posts List */}
        <main className={styles.mainContent}>
          <Typography variant="h3" className={styles.sectionTitle}>
            All Articles
          </Typography>

          {isLoading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner} />
              <Typography variant="caption">Loading articles...</Typography>
            </div>
          )}

          {error && (
            <div className={styles.errorBox}>
              <Typography variant="p">
                Error loading articles: {error.message}
              </Typography>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className={styles.postsGrid}>
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className={styles.postCardLink}
                >
                  <article className={styles.postCard}>
                    <div className={styles.postImageContainer}>
                      {post.featuredImageUrl ? (
                        <img
                          src={post.featuredImageUrl}
                          alt={post.title}
                          className={styles.postImage}
                        />
                      ) : (
                        <div className={styles.postImagePlaceholder} />
                      )}
                    </div>
                    <div className={styles.postCardContent}>
                      <span className={styles.readingTime}>
                        {post.readingTimeMinutes} min read
                      </span>
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      {post.excerpt && (
                        <p className={styles.postExcerpt}>{post.excerpt}</p>
                      )}
                      <div className={styles.postMeta}>
                        <span className={styles.authorName}>
                          {post.author.firstName} {post.author.lastName}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && searchQuery && (
            <div className={styles.emptyState}>
              <Typography variant="h3">No results found</Typography>
              <Typography variant="p">Try a different search term</Typography>
            </div>
          )}

          {posts.length === 0 && !searchQuery && !isLoading && (
            <div className={styles.emptyState}>
              <Typography variant="h3">No articles yet</Typography>
              <Typography variant="p">Check back soon for new content!</Typography>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className={styles.pagination}>
              <Typography variant="caption">
                Page {data.number + 1} of {data.totalPages}
              </Typography>
              <div className={styles.paginationButtons}>
                <Button variant="secondary" size="sm" disabled={data.first}>
                  Previous
                </Button>
                <Button variant="secondary" size="sm" disabled={data.last}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

