import { ReactNode }       from 'react'
import { useParams }       from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useRouter }       from 'next/navigation'
import { Nullable }        from '@grnx-utils/types'

export type WithChildren<
  T = NonNullable<unknown>,
  Child extends ReactNode | ReactNode[] = ReactNode
> = {
  children: Child
} & T

export type WithPageParams<P extends object, O = NonNullable<unknown>> = {
  params: P
} & O

export type NextParams =
  | Record<string, string | string[]>
  | null
  | ReturnType<typeof useParams>

export type NextRouter = ReturnType<typeof useRouter>

export type NextSearchParams =
  | Nullable<Readonly<URLSearchParams>>
  | ReturnType<typeof useSearchParams>
