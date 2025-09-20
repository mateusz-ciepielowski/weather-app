/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.weatherapi.com/**")],
  },
};

export default nextConfig;
