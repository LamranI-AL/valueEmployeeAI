/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "lh3.googleusercontent.com", "images.unsplash.com"],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
