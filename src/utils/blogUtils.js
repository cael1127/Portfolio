/**
 * Blog utility functions
 */

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get excerpt from content
 */
export const getExcerpt = (content, maxLength = 150) => {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Calculate reading time
 */
export const calculateReadingTime = (content) => {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  // Average reading speed: 200 words per minute
  return Math.ceil(words / 200);
};

/**
 * Generate slug from title
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Get related posts based on tags and category
 */
export const getRelatedPosts = (currentPost, allPosts, limit = 3) => {
  if (!currentPost || !allPosts) return [];

  const related = allPosts
    .filter(post => {
      if (post.id === currentPost.id) return false;
      
      const currentTags = currentPost.tags || [];
      const postTags = post.tags || [];
      const tagOverlap = currentTags.filter(tag => postTags.includes(tag)).length;
      const categoryMatch = post.category === currentPost.category;
      
      return tagOverlap > 0 || categoryMatch;
    })
    .sort((a, b) => {
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
    .slice(0, limit);

  return related;
};

/**
 * Get all unique categories from posts
 */
export const getCategories = (posts) => {
  const categories = [...new Set(posts.map(post => post.category))];
  return categories.sort();
};

/**
 * Get all unique tags from posts
 */
export const getTags = (posts) => {
  const tags = posts.flatMap(post => post.tags || []);
  const uniqueTags = [...new Set(tags)];
  const tagCounts = uniqueTags.map(tag => ({
    tag,
    count: tags.filter(t => t === tag).length
  }));
  return tagCounts.sort((a, b) => b.count - a.count);
};
