import React from 'react';

const BlogSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative max-w-xl">
      <input
        type="search"
        placeholder="Search posts…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] py-3 pl-4 pr-10 text-[var(--text)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--border-strong)]"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)]"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default BlogSearch;
