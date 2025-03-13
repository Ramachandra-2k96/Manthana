export function formatDate(dateString?: string): string {
  if (!dateString) return 'No date';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'Invalid date';
  
  // Format: "Jan 15, 2023"
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
} 