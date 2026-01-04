'use client';

import Link from 'next/link';
import { Button, Typography } from "aurigami";
import { useBlogPosts } from "@repo/api";
import { ArrowRight, Layers, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import * as styles from './page.css';

export default function Home() {
  const { data } = useBlogPosts({
    page: 0,
    size: 3,
  });

  const latestPosts = data?.content.slice(0, 3) || [];

  // Testimonials data
  const testimonials = [
    {
      quote: "Arun has made a meaningful impact on the Design Systems team through his blend of technical strength and deep collaboration. He's gone far beyond the typical scope by embedding himself in product use cases, identifying gaps, and helping ensure that components function seamlessly across teams.",
      author: "Author",
      title: "Design Systems Team"
    },
    {
      quote: "Arun always goes above and beyond. Always looking to not just solve the problem, but make things better for everyone. Never does he shy away from a hard problem. I couldn't rate anyone higher in this regard.",
      author: "Author",
      title: "Automations Team"
    },
    {
      quote: "Arun has become an indispensable part of the DS team. Not only is he a strong design systems engineer, but he was also one of the first engineers on our team to get comfortable engineering in the platform. This combination of deep knowledge and sincere humility makes him SO good at addressing problems, changes and challenges.",
      author: "Author",
      title: "Engineering Team"
    },
    {
      quote: "It's been a pleasure working with Arun. He is a curious developer who asks thoughtful questions, delves into research opportunities and consistently delivers top-notch results. One of the most outstanding traits Arun brings is his innate ability to communicate.",
      author: "Author",
      title: "Product Design"
    },
    {
      quote: "Arun approaches challenges with curiosity, composure, and a genuine desire to improve things. He brings a calm, solutions-oriented mindset. He's open to feedback, eager to dive into unfamiliar areas, and never shies away from asking the harder, deeper questions that lead to better outcomes.",
      author: "Author",
      title: "Team Lead"
    },
    {
      quote: "Arun really leans into the headwinds when problems come up, and does so through clear communication and breaking down the problem. He has approached issues with seriousness, empathy, and solid debugging, leaving me with a better understanding of our code and better component design principles too.",
      author: "Author",
      title: "Cross-Functional Partner"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 500); // Fade out duration
    }, 10000); // 10 seconds per testimonial

    return () => clearInterval(interval);
  }, [testimonials.length]);

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
              Crafting digital <span className={styles.heroTitleAccent}>experiences</span> that matter.
            </Typography>
            <Typography variant="p" className={styles.heroSubtitle}>
              Hi, I'm a freelance web developer and software engineer building minimalist, high-performance interfaces for forward-thinking brands. I blend technical precision with creative direction.
            </Typography>
            
            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <Link href="/articles">
                <Button variant="primary" size="lg" className={styles.primaryCta}>
                  Read My Journal <ArrowRight size={20} />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className={styles.secondaryCta}>
                Let's Talk
              </Button>
            </div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="mailto:hello@example.com" className={styles.socialLink} aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Portrait Image */}
          <div className={styles.heroImageContainer}>
            <img
              src="/me.JPG"
              alt="Portrait"
              className={styles.heroImage}
            />
          </div>
        </section>

        {/* Methodology Section */}
        <section className={styles.methodologySection}>
          <div className={styles.methodologyHeader}>
            <span className={styles.sectionLabel}>MY METHODOLOGY</span>
            <Typography variant="h2" className={styles.sectionTitle}>
              How I Work
            </Typography>
          </div>

          <div className={styles.methodologyGrid}>
            <div className={styles.methodologyCard}>
              <div className={styles.methodologyIcon}>
                <Layers size={24} />
              </div>
              <h3 className={styles.methodologyTitle}>Collaborative</h3>
              <p className={styles.methodologyDescription}>
                I believe in the power of collaboration to create exceptional products. As an extension of your team, I immerse myself in your vision and goals. I work closely with you to develop a website that not only reflects your brand but exceeds your expectations.
              </p>
            </div>

            <div className={styles.methodologyCard}>
              <div className={styles.methodologyIcon}>
                <Zap size={24} />
              </div>
              <h3 className={styles.methodologyTitle}>Iterative</h3>
              <p className={styles.methodologyDescription}>
                I take an iterative approach in my work to ensure the final result aligns with your creative vision and reflects your unique brand identity. We'll work together to refine and fine-tune your site's design, leaving no detail overlooked.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <div className={styles.testimonialsHeader}>
            <span className={styles.sectionLabel}>TESTIMONIALS</span>
            <Typography variant="h2" className={styles.sectionTitle}>
              What People Say
            </Typography>
          </div>

          <div className={styles.carouselContainer}>
            {testimonials[currentTestimonial] && (
              <div className={`${styles.testimonialCard} ${isTransitioning ? styles.testimonialFadeOut : styles.testimonialFadeIn}`}>
                <p className={styles.testimonialQuote}>
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>A</div>
                  <div>
                    <div className={styles.authorName}>{testimonials[currentTestimonial].author}</div>
                    <div className={styles.authorTitle}>{testimonials[currentTestimonial].title}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentTestimonial(index);
                      setIsTransitioning(false);
                    }, 500);
                  }}
                  className={`${styles.indicator} ${index === currentTestimonial ? styles.indicatorActive : ''}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Writings Section */}
        {latestPosts.length > 0 && (
          <section className={styles.writingsSection}>
            <div className={styles.writingsHeader}>
              <div>
                <span className={styles.sectionLabel}>LATEST WRITINGS</span>
                <Typography variant="h2" className={styles.sectionTitle}>
                  From the Journal
                </Typography>
              </div>
              <Link href="/articles" className={styles.viewAllLink}>
                View all articles <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.writingsGrid}>
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className={styles.writingCard}
                >
                  {post.featuredImageUrl && (
                    <div className={styles.writingImageContainer}>
                      <img
                        src={post.featuredImageUrl}
                        alt={post.title}
                        className={styles.writingImage}
                      />
                    </div>
                  )}
                  <div className={styles.writingContent}>
                    <span className={styles.writingDate}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <h3 className={styles.writingTitle}>{post.title}</h3>
                    {post.excerpt && (
                      <p className={styles.writingExcerpt}>{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
