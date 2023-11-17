import { WithChildren } from '@/shared/lib/interfaces'
import { ProgressBar }  from '../providers/progress-bar'
import { SeoProvider }  from '@/app/providers/seo'
import { EffectorNext } from '@effector/next'

export const Application = ({ children }: WithChildren) => {
  return (
    <html lang="en">
      <body>
        <SeoProvider>
          <ProgressBar>{children}</ProgressBar>
        </SeoProvider>
      </body>
    </html>
  )
}
