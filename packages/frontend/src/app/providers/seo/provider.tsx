'use client'

import { NextSeo } from 'next-seo'
import { config } from '@/app/providers/seo/config'
import { WithChildren } from '@/shared/types'

export const SeoProvider = ({ children }: WithChildren) => {
  return (
    <>
      <NextSeo
        nofollow
        noindex
        title={config.title}
        description={config.description}
        openGraph={{
          description: config.description,
          title: config.title
        }}
        additionalMetaTags={config.meta}
        additionalLinkTags={[
          {
            href: config.faviconPath,
            rel: 'icon'
          }
        ]}
      />
      {children}
    </>
  )
}
