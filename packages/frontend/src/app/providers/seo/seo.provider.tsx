'use client'

import { WithChildren } from '@/shared/lib/interfaces'
import { NextSeo }      from 'next-seo'
import { seoConfig }    from '@/app/providers/seo/seo.config'

export const SeoProvider = ({ children }: WithChildren) => {
  return (
    <>
      <NextSeo
        nofollow
        noindex
        title={seoConfig.title}
        description={seoConfig.description}
        openGraph={{
          title: seoConfig.title,
          description: seoConfig.description
        }}
        additionalMetaTags={seoConfig.meta}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: seoConfig.faviconPath
          }
        ]}
      />
      {children}
    </>
  )
}
