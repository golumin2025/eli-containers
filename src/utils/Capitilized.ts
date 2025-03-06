export const capitalizeFirstLetter = (str: string): string => {
  // Remove hyphens and split into words
  const words = str.replace(/-/g, ' ').split(' ');
  // Capitalize first letter of each word and join back
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};