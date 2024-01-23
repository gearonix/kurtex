export type InferElement<T extends unknown[]> = T extends (infer S)[]
  ? S
  : never
