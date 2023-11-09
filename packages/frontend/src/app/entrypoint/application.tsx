import { WithChildren } from '@/shared/lib/interfaces'
import { ProgressBar }  from '../providers/progress-bar'

export const Application = ({ children }: WithChildren) => {
  return (
    <html lang="en">
      <body>
        <ProgressBar />
        {children}
      </body>
    </html>
  )
}
