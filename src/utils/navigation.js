// Navigation utility for proper browser history management
export const createNavigationHandler = (setCurrentPage) => {
  return (page) => {
    console.log('Navigating to:', page);
    setCurrentPage(page);
    
    // Update browser history
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', url);
  };
};

// Back button handler for demo pages
export const createBackHandler = (setCurrentPage) => {
  return () => {
    console.log('Back button clicked - going to demo-organizer');
    setCurrentPage('demo-organizer');
  };
}; 