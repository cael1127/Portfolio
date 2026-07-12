import React, { useMemo } from 'react';

const BlogSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  posts,
}) => {
  const categories = useMemo(() => {
    return [...new Set(posts.map((post) => post.category))].sort();
  }, [posts]);

  const allTags = useMemo(() => {
    const tags = posts.flatMap((post) => post.tags || []);
    const uniqueTags = [...new Set(tags)];
    return uniqueTags
      .map((tag) => ({ tag, count: tags.filter((t) => t === tag).length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);
  }, [posts]);

  const recentPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, 5);
  }, [posts]);

  return (
    <aside className="w-full shrink-0 space-y-8 lg:w-64">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
          Categories
        </h3>
        <div className="mt-3 space-y-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
              selectedCategory === 'all'
                ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
            }`}
          >
            All posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                selectedCategory === category
                  ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                  : 'text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
          Recent
        </h3>
        <ul className="mt-3 space-y-3">
          {recentPosts.map((post) => (
            <li key={post.id} className="text-sm text-[var(--muted)]">
              {post.title}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
          Tags
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {allTags.map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`rounded border px-2 py-1 font-mono text-[10px] ${
                selectedTag === tag
                  ? 'border-[var(--accent)] text-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-strong)]'
              }`}
            >
              {tag} ({count})
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
