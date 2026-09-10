const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
module.exports = (phase) => ({
  // The dev server gets its own cache. Production builds must always use the
  // standard .next directory so build and HMR never overwrite each other.
  distDir: phase === PHASE_DEVELOPMENT_SERVER
    ? (process.env.NEXT_DIST_DIR || '.next-dev')
    : '.next',
  images: {
    domains: ['localhost'],
  },
})
