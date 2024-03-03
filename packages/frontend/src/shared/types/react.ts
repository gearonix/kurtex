import { Nullable } from '@kurtex/std'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

export type WithChildren<
  T = NonNullable<unknown>,
  Child extends ReactNode | ReactNode[] = ReactNode
> = {
  children: Child
} & T

export type WithPageParams<P extends object, O = NonNullable<unknown>> = {
  params: P
} & O

export type NextParams = Exclude<
  Record<string, string | string[]> | ReturnType<typeof useParams>,
  null
>

export type NextRouter = ReturnType<typeof useRouter>

export type NextSearchParams =
  | Nullable<Readonly<URLSearchParams>>
  | ReturnType<typeof useSearchParams>
