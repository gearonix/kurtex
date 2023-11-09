'use client'

import NextNProgress    from 'nextjs-progressbar'
import { WithChildren } from '@/shared/lib/interfaces'

export const ProgressBar = ({ children }: WithChildren) => {
  return (
    <>
      <NextNProgress height={3} options={{ showSpinner: false }} />
      {children}
    </>
  )
}
