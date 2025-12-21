'use client';

import Link from 'next/link';
import { Button, Typography, Chip, Avatar } from "aurigami";
import { useBlogPosts, PostStatus } from "@repo/api";
import { Search } from 'lucide-react';
import { useState } from 'react';
import * as styles from './page.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useBlogPosts({
    // status: PostStatus.PUBLISHED,  // Show all posts regardless of status
    page: 0,
    size: 10,
  });

  const featuredPost = data?.content.find(post => post.featured);
  // Show all posts except the one displayed in the hero
  const regularPosts = data?.content.filter(post => post.id !== featuredPost?.id) || [];

  // Filter posts based on search query
  const filteredPosts = regularPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      {/* Background image layer */}
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundOverlay} />

      {/* Content layer */}
      <div className={styles.contentLayer}>
        {/* Hero Section - Split Layout */}
        <section className={styles.heroSection}>
          {/* Left side - Title, subtitle, search */}
          <div className={styles.heroLeft}>
            <Typography variant="h1" className={styles.heroTitle}>
              The Dev Journal
            </Typography>
            <Typography variant="p" className={styles.heroSubtitle}>
              Exploring web development, design, and technology. Curated articles for developers.
            </Typography>
            
            {/* Search Bar */}
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Right side - Featured Post Card */}
          <div className={styles.heroRight}>
            {featuredPost ? (
              <Link href={`/posts/${featuredPost.slug}`} className={styles.featuredCardLink}>
                <article className={styles.featuredCard}>
                  {featuredPost.featuredImageUrl && (
                    <div className={styles.featuredImageContainer}>
                      <img
                        src={featuredPost.featuredImageUrl}
                        alt={featuredPost.title}
                        className={styles.featuredImage}
                      />
                      <Chip variant="featured" size="sm" className={styles.featuredBadge}>
                        Featured
                      </Chip>
                    </div>
                  )}
                  <div className={styles.featuredContent}>
                    <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                    {featuredPost.excerpt && (
                      <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                    )}
                    <div className={styles.featuredMeta}>
                      <Avatar
                        src={featuredPost.author.avatarUrl}
                        alt={`${featuredPost.author.firstName} ${featuredPost.author.lastName}`}
                        size="sm"
                      />
                      <span className={styles.featuredAuthor}>
                        {featuredPost.author.firstName} {featuredPost.author.lastName}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ) : (
              <div className={styles.featuredPlaceholder}>
                <Typography variant="caption">No featured post</Typography>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Main Content - Posts List */}
        <main className={styles.mainContent}>
          <Typography variant="h3" className={styles.sectionTitle}>
            Latest Articles
          </Typography>

          {isLoading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner} />
              <Typography variant="caption">Loading posts...</Typography>
            </div>
          )}

          {error && (
            <div className={styles.errorBox}>
              <Typography variant="p">
                Error loading posts: {error.message}
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

          {data && regularPosts.length === 0 && !searchQuery && (
            <div className={styles.emptyState}>
              <Typography variant="h3">No posts yet</Typography>
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
