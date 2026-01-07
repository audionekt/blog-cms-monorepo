"use client";

import { use } from "react";
import Link from "next/link";
import { Button, Typography, Chip, Avatar } from "aurigami";
import { useBlogPostBySlug } from "@repo/api";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = use(params);
  const { data: post, isLoading, error } = useBlogPostBySlug(slug);

  if (isLoading) {
    return (
      <div>
        <div>
          <div />
          <Typography variant="caption">Loading post...</Typography>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div>
        <div>
          <Typography variant="h2">Post not found</Typography>
          <Typography variant="p">
            The post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </Typography>
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div>
      {/* Hero Section - Clean & Minimal */}
      <section>
        {/* Back Link */}
        <Link href="/articles">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to articles</span>
        </Link>

        <div>
          <header>
            {post.tags.length > 0 && (
              <div>
                {post.tags.map((tag) => (
                  <span key={tag.id}>{tag.name}</span>
                ))}
              </div>
            )}

            <h1>{post.title}</h1>

            {post.excerpt && <p>{post.excerpt}</p>}

            <div>
              <div>
                <Avatar
                  src={post.author.avatarUrl}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                  size="md"
                />
                <div>
                  <div>
                    {post.author.firstName} {post.author.lastName}
                  </div>
                  <div>
                    {formattedDate && <span>{formattedDate}</span>}
                    {post.readingTimeMinutes && (
                      <>
                        <span>•</span>
                        <span>{post.readingTimeMinutes} min read</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>

      {/* Content */}
      <article>
        <div>
          <MarkdownRenderer content={post.mdxContent} />
        </div>

        {/* Footer */}
        <footer>
          <div>
            <div>Tagged in</div>
            <div>
              {post.tags.map((tag) => (
                <Chip key={tag.id} size="sm" variant="outlined">
                  {tag.name}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <Link href="/articles">
              <Button variant="secondary">← Back to articles</Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}

// Simple markdown renderer component
function MarkdownRenderer({ content }: { content: string }) {
  // Parse markdown to HTML-like structure
  const parseMarkdown = (md: string): React.ReactNode[] => {
    const lines = md.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = "";
    let listItems: string[] = [];
    let listType: "ul" | "ol" | null = null;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType === "ol" ? "ol" : "ul";
        elements.push(
          <ListTag key={elements.length}>
            {listItems.map((item, i) => (
              <li key={i}>{parseInline(item)}</li>
            ))}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line?.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre key={elements.length}>
              <code data-language={codeBlockLang}>
                {codeBlockContent.join("\n")}
              </code>
            </pre>
          );
          codeBlockContent = [];
          codeBlockLang = "";
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
          codeBlockLang = line.slice(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line ?? "");
        continue;
      }

      // Empty lines
      if (line?.trim() === ("" as string) || line === null) {
        flushList();
        continue;
      } else {
        flushList();
      }

      // Headers
      if (line?.startsWith("# ")) {
        flushList();
        elements.push(
          <h1 key={elements.length}>{parseInline(line?.slice(2) ?? "")}</h1>
        );
        continue;
      }
      if (line?.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={elements.length}>{parseInline(line?.slice(3) ?? "")}</h2>
        );
        continue;
      }
      if (line?.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={elements.length}>{parseInline(line?.slice(4) ?? "")}</h3>
        );
        continue;
      }

      // Blockquotes
      if (line?.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote key={elements.length}>
            {parseInline(line?.slice(2) ?? "")}
          </blockquote>
        );
        continue;
      }

      // Images
      const imageMatch = line?.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        flushList();
        elements.push(
          <figure key={elements.length}>
            <img src={imageMatch[2]} alt={imageMatch[1]} />
            {imageMatch[1] && <figcaption>{imageMatch[1]}</figcaption>}
          </figure>
        );
        continue;
      }

      // Unordered lists
      if (line?.match(/^[-*] /)) {
        if (listType !== "ul") {
          flushList();
          listType = "ul";
        }
        listItems.push(line?.slice(2) ?? "");
        continue;
      }

      // Ordered lists
      if (line?.match(/^\d+\. /)) {
        if (listType !== "ol") {
          flushList();
          listType = "ol";
        }
        listItems.push(line?.replace(/^\d+\. /, "") ?? ("" as string));
        continue;
      }

      // Paragraphs
      flushList();
      elements.push(<p key={elements.length}>{parseInline(line ?? "")}</p>);
    }

    flushList();
    return elements;
  };

  // Parse inline markdown (bold, italic, code, links)
  const parseInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(
            parseInlineRest(remaining.slice(0, boldMatch.index), key++)
          );
        }
        parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
        continue;
      }

      // Inline code
      const codeMatch = remaining.match(/`([^`]+)`/);
      if (codeMatch && codeMatch.index !== undefined) {
        if (codeMatch.index > 0) {
          parts.push(
            parseInlineRest(remaining.slice(0, codeMatch.index), key++)
          );
        }
        parts.push(<code key={key++}>{codeMatch[1]}</code>);
        remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
        continue;
      }

      // Links
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch && linkMatch.index !== undefined) {
        if (linkMatch.index > 0) {
          parts.push(
            parseInlineRest(remaining.slice(0, linkMatch.index), key++)
          );
        }
        parts.push(
          <a
            key={key++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.slice(linkMatch.index + linkMatch[0].length);
        continue;
      }

      // No more matches, add rest as text
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    return parts.length === 1 ? parts[0] : parts;
  };

  const parseInlineRest = (text: string, key: number): React.ReactNode => {
    return <span key={key}>{text}</span>;
  };

  return <div>{parseMarkdown(content)}</div>;
}
