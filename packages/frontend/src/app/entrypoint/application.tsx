import { WithChildren } from '@/shared/types'
import { ProgressBar }  from '../providers/progress-bar'
import { SeoProvider }  from '@/app/providers/seo'
import { EffectorNext } from '@effector/next'

export const Application = ({ children }: WithChildren) => {
  return (
    <html lang="en">
      <body>
        <EffectorNext>
          <SeoProvider>
            <ProgressBar>{children}</ProgressBar>
          </SeoProvider>
        </EffectorNext>
      </body>
    </html>
  )
}
