"use client";

import Link from "next/link";
import { Button, Typography, Input } from "aurigami";
import { useBlogPosts } from "@repo/api";
import { Search } from "lucide-react";
import { useState } from "react";
import * as S from "./page.styles";

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useBlogPosts({
    page: 0,
    size: 12,
  });

  const posts = data?.content || [];

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Popular categories for quick search
  const popularCategories = [
    "React",
    "TypeScript",
    "Design Systems",
    "Web Performance",
    "CSS",
    "Testing",
  ];

  return (
    <S.PageWrapper>
      {/* Background */}
      <S.BackgroundBlur />
      <S.BackgroundImage />
      <S.BackgroundOverlay />

      {/* Content layer */}
      <S.ContentLayer>
        {/* Hero Section */}
        <S.HeroSection>
          <S.HeroContent>
            <Typography variant="h1">Articles & Insights</Typography>
            <Typography variant="p">
              Explore articles about web development, design systems, and best
              practices.
            </Typography>

            {/* Search Bar */}
            <S.SearchContainer>
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={20} />}
                fullWidth
              />
            </S.SearchContainer>

            {/* Popular Categories */}
            <S.PopularSection>
              <S.PopularLabel>Popular:</S.PopularLabel>
              <S.PopularTags>
                {popularCategories.map((category) => (
                  <S.PopularTag
                    key={category}
                    onClick={() => setSearchQuery(category)}
                  >
                    {category}
                  </S.PopularTag>
                ))}
              </S.PopularTags>
            </S.PopularSection>
          </S.HeroContent>
        </S.HeroSection>

        {/* Divider */}
        <S.Divider />

        {/* Main Content - Posts List */}
        <S.MainContent>
          <Typography variant="h3">All Articles</Typography>

          {isLoading && (
            <S.LoadingContainer>
              <S.LoadingSpinner />
              <Typography variant="caption">Loading articles...</Typography>
            </S.LoadingContainer>
          )}

          {error && (
            <S.ErrorContainer>
              <Typography variant="p">
                Error loading articles: {error.message}
              </Typography>
            </S.ErrorContainer>
          )}

          {filteredPosts.length > 0 && (
            <S.ArticlesGrid>
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`}>
                  <S.ArticleCard>
                    <S.ArticleImageContainer>
                      <S.ArticleImagePlaceholder />
                    </S.ArticleImageContainer>
                    <S.ArticleContent>
                      <S.ArticleMeta>{post.readingTimeMinutes} min read</S.ArticleMeta>
                      <S.ArticleTitle>{post.title}</S.ArticleTitle>
                      {post.excerpt && <S.ArticleExcerpt>{post.excerpt}</S.ArticleExcerpt>}
                      <S.ArticleAuthor>
                        <S.ArticleAuthorName>
                          {post.author.firstName} {post.author.lastName}
                        </S.ArticleAuthorName>
                      </S.ArticleAuthor>
                    </S.ArticleContent>
                  </S.ArticleCard>
                </Link>
              ))}
            </S.ArticlesGrid>
          )}

          {filteredPosts.length === 0 && searchQuery && (
            <S.EmptyState>
              <Typography variant="h3">No results found</Typography>
              <Typography variant="p">Try a different search term</Typography>
            </S.EmptyState>
          )}

          {posts.length === 0 && !searchQuery && !isLoading && (
            <S.EmptyState>
              <Typography variant="h3">No articles yet</Typography>
              <Typography variant="p">
                Check back soon for new content!
              </Typography>
            </S.EmptyState>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <S.PaginationContainer>
              <S.PaginationInfo>
                <Typography variant="caption">
                  Page {data.number + 1} of {data.totalPages}
                </Typography>
              </S.PaginationInfo>
              <S.PaginationButtons>
                <Button variant="secondary" size="sm" disabled={data.first}>
                  Previous
                </Button>
                <Button variant="secondary" size="sm" disabled={data.last}>
                  Next
                </Button>
              </S.PaginationButtons>
            </S.PaginationContainer>
          )}
        </S.MainContent>
      </S.ContentLayer>
    </S.PageWrapper>
  );
}
