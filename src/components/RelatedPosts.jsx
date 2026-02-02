import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

const RelatedPosts = ({ currentPost, posts, setCurrentPage }) => {
  const relatedPosts = useMemo(() => {
    if (!currentPost || !posts) return [];

    // Find posts with similar tags or same category
    const related = posts
      .filter(post => {
        if (post.id === currentPost.id) return false;
        
        // Check for tag overlap
        const currentTags = currentPost.tags || [];
        const postTags = post.tags || [];
        const tagOverlap = currentTags.filter(tag => postTags.includes(tag)).length;
        
        // Check category match
        const categoryMatch = post.category === currentPost.category;
        
        return tagOverlap > 0 || categoryMatch;
      })
      .sort((a, b) => {
        // Prioritize by tag overlap, then category match
        const aTags = a.tags || [];
        const bTags = b.tags || [];
        const currentTags = currentPost.tags || [];
        
        const aOverlap = aTags.filter(tag => currentTags.includes(tag)).length;
        const bOverlap = bTags.filter(tag => currentTags.includes(tag)).length;
        
        if (aOverlap !== bOverlap) return bOverlap - aOverlap;
        if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
        if (b.category === currentPost.category && a.category !== currentPost.category) return 1;
        return 0;
      })
      .slice(0, 3);

    return related;
  }, [currentPost, posts]);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="border-t border-gray-700 pt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <BlogCard
              post={post}
              onClick={() => setCurrentPage(`blog-${post.slug}`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
