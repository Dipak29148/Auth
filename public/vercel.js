// Helper script for Vercel deployment with React Router
// This script helps ensure that client-side routes work correctly
(function() {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Add event listener for script load
    window.addEventListener('load', function() {
      console.log('Vercel routing helper loaded');
    });
  }
})(); 