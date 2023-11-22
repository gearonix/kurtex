const withBundleAnalyzer = require('@next/bundle-analyzer')
const withPWA = require('next-pwa')
const { withNx, composePlugins: nxComposePlugins } = require('@nx/next')
const composePlugins = require('next-compose-plugins')

const isDev = (process.env.NODE_ENV = 'development')

const nextConfig = withPWA(
  {
    nx: {
      svgr: false
    },
    webpack: (config, { defaultLoaders }) => {
      return config
    }
  },
  {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: isDev,
    sw: '/public/service-worker.js'
  }
)

module.exports = nxComposePlugins(withNx)(nextConfig)
