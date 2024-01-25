import { AnyObject } from '@kurtex/std'

export const removeKey = <T extends AnyObject, K extends keyof T>(
  obj: T,
  key: K
): [T, T[K]] => {
  const clone = { ...obj }

  const value = clone[key]

  if (value) {
    delete clone[key]
  }

  return [clone, value]
}
