import React from 'react';
import { motion } from 'framer-motion';
import ReadingTime from './ReadingTime';
import EnhancedCard from './reactbits/EnhancedCard';
import SpotlightCard from './reactbits/SpotlightCard';

const BlogCard = ({ post, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <EnhancedCard
        tilt={true}
        magnetic={true}
        gradientBorder={true}
        glow={true}
        className="h-full"
      >
        <SpotlightCard
          className="p-6 relative overflow-hidden group h-full flex flex-col"
          spotlightColor="rgba(34, 197, 94, 0.3)"
        >
          {/* Cover Image */}
          {post.coverImage && (
            <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-800">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-green-600/20 text-green-400 text-xs font-semibold rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-4">
              <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <ReadingTime content={post.content} />
            </div>
            {post.featured && (
              <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-xs">
                Featured
              </span>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 text-gray-500 text-xs">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Hover Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </SpotlightCard>
      </EnhancedCard>
    </motion.div>
  );
};

export default BlogCard;
