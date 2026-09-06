import React, { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import BlogSidebar from './BlogSidebar';
import BlogSearch from './BlogSearch';
import WordReveal from './motion/WordReveal';
import Reveal from './motion/Reveal';
import { blogPosts } from '../data/blogPosts';
import usePageMeta from '../hooks/usePageMeta';

const Blog = ({ setCurrentPage }) => {
  usePageMeta({
    title: 'Blog',
    description:
      'Writing on full-stack engineering, AI, infrastructure, and security from Cael Findley.',
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategory, selectedTag, searchTerm]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (page - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, page]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;

  return (
    <div className="min-h-screen text-[var(--text)]">
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 grid-texture" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
          style={{ background: 'var(--hero-wash)' }}
          aria-hidden
        />
        <div className="page-shell relative pt-20 pb-14 md:pt-28 md:pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            Writing — {String(blogPosts.length).padStart(2, '0')} posts
          </p>
          <h1 className="display mt-5 text-mega text-[var(--text)]">
            <WordReveal text="Notebook" duration={0.7} />
          </h1>
          <Reveal delay={0.25} className="mt-6 max-w-xl text-sub text-[var(--muted)] text-balance">
            Notes on engineering, security, and shipping real systems.
          </Reveal>
        </div>
      </section>

      <div className="page-shell pt-12 pb-20">
        <div className="mb-10">
          <BlogSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="min-w-0 flex-1">
            {filteredPosts.length === 0 ? (
              <div className="py-16 text-center text-[var(--muted)]">No posts found.</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {paginatedPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onClick={() => setCurrentPage(`blog-${post.slug}`)}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)] disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)] disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <BlogSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            posts={blogPosts}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
