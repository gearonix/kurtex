export type Nullable<T> = T | null

export type Nil = null | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyKey = keyof any

export type AnyObject = Record<AnyKey, unknown>
