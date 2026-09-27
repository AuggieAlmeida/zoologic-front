const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

// Where /api/* is proxied to. The browser only ever calls its own origin, so
// the value is read here at build time and never reaches the client bundle.
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/$/, '')

/** @type {import('next').NextConfig} */
module.exports = (phase) => ({
  // The dev server gets its own cache. Production builds must always use the
  // standard .next directory so build and HMR never overwrite each other.
  distDir: phase === PHASE_DEVELOPMENT_SERVER
    ? (process.env.NEXT_DIST_DIR || '.next-dev')
    : '.next',
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_URL}/:path*` }]
  },
})
