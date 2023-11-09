import {ReactNode} from "react";

export type WithChildren<
  T = NonNullable<unknown>,
  Child extends ReactNode | ReactNode[] = ReactNode
> = {
  children: Child
} & T
