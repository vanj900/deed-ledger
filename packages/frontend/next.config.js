/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // PWA configuration
  experimental: {
    // Enable Server Components
  },
  
  // For PWA, you'd add next-pwa here in production
  // const withPWA = require('next-pwa')({ dest: 'public' })
  // module.exports = withPWA(nextConfig)
}

module.exports = nextConfig
