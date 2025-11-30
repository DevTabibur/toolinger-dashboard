
export const getBaseURL = (): string => {
  return process.env.PUBLIC_BACKEND_BASE_URL || `http://localhost:5000/api`;
};

export const getImageUrl = (): string => {
  return process.env.IMAGE_URL || `http://localhost:5000`;
};