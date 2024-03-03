import { EffectorNext } from '@effector/next'
import { NavigationProvider } from '@/app/providers/navigation'
import { ProgressBar } from '@/app/providers/progress-bar'
import { SeoProvider } from '@/app/providers/seo'
import { WithChildren } from '@/shared/types'

export const Application = ({ children }: WithChildren) => {
  return (
    <html lang="en">
      <body>
        <EffectorNext>
          <SeoProvider>
            <NavigationProvider />
            <ProgressBar />
            {children}
          </SeoProvider>
        </EffectorNext>
      </body>
    </html>
  )
}
