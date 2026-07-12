import React from 'react';
import ReadingTime from './ReadingTime';

const BlogCard = ({ post, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full flex-col border border-[var(--border)] bg-[var(--surface)] p-6 text-left transition-colors duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
        {post.category}
      </span>
      <h3 className="mt-3 text-lg font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-[var(--muted)] line-clamp-3">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
        <span>
          {new Date(post.publishedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <ReadingTime content={post.content} />
      </div>
    </button>
  );
};

export default BlogCard;
