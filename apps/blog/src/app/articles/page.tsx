"use client";

import Link from "next/link";
import { Button, Typography, Input } from "aurigami";
import { useBlogPosts } from "@repo/api";
import { Search } from "lucide-react";
import { useState } from "react";

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
    <div>
      {/* Background */}
      <div />
      <div />
      <div />

      {/* Content layer */}
      <div>
        {/* Hero Section */}
        <section>
          <div>
            <Typography variant="h1">Articles & Insights</Typography>
            <Typography variant="p">
              Explore articles about web development, design systems, and best
              practices.
            </Typography>

            {/* Search Bar */}
            <div>
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={20} />}
                fullWidth
              />
            </div>

            {/* Popular Categories */}
            <div>
              <span>Popular:</span>
              <div>
                {popularCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSearchQuery(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div />

        {/* Main Content - Posts List */}
        <main>
          <Typography variant="h3">All Articles</Typography>

          {isLoading && (
            <div>
              <div />
              <Typography variant="caption">Loading articles...</Typography>
            </div>
          )}

          {error && (
            <div>
              <Typography variant="p">
                Error loading articles: {error.message}
              </Typography>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div>
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`}>
                  <article>
                    <div>
                      {post.featuredImageUrl ? (
                        <img src={post.featuredImageUrl} alt={post.title} />
                      ) : (
                        <div />
                      )}
                    </div>
                    <div>
                      <span>{post.readingTimeMinutes} min read</span>
                      <h3>{post.title}</h3>
                      {post.excerpt && <p>{post.excerpt}</p>}
                      <div>
                        <span>
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
            <div>
              <Typography variant="h3">No results found</Typography>
              <Typography variant="p">Try a different search term</Typography>
            </div>
          )}

          {posts.length === 0 && !searchQuery && !isLoading && (
            <div>
              <Typography variant="h3">No articles yet</Typography>
              <Typography variant="p">
                Check back soon for new content!
              </Typography>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div>
              <Typography variant="caption">
                Page {data.number + 1} of {data.totalPages}
              </Typography>
              <div>
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
