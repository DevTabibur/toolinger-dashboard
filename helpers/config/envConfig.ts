
// ! When the app is served over HTTPS, force any http:// backend URL to https://
// ! so the browser doesn't block the request as mixed content.
const upgradeToHttps = (url: string): string => {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    url.startsWith('http://')
  ) {
    return url.replace(/^http:\/\//, 'https://');
  }
  return url;
};

export const getBaseURL = (): string => {
  return upgradeToHttps(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || `http://localhost:5000/api`,
  );
};

export const getImageUrl = (): string => {
  return upgradeToHttps(
    process.env.NEXT_PUBLIC_IMAGE_URL || `http://localhost:5000`,
  );
};