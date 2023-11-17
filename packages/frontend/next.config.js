const withBundleAnalyzer = require('@next/bundle-analyzer')
const withPWA = require('next-pwa')
const { withNx } = require('@nx/next')
const composePlugins = require('next-compose-plugins')

const isDev = (process.env.NODE_ENV = 'development')

const nextConfig = {
  nx: {
    svgr: false
  }
}

const plugins = [
  [withNx],
  [withBundleAnalyzer],
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

module.exports = composePlugins(plugins, nextConfig)
