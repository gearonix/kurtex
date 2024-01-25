import { createEvent } from 'effector'
import { split }       from 'effector'

export const statusProvided = createEvent<PermissionState>()

export const statusDenied = createEvent()
export const statusGranted = createEvent()

split({
  cases: {
    denied: statusDenied,
    granted: statusGranted
  },
  match: {
    denied: (s) => s === 'denied',
    granted: (s) => s === 'granted'
  },
  source: statusProvided
})
