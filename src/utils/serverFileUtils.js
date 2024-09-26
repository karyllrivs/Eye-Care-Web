export const getFile = (filename) =>
  `${import.meta.env.VITE_SERVER_BASE_URI}/api/file/${filename}`;
