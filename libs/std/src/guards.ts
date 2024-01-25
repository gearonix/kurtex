import { Nil } from './types'

/**
 * @reference https://github.com/secundant/neodx/tree/main/libs/std
 */

export function isString(target: unknown | string): target is string {
  return typeof target === 'string' || target instanceof String
}

export function isNumber(target: unknown | number): target is number {
  // eslint-disable-next-line no-self-compare
  return typeof target === 'number' && target === target
}

export function isObjectLike(target: unknown): target is object {
  return typeof target === 'object' && target !== null
}

export const isNil = (target: unknown): target is Nil => target == null

export function isObject(
  target: unknown
): target is Record<keyof any, unknown> {
  return !(isNil(target) || !isObjectLike(target))
}
