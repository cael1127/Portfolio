import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import AuthorBio from './AuthorBio';
import ReadingTime from './ReadingTime';
import RelatedPosts from './RelatedPosts';
import SocialShare from './SocialShare';
import TableOfContents from './TableOfContents';
import usePageMeta from '../hooks/usePageMeta';

const BlogPost = ({ slug, setCurrentPage }) => {
  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug);
  }, [slug]);

  usePageMeta({ title: post?.title, description: post?.excerpt });

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-[var(--muted)] mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => setCurrentPage('blog')}
            className="bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-[var(--text)] px-6 py-2 rounded-lg transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-16">
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-[var(--muted)] text-sm mb-6">
              <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <ReadingTime content={post.content} />
              {post.updatedDate && post.updatedDate !== post.publishedDate && (
                <>
                  <span>•</span>
                  <span>Updated {new Date(post.updatedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[var(--surface)] text-[var(--text)] text-sm rounded-full border border-[var(--border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Cover Image */}
            {post.coverImage && (
              <div className="w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-[var(--surface)]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Social Share */}
            <div className="mb-8">
              <SocialShare post={post} />
            </div>
          </motion.header>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Table of Contents */}
              {post.content && post.content.length > 1000 && (
                <div className="mb-8">
                  <TableOfContents content={post.content} />
                </div>
              )}

              {/* Post Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert prose-lg max-w-none mb-12"
              >
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </motion.div>

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <AuthorBio author={post.author} />
              </motion.div>

              {/* Social Share Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-12"
              >
                <div className="border-t border-[var(--border)] pt-8">
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-4">Share this post</h3>
                  <SocialShare post={post} />
                </div>
              </motion.div>

              {/* Related Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <RelatedPosts currentPost={post} posts={blogPosts} setCurrentPage={setCurrentPage} />
              </motion.div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
