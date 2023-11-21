import { useUnit }        from 'effector-react'
import { statusProvided } from '@/entities/webrtc/model/permissions'

export const usePermissions = () => {
  const provideStatus = useUnit(statusProvided)

  return () => {
    navigator.permissions.query({ name: 'camera' as PermissionName }).then((
      manager
    ) => {
      manager.addEventListener('change', (ctx) => {
        const status = (ctx.currentTarget as PermissionStatus).state

        provideStatus(status)
      })
    })
  }
}