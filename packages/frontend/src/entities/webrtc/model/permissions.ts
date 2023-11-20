import { createEvent } from 'effector'
import { split }       from 'effector'

export const statusProvided = createEvent<PermissionState>()

export const statusDenied = createEvent()
export const statusGranted = createEvent()

split({
  source: statusProvided,
  match: {
    granted: (s) => s === 'granted',
    denied: (s) => s === 'denied'
  },
  cases: {
    denied: statusDenied,
    granted: statusGranted
  }
})
