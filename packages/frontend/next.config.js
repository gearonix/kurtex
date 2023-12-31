const withBundleAnalyzer = require('@next/bundle-analyzer')
const withPWA = require('next-pwa')
const { composePlugins: nxComposePlugins, withNx } = require('@nx/next')
const withGraphql = require('next-plugin-graphql')
const withNextCircularDeps = require('next-circular-dependency')

// TODO: resolve PWA and bundleAnalyzer issues
const nextConfig = {
  nx: {
    svgr: false
  },
  webpack: (config) => {
    return config
  }
}

module.exports = nxComposePlugins(
  withNx,
  withGraphql,
  withNextCircularDeps
)(nextConfig)
