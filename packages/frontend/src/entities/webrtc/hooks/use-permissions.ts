export const usePermissions = () => {
  return () => {
    navigator.permissions.query({ name: 'camera' as PermissionName }).then((
      manager
    ) => {
      manager.addEventListener('change', (ctx) => {
        const status = (ctx.currentTarget as PermissionStatus).state

        if (status === 'granted') {
          return console.log('start-web-rtc')
        }

        if (status === 'denied') {

        }
      })
    })
  }
}
