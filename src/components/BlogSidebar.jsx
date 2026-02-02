import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './reactbits/GlassCard';

const BlogSidebar = ({ selectedCategory, setSelectedCategory, selectedTag, setSelectedTag, posts, setCurrentPage }) => {
  // Get all unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map(post => post.category))];
    return cats.sort();
  }, [posts]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = posts.flatMap(post => post.tags || []);
    const uniqueTags = [...new Set(tags)];
    // Count tag frequency
    const tagCounts = uniqueTags.map(tag => ({
      tag,
      count: tags.filter(t => t === tag).length
    }));
    return tagCounts.sort((a, b) => b.count - a.count).slice(0, 20);
  }, [posts]);

  // Get recent posts
  const recentPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, 5);
  }, [posts]);

  return (
    <div className="space-y-6">
      {/* Categories */}
      <GlassCard className="p-6" glow>
        <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Recent Posts */}
      <GlassCard className="p-6" glow>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
              onClick={() => {
                if (setCurrentPage) {
                  setCurrentPage(`blog-${post.slug}`);
                }
              }}
            >
              <h4 className="text-sm font-semibold text-white mb-1 hover:text-green-400 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-400">
                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Tag Cloud */}
      <GlassCard className="p-6" glow>
        <h3 className="text-xl font-semibold text-white mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tag} ({count})
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default BlogSidebar;
