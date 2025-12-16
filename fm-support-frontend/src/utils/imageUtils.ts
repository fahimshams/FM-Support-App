// Utility function to resolve image URLs
// Images in public folder should be served directly by the frontend
// Images from backend API should use BASE_URL

export function resolveImageUrl(image: string | undefined, baseUrl?: string): string {
  if (!image) return "";

  // If image is already a full URL (http/https), use it as is
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // If image starts with "/", it's a public path - serve directly from frontend
  if (image.startsWith("/")) {
    return image;
  }

  // Otherwise, if baseUrl is provided, prepend it (for backend-served images)
  if (baseUrl) {
    return `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`;
  }

  // Default: treat as public path
  return image.startsWith("/") ? image : `/${image}`;
}

