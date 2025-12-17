module.exports = {
  // Disable static export in dev mode to avoid dynamic route issues
  ...(process.env.NODE_ENV === 'production' && { output: "export" }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
  },
};
