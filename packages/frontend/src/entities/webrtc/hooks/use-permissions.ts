import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { statusProvided } from '@/entities/webrtc/model'

export const usePermissions = () => {
  const provideStatus = useUnit(statusProvided)

  useEffect(() => {
    navigator.permissions
      .query({ name: 'camera' as PermissionName })
      .then((manager) => {
        manager.addEventListener('change', (ctx) => {
          const status = (ctx.currentTarget as PermissionStatus).state

          provideStatus(status)
        })
      })
  }, [])
}
