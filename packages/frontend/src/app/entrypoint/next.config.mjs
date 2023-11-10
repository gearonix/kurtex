import withBundleAnalyzer from '@next/bundle-analyzer'
import withPWA from 'next-pwa'
import { composePlugins, withNx } from '@nx/next'

const isDev = (process.env.NODE_ENV = 'development')

const nextConfig = {
  pageExtensions: ['page.tsx'],
  nx: {
    svgr: false
  }
}

const plugins = [
  withNx,
  withBundleAnalyzer,
  [
    withPWA,
    {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: isDev,
      sw: '/public/service-worker.js'
    }
  ]
]

module.exports = composePlugins(...plugins)(nextConfig)
