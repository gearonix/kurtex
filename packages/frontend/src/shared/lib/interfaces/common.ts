import { Undefinable } from '@grnx-utils/types'

export type Wrap<
  Target,
  Wrapper
> = Wrapper extends string
  ? {
      [Key in Wrapper]: Target
    }
  : Target
