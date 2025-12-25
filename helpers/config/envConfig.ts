
export const getBaseURL = (): string => {
  return process.env.NEXT_PUBLIC_BACKEND_BASE_URL || `http://localhost:5000/api`;
}; 

export const getImageUrl = (): string => {
  return process.env.NEXT_PUBLIC_IMAGE_URL || `http://localhost:5000`;
};