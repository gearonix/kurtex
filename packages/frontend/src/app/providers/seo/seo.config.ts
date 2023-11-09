import { NextSeoProps } from 'next-seo'

// TODO: add normal titles & descriptions
export const seoConfig = {
  title: 'Kurtex',
  description: 'Kurtex Description',
  meta: [
    {
      name: 'keywords',
      content: 'Kurtex Description'
    },
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }
  ] satisfies NextSeoProps['additionalMetaTags'],
  faviconPath: '/favicon.ico'
} as const
